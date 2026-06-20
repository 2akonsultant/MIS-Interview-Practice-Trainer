import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface ScenarioData {
  id: number;
  title: string;
  scenario: string;
  expectedApproach: string[];
  options: Option[];
}

const ASSESSMENT_SCENARIOS: ScenarioData[] = [
  {
    id: 1,
    title: "1. MIS Reporting Accuracy",
    scenario: "One department's expenses are showing 30% higher than last month. The Finance Manager asks for an explanation within an hour.",
    expectedApproach: [
      "Verify source data for accuracy.",
      "Compare current vs previous month's transactions line by line to identify unusual entries.",
      "Check specifically for one-time or non-recurring expenses driving the spike.",
      "Prepare a concise summary with supporting data within the hour."
    ],
    options: [
      {
        text: "Verify the source data, compare this month's transactions against last month's line by line to identify unusual entries, check for one-time expenses driving the spike, then prepare a concise summary with supporting data within the hour.",
        isCorrect: true
      },
      {
        text: "Escalate to the department head asking them to explain, then wait for their written response before preparing anything.",
        isCorrect: false
      },
      {
        text: "Apply a flat 30% correction to last month's figures to smooth the trend before presenting.",
        isCorrect: false
      },
      {
        text: "Tell the Finance Manager an hour isn't enough time and request an extension.",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    title: "2. Cost Variance Analysis",
    scenario: "Manufacturing cost for a product increased 15% vs budget.",
    expectedApproach: [
      "Break costs into material, labor, and overhead components.",
      "Compare actual vs budget for each component.",
      "Identify drivers of the increase.",
      "Discuss findings with the operations team.",
      "Recommend corrective actions."
    ],
    options: [
      {
        text: "Break the cost into material, labor, and overhead, compare actual vs budget for each, identify which component is driving the increase, discuss with operations, and recommend corrective actions.",
        isCorrect: true
      },
      {
        text: "Report the 15% overrun as-is without breaking it into components.",
        isCorrect: false
      },
      {
        text: "Assume inflation affected all categories equally and raise next quarter's budget by 15%.",
        isCorrect: false
      },
      {
        text: "Ask procurement to find cheaper suppliers immediately without first identifying the driver of the variance.",
        isCorrect: false
      }
    ]
  },
  {
    id: 3,
    title: "3. Data Mismatch in ERP",
    scenario: "ERP shows ₹25 lakhs inventory, warehouse reports ₹22 lakhs.",
    expectedApproach: [
      "Reconcile ERP records against physical stock records.",
      "Check recent transactions and warehouse movements.",
      "Verify pending GRNs (Goods Received Notes) and stock adjustments.",
      "Identify potential posting errors.",
      "Escalate the issue to higher authority if unresolved."
    ],
    options: [
      {
        text: "Reconcile ERP records against physical stock, check recent transactions, verify pending GRNs and stock adjustments, identify posting errors, and escalate if unresolved.",
        isCorrect: true
      },
      {
        text: "Book a journal entry to write down ERP inventory to ₹22 lakhs to match the warehouse count immediately.",
        isCorrect: false
      },
      {
        text: "Ask the warehouse team to recount until it matches the ERP figure.",
        isCorrect: false
      },
      {
        text: "Average the two figures and report ₹23.5 lakhs to avoid further investigation.",
        isCorrect: false
      }
    ]
  },
  {
    id: 4,
    title: "4. Tight Deadline Reporting",
    scenario: "Finance, HR, and Operations all send \"urgent\" requests simultaneously.",
    expectedApproach: [
      "Assess actual business impact of each request.",
      "Clarify true deadlines with each requester.",
      "Prioritize critical reports first.",
      "Communicate timelines proactively to all teams.",
      "Deliver in phases if needed."
    ],
    options: [
      {
        text: "Assess the actual business impact of each request, clarify true deadlines, prioritize the most critical reports, communicate timelines proactively to all teams, and deliver in phases if needed.",
        isCorrect: true
      },
      {
        text: "Handle requests strictly in the order received, regardless of urgency.",
        isCorrect: false
      },
      {
        text: "Ask a manager to handle two of the three requests.",
        isCorrect: false
      },
      {
        text: "Tell all three teams only one request can be completed today and let them decide among themselves.",
        isCorrect: false
      }
    ]
  },
  {
    id: 5,
    title: "5. Excel Problem Solving",
    scenario: "Dataset of 50,000 rows with duplicates and missing values.",
    expectedApproach: [
      "Back up the original data before editing.",
      "Remove duplicate records cleanly.",
      "Use filters and conditional formatting to spot data anomalies.",
      "Handle missing values logically based on dataset context.",
      "Create Pivot Tables for final summaries and analysis."
    ],
    options: [
      {
        text: "Back up the original data, remove duplicates, use filters and conditional formatting to spot anomalies, handle missing values logically, then create Pivot Tables for analysis.",
        isCorrect: true
      },
      {
        text: "Delete any row with a missing value without backing up the original file first.",
        isCorrect: false
      },
      {
        text: "Skip cleaning and build Pivot Tables directly on the raw data.",
        isCorrect: false
      },
      {
        text: "Manually scroll through all 50,000 rows to fix errors one by one.",
        isCorrect: false
      }
    ]
  },
  {
    id: 6,
    title: "6. Budget Overrun",
    scenario: "A department exceeds its quarterly budget by 20%.",
    expectedApproach: [
      "Perform an Actual vs Budget comparison breakdown.",
      "Do a monthly trend analysis showing how the overrun built up.",
      "Identify the root cause of the budget breach.",
      "Assess the future impact of the trend for the remaining quarters.",
      "Recommend proactive cost-control parameters."
    ],
    options: [
      {
        text: "Present an actual vs budget comparison, a monthly trend analysis, root cause identification, future impact assessment, and cost-control recommendations.",
        isCorrect: true
      },
      {
        text: "Present only the final 20% figure without trend or root cause detail.",
        isCorrect: false
      },
      {
        text: "Recommend an across-the-board budget cut for next quarter without identifying the cause.",
        isCorrect: false
      },
      {
        text: "Wait until year-end to present a combined analysis for all four quarters together.",
        isCorrect: false
      }
    ]
  },
  {
    id: 7,
    title: "7. Stakeholder Management",
    scenario: "A department head disputes the numbers in your MIS report.",
    expectedApproach: [
      "Stay professional and objective.",
      "Review your calculations and formulas meticulously.",
      "Verify the source input data validity.",
      "Explain your reporting methodology clearly.",
      "Correct the report if an actual error is found."
    ],
    options: [
      {
        text: "Stay professional, review the calculations, verify the source data, explain the methodology clearly, and correct the report if an error is found.",
        isCorrect: true
      },
      {
        text: "Insist the numbers are correct without reviewing them again.",
        isCorrect: false
      },
      {
        text: "Change the numbers to match what the department head expects to avoid conflict.",
        isCorrect: false
      },
      {
        text: "Escalate directly to senior management without discussing it with the department head first.",
        isCorrect: false
      }
    ]
  },
  {
    id: 8,
    title: "8. Cash Flow Monitoring",
    scenario: "Cash availability is reducing despite increasing sales.",
    expectedApproach: [
      "Analyze accounts receivables aging reports.",
      "Review payment collection cycles and days outstanding (DSO).",
      "Check for excessive inventory buildup tying up active capital.",
      "Examine operating expense trends and cash outflows.",
      "Prepare comprehensive cash flow insights for management."
    ],
    options: [
      {
        text: "Analyze receivables aging, review payment collection cycles, check inventory buildup, examine operating expense trends, and prepare cash flow insights for management.",
        isCorrect: true
      },
      {
        text: "Conclude the finance team's reporting must be wrong since rising sales should always increase cash.",
        isCorrect: false
      },
      {
        text: "Recommend an immediate loan without investigating receivables, inventory, or expenses.",
        isCorrect: false
      },
      {
        text: "Focus only on sales figures since the issue must be in revenue recording.",
        isCorrect: false
      }
    ]
  },
  {
    id: 9,
    title: "9. Process Improvement",
    scenario: "Monthly reporting takes three days and is highly manual.",
    expectedApproach: [
      "Identify repetitive manual tasks and processing bottlenecks.",
      "Automate using advanced Excel formulas, templates, and Pivot Tables.",
      "Standardize standard templates and report layouts.",
      "Reduce direct human manual intervention steps.",
      "Build in clear, checkable validation and verification steps."
    ],
    options: [
      {
        text: "Identify the repetitive manual tasks, automate them using Excel formulas and Pivot Tables, standardize templates, reduce manual intervention, and build in validation checks.",
        isCorrect: true
      },
      {
        text: "Hire an additional team member to complete the same manual process faster.",
        isCorrect: false
      },
      {
        text: "Skip validation checks since automation alone guarantees accuracy.",
        isCorrect: false
      },
      {
        text: "Reduce reporting frequency from monthly to quarterly.",
        isCorrect: false
      }
    ]
  },
  {
    id: 10,
    title: "10. Confidential Data Handling",
    scenario: "A colleague asks you to share salary data unrelated to their work.",
    expectedApproach: [
      "Adhere strictly to corporate data confidentiality guidelines.",
      "Protect personally sensitive compensation records.",
      "Politely decline to share data unrelated to their active job scope.",
      "Escalate the matter appropriately if they persist."
    ],
    options: [
      {
        text: "Follow company policy on confidentiality, decline to share the data since it's unrelated to their work, and escalate if they persist.",
        isCorrect: true
      },
      {
        text: "Share the data informally since the colleague is a trusted coworker.",
        isCorrect: false
      },
      {
        text: "Share a summarized or rounded version, assuming that makes it acceptable.",
        isCorrect: false
      },
      {
        text: "Ignore the request without explanation to avoid an awkward conversation.",
        isCorrect: false
      }
    ]
  },
  {
    id: 11,
    title: "11. Manufacturing Cost Variance (Fresher-Level FP&A)",
    scenario: "A product's actual manufacturing cost is 18% higher than budgeted.",
    expectedApproach: [
      "Compare actual versus budgeted cost metrics.",
      "Break the variance into material, labor, and overhead components.",
      "Identify major drivers such as raw material price inflation or overtime labor.",
      "Validate statistics raw data with production and procurement teams.",
      "Summarize findings, quantify bottom-line impact, and suggest optimizations.",
      "Recommend corrective actions like vendor negotiations or process optimization."
    ],
    options: [
      {
        text: "Compare actual vs budgeted costs, break the variance into material, labor, and overhead, identify major drivers, validate with production and procurement, summarize findings and quantify impact, and recommend corrective actions like vendor negotiations or process optimization.",
        isCorrect: true
      },
      {
        text: "Report the 18% figure directly and recommend an immediate price increase without breaking down the variance.",
        isCorrect: false
      },
      {
        text: "Assume the budget was set incorrectly and recommend revising it upward without investigating root causes.",
        isCorrect: false
      },
      {
        text: "Wait for procurement to explain the variance on their own.",
        isCorrect: false
      }
    ]
  },
  {
    id: 12,
    title: "12. MIS Reporting Error",
    scenario: "You submitted an MIS report and later discovered a formula error in a report already shared with management.",
    expectedApproach: [
      "Acknowledge and own the mathematical calculation error professionally.",
      "Prepare and verify the corrected version of the report immediately.",
      "Proactively communicate corrections to everyone who received the file.",
      "Clarify the impact of the formula update (material or immaterial).",
      "Implement a robust peer-review or double-check validation step going forward."
    ],
    options: [
      {
        text: "Acknowledge and own the error professionally, correct the report immediately, communicate the correction to everyone who received the original, clarify whether the impact was material, and implement a peer-review or validation step going forward.",
        isCorrect: true
      },
      {
        text: "Quietly fix the formula and reissue the report without mentioning the error occurred.",
        isCorrect: false
      },
      {
        text: "Wait to see if anyone notices before deciding whether to act.",
        isCorrect: false
      },
      {
        text: "Blame the error on a data issue from another team.",
        isCorrect: false
      }
    ]
  }
];

function shuffleOptions(options: Option[]): Option[] {
  const result = [...options];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function LiveMockInterview() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'learning' | 'quiz' | 'results'>('landing');
  const [learningIndex, setLearningIndex] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  
  // Shuffled options for the active quiz scenario
  const [activeQuizOptions, setActiveQuizOptions] = useState<Option[]>([]);
  const [selectedOptionText, setSelectedOptionText] = useState<string>('');
  
  // Array of developer answers chosen during the MCQ quiz
  const [userSelections, setUserSelections] = useState<{
    scenarioId: number;
    scenarioTitle: string;
    scenarioText: string;
    selectedText: string;
    correctText: string;
    isCorrect: boolean;
  }[]>([]);

  // Prepare shuffled options when quiz index changes
  useEffect(() => {
    if (currentStep === 'quiz' && ASSESSMENT_SCENARIOS[quizIndex]) {
      const originalOptions = ASSESSMENT_SCENARIOS[quizIndex].options;
      setActiveQuizOptions(shuffleOptions(originalOptions));
      setSelectedOptionText('');
    }
  }, [quizIndex, currentStep]);

  // Restart back to landing
  const handleRestart = () => {
    setLearningIndex(0);
    setQuizIndex(0);
    setSelectedOptionText('');
    setUserSelections([]);
    setCurrentStep('landing');
  };

  // Launch Part 1 (Learning Mode)
  const handleStartLearning = () => {
    setLearningIndex(0);
    setCurrentStep('learning');
  };

  // Advance dynamic learning scenarios
  const handleNextLearn = () => {
    if (learningIndex < ASSESSMENT_SCENARIOS.length - 1) {
      setLearningIndex(prev => prev + 1);
    } else {
      // Done learning -> Start Mock Quiz
      setQuizIndex(0);
      setUserSelections([]);
      setCurrentStep('quiz');
    }
  };

  // Handle choice selection during Quiz
  const handleSelectOption = (text: string) => {
    setSelectedOptionText(text);
  };

  // Submit Answer & advance to the next index silently
  const handleSubmitQuizAnswer = () => {
    if (!selectedOptionText) return;

    const currentScenario = ASSESSMENT_SCENARIOS[quizIndex];
    const correctOption = currentScenario.options.find(opt => opt.isCorrect);
    const correctText = correctOption ? correctOption.text : '';
    const isCorrect = selectedOptionText === correctText;

    const selectionItem = {
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      scenarioText: currentScenario.scenario,
      selectedText: selectedOptionText,
      correctText: correctText,
      isCorrect: isCorrect
    };

    const updatedSelections = [...userSelections, selectionItem];
    setUserSelections(updatedSelections);

    if (quizIndex < ASSESSMENT_SCENARIOS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  return (
    <div className="bg-slate-50 min-h-full py-8 sm:py-12 px-4 transition-all duration-300">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: LANDING PAGE */}
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                <GraduationCap className="w-10 h-10" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display uppercase">
                  MIS Interview Practice Trainer
                </h1>
                <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Master key Management Information Systems (MIS) and Financial Planning & Analysis (FP&A) scenario dilemmas. Learn the industry-standard expected approaches for 12 critical corporate cases, and then test your knowledge in a timed, direct mock interview simulation.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartLearning}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer uppercase tracking-wider select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  id="start_learning_btn"
                >
                  <span>Start Learning</span>
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: PART 1 — LEARNING */}
          {currentStep === 'learning' && (() => {
            const currentScenario = ASSESSMENT_SCENARIOS[learningIndex];
            const isLastLearn = learningIndex === ASSESSMENT_SCENARIOS.length - 1;
            const progressPercent = ((learningIndex + 1) / ASSESSMENT_SCENARIOS.length) * 100;

            return (
              <motion.div
                key={`learn-${learningIndex}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Header section with badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded">
                      PART 1: LEARN THE SCENARIOS
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-display">
                      {currentScenario.title}
                    </h2>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      Scenario {learningIndex + 1} of {ASSESSMENT_SCENARIOS.length}
                    </span>
                    <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 md:ml-auto border border-slate-200">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Scenario details card */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      The Challenge Dilemma
                    </h3>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                      &ldquo;{currentScenario.scenario}&rdquo;
                    </div>
                  </div>

                  {/* Expected approach bullet points */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Expected Approach
                    </h3>
                    <ul className="space-y-2.5 pl-4 sm:pl-5 list-disc text-slate-705 text-xs sm:text-sm leading-relaxed">
                      {currentScenario.expectedApproach.map((item, idx) => (
                        <li key={idx} className="text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-sans italic">
                    Review and conceptualize the best analytical corporate methodology.
                  </span>
                  
                  <button
                    onClick={handleNextLearn}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer uppercase tracking-wider select-none"
                    id="next_learning_step_btn"
                  >
                    <span>{isLastLearn ? 'Start Mock Interview' : 'Next Scenario'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 3: PART 2 — MOCK INTERVIEW MCQ */}
          {currentStep === 'quiz' && (() => {
            const currentScenario = ASSESSMENT_SCENARIOS[quizIndex];
            const progressPercent = ((quizIndex + 1) / ASSESSMENT_SCENARIOS.length) * 100;

            return (
              <motion.div
                key={`quiz-${quizIndex}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Header section with badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded">
                      PART 2: MOCK INTERVIEW ASSESSMENT
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-display">
                      {currentScenario.title}
                    </h2>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      Question {quizIndex + 1} of {ASSESSMENT_SCENARIOS.length}
                    </span>
                    <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 md:ml-auto border border-slate-200">
                      <div 
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Scenario details card */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Scenario Question Context
                    </h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-slate-900 text-sm sm:text-base leading-relaxed font-bold">
                      {currentScenario.scenario}
                    </div>
                  </div>

                  {/* Options items */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Select Your Decision Path
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {activeQuizOptions.map((opt, idx) => {
                        const isSelected = selectedOptionText === opt.text;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectOption(opt.text)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 select-none cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 border-blue-600 shadow-2xs ring-1 ring-blue-600'
                                : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-slate-50/50'
                            }`}
                            id={`quiz_option_btn_${idx}`}
                          >
                            <span className={`w-6 h-6 rounded-md font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border mt-0.5 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-sans italic">
                    Answers are submitted silently. Score breakdown is calculated for the final page.
                  </span>
                  
                  <button
                    onClick={handleSubmitQuizAnswer}
                    disabled={!selectedOptionText}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-150 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm disabled:cursor-not-allowed uppercase tracking-wider select-none cursor-pointer"
                    id="submit_quiz_answer_btn"
                  >
                    <span>Submit Answer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 4: FINAL RESULTS SCREEN */}
          {currentStep === 'results' && (() => {
            const correctCount = userSelections.filter(sel => sel.isCorrect).length;
            const avgRating = Math.round((correctCount / ASSESSMENT_SCENARIOS.length) * 100);

            // Descriptive executive assessment statement based on performance
            const getFeedbackStatement = () => {
              if (avgRating >= 90) return "Executive Status Met: You demonstrated flawless corporate analysis and analytical process excellence across high-stakes pressure situations.";
              if (avgRating >= 70) return "Proficient Status Met: High grasp of compliance and internal checks. Highly fit for key stakeholder planning meetings.";
              return "Analytical Growth Needed: Excellent attempt! Reviewing calculations and validating source inputs will elevate your strategic effectiveness.";
            };

            return (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Main Score Board */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-5">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded inline-block">
                      ASSESSMENT COMPLETED REPORT
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                      Your Final Score: <span className="text-blue-600">{correctCount} / {ASSESSMENT_SCENARIOS.length}</span> Correct
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 font-mono mt-0.5">
                      Pass Ratio: {avgRating}% Accuracy
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed border-t border-slate-100 pt-4">
                    {getFeedbackStatement()}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                      id="restart_interview_assessment_btn"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restart Practice</span>
                    </button>
                  </div>
                </div>

                {/* Per Question breakdown logs */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wider ml-1">
                    Question-By-Question Interview Feedback Logs
                  </h3>

                  <div className="space-y-4">
                    {userSelections.map((sel, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all"
                      >
                        {/* Summary line */}
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm">
                            {sel.scenarioTitle}
                          </h4>

                          {sel.isCorrect ? (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1 self-start sm:self-auto uppercase tracking-wide font-mono">
                              <CheckCircle className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-1 self-start sm:self-auto uppercase tracking-wide font-mono">
                              <AlertCircle className="w-3.5 h-3.5" /> Direct Review Recommended
                            </span>
                          )}
                        </div>

                        {/* Breakdown specifics */}
                        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Scenario context:</span>
                            <p className="text-slate-600 italic leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100 text-[11px] sm:text-xs">
                              &ldquo;{sel.scenarioText}&rdquo;
                            </p>
                          </div>

                          <div className="space-y-3">
                            {/* Selected Answer block */}
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Your response:</span>
                              <div className={`p-3 rounded-lg border text-[11px] sm:text-xs leading-relaxed ${
                                sel.isCorrect 
                                  ? 'bg-emerald-50/40 border-emerald-150 text-emerald-850' 
                                  : 'bg-rose-50/40 border-rose-150 text-rose-850'
                              }`}>
                                {sel.selectedText}
                              </div>
                            </div>

                            {/* Correct Response block if they made a mistake */}
                            {!sel.isCorrect && (
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Optimal expected response:</span>
                                <div className="p-3 bg-emerald-50/40 border border-emerald-150 rounded-lg text-emerald-850 text-[11px] sm:text-xs leading-relaxed">
                                  {sel.correctText}
                                </div>
                              </div>
                            )}

                            {/* Learn the expected approach items */}
                            <div className="pt-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5" />
                                Optimal Approach Steps:
                              </span>
                              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px] sm:text-xs">
                                {ASSESSMENT_SCENARIOS.find(s => s.id === sel.scenarioId)?.expectedApproach.map((ap, apIdx) => (
                                  <li key={apIdx}>{ap}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Final CTA card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                  <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
                    Ready to refine your operational insights?
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
                    You can reset this trial and review the theoretical guidelines to achieve a perfect 12 / 12 score record.
                  </p>
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                    id="results_relaunch_practice_btn"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Run Study Mode Again</span>
                  </button>
                </div>
              </motion.div>
            );
          })()}

        </AnimatePresence>
      </div>
    </div>
  );
}
