import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// Create lazy initialization helper for Gemini GenAI
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());

  // API router configuration
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // SECURE API ROUTE FOR GEMINI MOCK INTERVIEW
  app.post("/api/interview/chat", async (req, res) => {
    try {
      const { action, scenario, messages, userResponse } = req.body;

      if (!action) {
        res.status(400).json({ error: "Missing required parameter 'action'" });
        return;
      }

      // 1. Initialize Gemini
      let ai;
      try {
        ai = getGenAI();
      } catch (err: any) {
        res.status(500).json({
          error: "Gemini client error: API key is not configured in Secrets panel.",
          details: err.message,
        });
        return;
      }

      const systemInstruction = `
You are an extremely experienced Senior Finance Director.
You are interviewing a candidate for a Finance Analyst / MIS Executive / FP&A Analyst / Business Finance role.
Your tone should be professional, encouraging, constructive, and realistic.
The candidate has early-career or fresher level experience, with maybe an internship. Adjust difficulty expectations accordingly.
You are focusing on scenario-based questions using the STAR+F framework (Situation, Task, Action, Result, Follow-up).

STAR+F components to evaluate are:
- Situation: Did they clearly demonstrate they understand the problem/context?
- Task: Did they identify their specific duty/responsibility?
- Action: Did they explain concrete, step-by-step actions (e.g. data audit, variance calculations, operations discussion)?
- Result: Did they outline expected and clean outcomes?
- Follow-up: Did they identify logical preventive/proactive next steps to avoid recursion?

You must keep your replies concise and format them as comfortable conversational scripts. Do not write oversized essays.
      `.trim();

      // Implement the step behaviors using Gemini API
      if (action === "start") {
        // AI presents the scenario conversationally with 4 shuffled options
        const scenarioText = scenario?.scenario || "Please analyze cost variance for our product.";
        const scenarioTitle = scenario?.title || "Cost Analysis Case";
        const modelApproach = scenario?.modelApproach || [];

        const prompt = `
Generate a single, well-structured JSON object of the following type:
{
  "intro": "string - Friendly, realistic presentation of the scenario from the Senior Finance Director persona (2-3 sentences max, welcoming the candidate and laying out the situation context)",
  "options": [
    {
      "text": "string - A realistic response choice. One MUST be the correct/best approach (elaborate, fully verified STAR+F-aligned response). Three MUST be plausible-but-flawed distractors.",
      "isCorrect": boolean - true for the correct option, false for the others,
      "explanation": "string - Constructive explanation of why this option is correct (grounded in STAR+F and scenario approach) or why it is flawed/sub-optimal."
    }
  ]
}

Scenario Context:
Title: "${scenarioTitle}"
Situation: "${scenarioText}"
Expected ideal approaches: ${JSON.stringify(modelApproach)}

Guidelines for Option Design:
- There must be exactly 1 correct option and exactly 3 plausible-but-flawed distractor options.
- Correct Option: Demonstrates optimal STAR+F technique. It should include verification of raw data, structured analysis, and operational follow-up/preventive checks.
- Distractor 1: Jumps directly to conclusions or reports statistics to senior executives without verifying source files or reviewing transaction logs (skips data data validation/audit).
- Distractor 2: Blames other teams (like operations/production) or escalates to the General Manager immediately without doing the initial analytical drill-down to isolate anomalies.
- Distractor 3: Is reasonable but completely lacks any preventive measures (+F Follow-up), meaning the issue could easily recur.
- Shuffling: The options in your response do not need to be sorted, they can be returned raw. We will shuffle them on the server side. Do not put labels like 'A)', 'B)' in the option text.
- Ensure the options are professional and realistic, not obviously wrong.
        `.trim();

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { 
            systemInstruction,
            responseMimeType: "application/json"
          },
        });

        const rawText = response.text || "{}";
        let parsed;
        try {
          parsed = JSON.parse(rawText.trim());
        } catch (e) {
          // Robust cleaning fallback
          let cleaned = rawText.trim();
          if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
          }
          parsed = JSON.parse(cleaned);
        }

        // Shuffle the options array elements using simple randomizer
        let finalOptions = parsed.options || [];
        for (let i = finalOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
        }

        res.json({
          reply: parsed.intro || `Let's work through this scenario: ${scenarioTitle}`,
          options: finalOptions
        });
        return;
      }

      if (action === "respond") {
        // AI evaluates candidate response, lists what we test, reviews STAR+F, and poses 1 follow-up question
        const baseScenarioText = scenario?.scenario || "";
        const modelAnswers = scenario?.modelApproach ? scenario.modelApproach.join(", ") : "";

        const prompt = `
The candidate just answered the initial interview scenario question using STAR+F.
Here is the context of the interview scenario:
"${baseScenarioText}"

Model ideal approach keys: [${modelAnswers}]

Candidate's Answer:
"${userResponse}"

Please perform the following steps and output them clearly marked and formatted in Markdown:
1. **Focus Area**: Briefly (in 1 clear sentence) state what the interviewer was primarily testing in this specific scenario (e.g., attention to data integrity, cross-functional diplomatic teamwork, excel sanitation, or rapid priority setting).
2. **STAR+F Critique**: Evaluate the candidate's response constructively. Give a light checklist of which STAR+F elements they covered well or missed, calibrating for a fresher-level FP&A/MIS context.
3. **The Next Question**: Formulate exactly one highly relevant, professional follow-up question based directly on their response (e.g. "That's a sound beginning. How would you handle a situation where the department head continues to dispute the numbers even after you show them the excel formulas?").

Keep the total word count around 150-200 words. Make it sound like a natural spoken dialogue.
        `.trim();

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { systemInstruction },
        });

        res.json({ reply: response.text || "That's an interesting approach. Let me ask you: how would you verify those metrics?" });
        return;
      }

      if (action === "respond_followup") {
        // Candidate answered the follow-up. AI evaluates, gives final rating (out of 5), and provides 2-3 specific improvements
        const baseScenarioText = scenario?.scenario || "";
        const prompt = `
The candidate just answered your follow-up interview question!
Scenario reference: "${baseScenarioText}"
Candidate's Follow-up Answer:
"${userResponse}"

Please respond with a conversational final wrap-up statement.
Format your output with:
1. **Closing Thoughts**: A brief, encouraging assessment of their follow-up logic.
2. **Score/Rating**: Give a clear score out of 5 based on their comprehensive answers (e.g. "Overall Score: 4.2 / 5").
3. **Suggestions**: 2-3 clear, brief, and highly actionable bullet points on how they can improve (e.g., "Quantify the dollar impact", "Mention specific Excel tools like Power Query", "Mention a validation check").

Keep the tone highly professional, encouraging, and actionable for an entry-level candidate. Keep word count under 150 words.
        `.trim();

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { systemInstruction },
        });

        res.json({ reply: response.text || "Excellent effort in this mock interview module! You've completed this scenario round." });
        return;
      }

      res.status(400).json({ error: "Unsupported action parameter value" });
    } catch (err: any) {
      console.error("Gemini Proxy Route Error:", err);
      res.status(500).json({
        error: "Failed to communicate with AI.",
        details: err.message,
      });
    }
  });

  // SETUP VITE MIDDLEWARE OR PUBLIC DIST CODES
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted and listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
