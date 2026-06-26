export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Scenario {
  id: number;
  category: number;
  categoryName: string;
  title: string;
  scenario: string;
  expectedApproach: string[];
  options: Option[];
}

export const SCENARIOS: Scenario[] = [
  // --- CATEGORY 1: MIS & FINANCE ---
  {
    id: 1,
    category: 1,
    categoryName: "MIS & Finance",
    title: "MIS Reporting Accuracy",
    scenario: "One department's expenses are showing 30% higher than last month. The Finance Manager asks for an explanation within an hour.",
    expectedApproach: [
      "Verify source data",
      "Compare current vs previous month's transactions",
      "Identify unusual entries",
      "Check for one-time expenses",
      "Prepare a concise summary with supporting data"
    ],
    options: [
      { text: "Verify the source data, compare this month's transactions against last month's line by line to identify unusual entries, check for one-time expenses driving the spike, then prepare a concise summary with supporting data within the hour.", isCorrect: true },
      { text: "Escalate to the department head asking them to explain, then wait for their written response before preparing anything.", isCorrect: false },
      { text: "Apply a flat 30% correction to last month's figures to smooth the trend before presenting.", isCorrect: false },
      { text: "Tell the Finance Manager an hour isn't enough time and request an extension.", isCorrect: false }
    ]
  },
  {
    id: 2,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Cost Variance Analysis",
    scenario: "Manufacturing cost for a product increased 15% vs budget.",
    expectedApproach: [
      "Break costs into material, labor, overhead",
      "Compare actual vs budget",
      "Identify drivers of increase",
      "Discuss findings with operations team",
      "Recommend corrective actions"
    ],
    options: [
      { text: "Break the cost into material, labor, and overhead, compare actual vs budget for each, identify which component is driving the increase, discuss with operations, and recommend corrective actions.", isCorrect: true },
      { text: "Report the 15% overrun as-is without breaking it into components.", isCorrect: false },
      { text: "Assume inflation affected all categories equally and raise next quarter's budget by 15%.", isCorrect: false },
      { text: "Ask procurement to find cheaper suppliers immediately without first identifying the driver of the variance.", isCorrect: false }
    ]
  },
  {
    id: 3,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Data Mismatch in ERP",
    scenario: "ERP shows ₹25 lakhs inventory, warehouse reports ₹22 lakhs.",
    expectedApproach: [
      "Reconcile ERP and physical records",
      "Check recent transactions",
      "Verify pending GRNs and stock adjustments",
      "Identify posting errors",
      "Escalate if necessary"
    ],
    options: [
      { text: "Reconcile ERP records against physical stock, check recent transactions, verify pending GRNs and stock adjustments, identify posting errors, and escalate if unresolved.", isCorrect: true },
      { text: "Book a journal entry to write down ERP inventory to ₹22 lakhs to match the warehouse count immediately.", isCorrect: false },
      { text: "Ask the warehouse team to recount until it matches the ERP figure.", isCorrect: false },
      { text: "Average the two figures and report ₹23.5 lakhs to avoid further investigation.", isCorrect: false }
    ]
  },
  {
    id: 4,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Tight Deadline Reporting",
    scenario: "Finance, HR, and Operations all send \"urgent\" requests simultaneously.",
    expectedApproach: [
      "Assess business impact",
      "Clarify deadlines",
      "Prioritize critical reports",
      "Communicate timelines proactively",
      "Deliver in phases if needed"
    ],
    options: [
      { text: "Assess the actual business impact of each request, clarify true deadlines, prioritize the most critical reports, communicate timelines proactively to all teams, and deliver in phases if needed.", isCorrect: true },
      { text: "Handle requests strictly in the order received, regardless of urgency.", isCorrect: false },
      { text: "Ask a manager to handle two of the three requests.", isCorrect: false },
      { text: "Tell all three teams only one request can be completed today and let them decide among themselves.", isCorrect: false }
    ]
  },
  {
    id: 5,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Excel Problem Solving",
    scenario: "Dataset of 50,000 rows with duplicates and missing values.",
    expectedApproach: [
      "Backup data",
      "Remove duplicates",
      "Use filters and conditional formatting",
      "Handle missing values logically",
      "Create Pivot Tables for analysis"
    ],
    options: [
      { text: "Back up the original data, remove duplicates, use filters and conditional formatting to spot anomalies, handle missing values logically, then create Pivot Tables for analysis.", isCorrect: true },
      { text: "Delete any row with a missing value without backing up the original file first.", isCorrect: false },
      { text: "Skip cleaning and build Pivot Tables directly on the raw data.", isCorrect: false },
      { text: "Manually scroll through all 50,000 rows to fix errors one by one.", isCorrect: false }
    ]
  },
  {
    id: 6,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Budget Overrun",
    scenario: "A department exceeds its quarterly budget by 20%.",
    expectedApproach: [
      "Actual vs Budget comparison",
      "Monthly trend analysis",
      "Root cause identification",
      "Future impact assessment",
      "Cost-control recommendations"
    ],
    options: [
      { text: "Present an actual vs budget comparison, a monthly trend analysis, root cause identification, future impact assessment, and cost-control recommendations.", isCorrect: true },
      { text: "Present only the final 20% figure without trend or root cause detail.", isCorrect: false },
      { text: "Recommend an across-the-board budget cut for next quarter without identifying the cause.", isCorrect: false },
      { text: "Wait until year-end to present a combined analysis for all four quarters together.", isCorrect: false }
    ]
  },
  {
    id: 7,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Stakeholder Management",
    scenario: "A department head disputes the numbers in your MIS report.",
    expectedApproach: [
      "Stay professional",
      "Review calculations",
      "Verify source data",
      "Explain methodology",
      "Correct if an error exists"
    ],
    options: [
      { text: "Stay professional, review the calculations, verify the source data, explain the methodology clearly, and correct the report if an error is found.", isCorrect: true },
      { text: "Insist the numbers are correct without reviewing them again.", isCorrect: false },
      { text: "Change the numbers to match what the department head expects to avoid conflict.", isCorrect: false },
      { text: "Escalate directly to senior management without discussing it with the department head first.", isCorrect: false }
    ]
  },
  {
    id: 8,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Cash Flow Monitoring",
    scenario: "Cash availability is reducing despite increasing sales.",
    expectedApproach: [
      "Analyze receivables aging",
      "Review payment cycles",
      "Check inventory buildup",
      "Examine operating expenses",
      "Prepare cash flow insights"
    ],
    options: [
      { text: "Analyze receivables aging, review payment collection cycles, check inventory buildup, examine operating expense trends, and prepare cash flow insights for management.", isCorrect: true },
      { text: "Conclude the finance team's reporting must be wrong since rising sales should always increase cash.", isCorrect: false },
      { text: "Recommend an immediate loan without investigating receivables, inventory, or expenses.", isCorrect: false },
      { text: "Focus only on sales figures since the issue must be in revenue recording.", isCorrect: false }
    ]
  },
  {
    id: 9,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Process Improvement",
    scenario: "Monthly reporting takes three days and is highly manual.",
    expectedApproach: [
      "Identify repetitive tasks",
      "Automate using Excel formulas and Pivot Tables",
      "Standardize templates",
      "Reduce manual intervention",
      "Create validation checks"
    ],
    options: [
      { text: "Identify the repetitive manual tasks, automate them using Excel formulas and Pivot Tables, standardize templates, reduce manual intervention, and build in validation checks.", isCorrect: true },
      { text: "Hire an additional team member to complete the same manual process faster.", isCorrect: false },
      { text: "Skip validation checks since automation alone guarantees accuracy.", isCorrect: false },
      { text: "Reduce reporting frequency from monthly to quarterly.", isCorrect: false }
    ]
  },
  {
    id: 10,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Confidential Data Handling",
    scenario: "A colleague asks you to share salary data unrelated to their work.",
    expectedApproach: [
      "Follow company policy",
      "Protect confidential information",
      "Escalate if necessary",
      "Share only authorized data"
    ],
    options: [
      { text: "Follow company policy on confidentiality, decline to share the data since it's unrelated to their work, and escalate if they persist.", isCorrect: true },
      { text: "Share the data informally since the colleague is a trusted coworker.", isCorrect: false },
      { text: "Share a summarized or rounded version, assuming that makes it acceptable.", isCorrect: false },
      { text: "Ignore the request without explanation to avoid an awkward conversation.", isCorrect: false }
    ]
  },
  {
    id: 11,
    category: 1,
    categoryName: "MIS & Finance",
    title: "Manufacturing Cost Variance (Fresher-Level FP&A)",
    scenario: "A product's actual manufacturing cost is 18% higher than budgeted.",
    expectedApproach: [
      "Compare actual vs budgeted costs",
      "Break the variance into material, labor, and overhead",
      "Identify major drivers (e.g. raw material inflation, overtime labor)",
      "Validate with production and procurement teams",
      "Summarize findings and quantify impact",
      "Recommend corrective actions such as vendor negotiations or process optimization"
    ],
    options: [
      { text: "Compare actual vs budgeted costs, break the variance into material, labor, and overhead, identify major drivers, validate with production and procurement, summarize findings and quantify impact, and recommend corrective actions like vendor negotiations or process optimization.", isCorrect: true },
      { text: "Report the 18% figure directly and recommend an immediate price increase without breaking down the variance.", isCorrect: false },
      { text: "Assume the budget was set incorrectly and recommend revising it upward without investigating root causes.", isCorrect: false },
      { text: "Wait for procurement to explain the variance on their own.", isCorrect: false }
    ]
  },
  {
    id: 12,
    category: 1,
    categoryName: "MIS & Finance",
    title: "MIS Reporting Error",
    scenario: "You submitted an MIS report and later discovered a formula error in a report already shared with management.",
    expectedApproach: [
      "Acknowledge and own the error",
      "Correct the report immediately",
      "Communicate the correction to all stakeholders",
      "Clarify the impact",
      "Implement a peer-review or validation-check step going forward"
    ],
    options: [
      { text: "Acknowledge and own the error professionally, correct the report immediately, communicate the correction to everyone who received the original, clarify whether the impact was material, and implement a peer-review or validation step going forward.", isCorrect: true },
      { text: "Quietly fix the formula and reissue the report without mentioning the error occurred.", isCorrect: false },
      { text: "Wait to see if anyone notices before deciding whether to act.", isCorrect: false },
      { text: "Blame the error on a data issue from another team.", isCorrect: false }
    ]
  },

  // --- CATEGORY 2: REQUIREMENT GATHERING & STAKEHOLDER MANAGEMENT ---
  {
    id: 13,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Gathering Detailed Requirements",
    scenario: "A stakeholder requests a new feature but provides only a high-level idea. How would you gather detailed requirements?",
    expectedApproach: [
      "Schedule structured requirement sessions",
      "Prepare targeted questions",
      "Use techniques like user stories, use cases, or process flow diagrams",
      "Document and share a requirements draft for stakeholder sign-off",
      "Confirm understanding with examples"
    ],
    options: [
      { text: "Schedule structured sessions with the stakeholder, use targeted questions and techniques like user stories or process flow diagrams, document a requirements draft, and confirm understanding through sign-off and examples.", isCorrect: true },
      { text: "Immediately pass the high-level idea to the development team and let them interpret the details themselves.", isCorrect: false },
      { text: "Wait until the stakeholder provides a fully detailed written specification before scheduling any meetings.", isCorrect: false },
      { text: "Accept the high-level idea as sufficient and begin designing the solution without further clarification.", isCorrect: false }
    ]
  },
  {
    id: 14,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Conflicting Stakeholder Requirements",
    scenario: "Two stakeholders have conflicting requirements for the same process. What would you do?",
    expectedApproach: [
      "Facilitate a joint meeting with both stakeholders",
      "Understand the business rationale behind each requirement",
      "Identify common ground",
      "Escalate to a decision-maker if consensus is not reached",
      "Document the agreed outcome"
    ],
    options: [
      { text: "Facilitate a joint meeting to understand both rationales, identify common ground, escalate to a decision-maker if needed, and document the agreed outcome.", isCorrect: true },
      { text: "Choose the requirement from the more senior stakeholder and proceed without consulting the other party.", isCorrect: false },
      { text: "Implement both conflicting requirements simultaneously to satisfy everyone.", isCorrect: false },
      { text: "Ignore both requirements and design a solution based on your own judgment.", isCorrect: false }
    ]
  },
  {
    id: 15,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Mid-Project Requirement Change",
    scenario: "A client changes requirements midway through the project. How would you handle it?",
    expectedApproach: [
      "Acknowledge the change request",
      "Assess the impact on scope, timeline, and budget",
      "Follow the change control process",
      "Get formal approval",
      "Communicate impact to all relevant teams"
    ],
    options: [
      { text: "Acknowledge the change, assess impact on scope, timeline, and budget, follow the formal change control process, get approval, and communicate impact to all teams.", isCorrect: true },
      { text: "Reject the change outright since requirements were already agreed upon at the start.", isCorrect: false },
      { text: "Implement the change immediately without assessing impact to keep the client happy.", isCorrect: false },
      { text: "Quietly absorb the change into the project without informing the team or updating documentation.", isCorrect: false }
    ]
  },
  {
    id: 16,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Documenting an Undocumented Process",
    scenario: "You are asked to document a business process that no one has formally documented before. What steps would you take?",
    expectedApproach: [
      "Identify and interview key process owners and users",
      "Observe the process being performed",
      "Map the current state using a process flow diagram",
      "Validate the documentation with stakeholders",
      "Publish and circulate the final document"
    ],
    options: [
      { text: "Interview process owners, observe the process, map it in a flow diagram, validate with stakeholders, and publish the final documentation.", isCorrect: true },
      { text: "Write the process documentation based solely on your own assumptions without speaking to anyone involved.", isCorrect: false },
      { text: "Copy a similar process document from another department and rename it to save time.", isCorrect: false },
      { text: "Ask one senior employee to write the document without cross-checking with others involved in the process.", isCorrect: false }
    ]
  },
  {
    id: 17,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Unavailable Stakeholder Near Deadline",
    scenario: "A stakeholder is unavailable for requirement clarification and deadlines are approaching. How would you proceed?",
    expectedApproach: [
      "Escalate the dependency to your project manager",
      "Identify alternative contacts who can provide the information",
      "Document the assumption made",
      "Flag the risk",
      "Follow up through multiple channels"
    ],
    options: [
      { text: "Escalate to the project manager, identify alternative contacts, document assumptions made, flag the risk formally, and follow up through multiple channels.", isCorrect: true },
      { text: "Proceed with the project based entirely on your own interpretation without flagging any risks.", isCorrect: false },
      { text: "Pause all work on the project and wait indefinitely until the stakeholder becomes available.", isCorrect: false },
      { text: "Skip the unclear requirement entirely and deliver without it.", isCorrect: false }
    ]
  },
  {
    id: 18,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Facilitating Disagreement on Priorities",
    scenario: "During a meeting, stakeholders disagree on priorities. How would you facilitate the discussion?",
    expectedApproach: [
      "Remain neutral",
      "Ask each stakeholder to explain their business rationale",
      "Use a prioritization framework (e.g. MoSCoW)",
      "Summarize areas of agreement",
      "Escalate to a sponsor if consensus is not reached"
    ],
    options: [
      { text: "Stay neutral, ask each party to explain their rationale, apply a prioritization framework like MoSCoW, summarize agreements, and escalate to a sponsor if needed.", isCorrect: true },
      { text: "Side with the most senior person in the room to resolve the disagreement quickly.", isCorrect: false },
      { text: "Leave the meeting and let stakeholders sort out priorities between themselves.", isCorrect: false },
      { text: "List all items as equally high priority to avoid making anyone feel their request is less important.", isCorrect: false }
    ]
  },
  {
    id: 19,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Solution Does Not Meet Expectations",
    scenario: "A business user complains that the delivered solution does not meet expectations. What would you do?",
    expectedApproach: [
      "Listen carefully to the specific complaint",
      "Compare delivery against documented requirements",
      "Identify whether this is a gap in requirements, a delivery defect, or a misaligned expectation",
      "Agree on a resolution path and timeline"
    ],
    options: [
      { text: "Listen to the complaint, compare delivery against documented requirements, identify the root cause (gap, defect, or misaligned expectation), and agree on a resolution path with a timeline.", isCorrect: true },
      { text: "Tell the user that the solution was built exactly to the approved requirements and there is nothing further to do.", isCorrect: false },
      { text: "Immediately rebuild the entire solution without first understanding what specifically is unsatisfactory.", isCorrect: false },
      { text: "Escalate directly to the user's manager without first speaking with the user about the issue.", isCorrect: false }
    ]
  },
  {
    id: 20,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Continuously Expanding Requirements",
    scenario: "Stakeholders continuously add new requirements during the project. How would you handle it?",
    expectedApproach: [
      "Enforce the change control process",
      "Log all new requests in a requirements register",
      "Assess the impact of each addition",
      "Communicate scope, timeline, and budget implications",
      "Get formal approval before including any new item"
    ],
    options: [
      { text: "Enforce the change control process, log new requests, assess impact of each addition, communicate implications clearly, and get formal approval before including anything new.", isCorrect: true },
      { text: "Accept all new requirements without review to maintain stakeholder relationships.", isCorrect: false },
      { text: "Ignore all new requirements that come in after the initial sign-off, regardless of business importance.", isCorrect: false },
      { text: "Implement the new requirements informally without any documentation or approval to keep momentum.", isCorrect: false }
    ]
  },
  {
    id: 21,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Missed Requirement After Development Starts",
    scenario: "You discover an important requirement was missed after development has started. What would you do?",
    expectedApproach: [
      "Immediately inform the project manager and relevant stakeholders",
      "Assess the impact on current development",
      "Raise a change request",
      "Prioritize and plan incorporation without disrupting delivery"
    ],
    options: [
      { text: "Immediately inform the project manager and stakeholders, assess the impact on development, raise a change request, and plan incorporation without disrupting delivery.", isCorrect: true },
      { text: "Keep quiet about the missed requirement and hope it is not noticed during testing.", isCorrect: false },
      { text: "Ask the development team to stop all work until the full requirements list is re-reviewed from the beginning.", isCorrect: false },
      { text: "Deliver the project without the missed requirement and add it in a future phase without informing anyone now.", isCorrect: false }
    ]
  },
  {
    id: 22,
    category: 2,
    categoryName: "Requirement Gathering & Stakeholder Management",
    title: "Validating Requirement Understanding Across Teams",
    scenario: "How would you validate that requirements have been correctly understood by all teams?",
    expectedApproach: [
      "Conduct structured walkthroughs and requirement review sessions",
      "Use prototypes or mockups to visualize requirements",
      "Get sign-off from all relevant teams",
      "Create traceability matrices",
      "Run UAT to confirm alignment"
    ],
    options: [
      { text: "Conduct walkthroughs and review sessions, use prototypes to visualize requirements, get sign-off from all teams, create traceability matrices, and run UAT to confirm alignment.", isCorrect: true },
      { text: "Assume all teams understood by simply sending the requirements document via email without any follow-up.", isCorrect: false },
      { text: "Only validate with the development team and assume other teams will figure it out during testing.", isCorrect: false },
      { text: "Ask each team to confirm understanding verbally in a single meeting without any written documentation.", isCorrect: false }
    ]
  },

  // --- CATEGORY 3: BANKING & FINANCIAL SERVICES ---
  {
    id: 23,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Failed Fund Transfer Investigation",
    scenario: "A customer reports that a fund transfer was debited but not credited to the beneficiary account. How would you investigate?",
    expectedApproach: [
      "Check the transaction reference in the core banking system",
      "Verify debit and credit legs",
      "Check for any system or network errors during processing",
      "Liaise with the beneficiary bank if inter-bank",
      "Escalate if funds are not located within SLA timelines"
    ],
    options: [
      { text: "Check the transaction reference in the core banking system, verify both debit and credit legs, check for system or network errors, liaise with the beneficiary bank if inter-bank, and escalate if unresolved within SLA.", isCorrect: true },
      { text: "Immediately refund the customer without first investigating where the funds are, risking a duplicate credit.", isCorrect: false },
      { text: "Tell the customer to wait 30 days and the funds will automatically reverse without investigation.", isCorrect: false },
      { text: "Close the complaint as resolved without verifying whether the beneficiary actually received the funds.", isCorrect: false }
    ]
  },
  {
    id: 24,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Increased Transaction Processing Time",
    scenario: "Transaction processing time has increased significantly. How would you analyze the issue?",
    expectedApproach: [
      "Review system performance logs and timestamps",
      "Check for batch processing delays or queue buildup",
      "Identify peak load patterns",
      "Liaise with IT for infrastructure issues",
      "Recommend optimization steps"
    ],
    options: [
      { text: "Review system performance logs, check for batch delays or queue buildup, identify peak load patterns, liaise with IT on infrastructure, and recommend optimization steps.", isCorrect: true },
      { text: "Assume it is a temporary issue and take no action unless customers start complaining formally.", isCorrect: false },
      { text: "Immediately increase transaction fees to reduce volume and processing load.", isCorrect: false },
      { text: "Shut down non-critical systems without first diagnosing the root cause.", isCorrect: false }
    ]
  },
  {
    id: 25,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Regulatory Change Implementation",
    scenario: "A regulatory change requires modifications to a banking process within one month. What steps would you take?",
    expectedApproach: [
      "Understand the regulatory requirement in detail",
      "Identify impacted processes and systems",
      "Engage compliance, IT, and operations teams",
      "Create a project plan with clear milestones",
      "Test and implement changes within the deadline",
      "Document all changes for audit"
    ],
    options: [
      { text: "Understand the requirement, identify impacted processes and systems, engage compliance, IT, and operations, create a milestone plan, test and implement within the deadline, and document for audit.", isCorrect: true },
      { text: "Implement the changes informally without involving compliance or IT to save time.", isCorrect: false },
      { text: "Request a regulatory extension without attempting to begin any implementation work first.", isCorrect: false },
      { text: "Apply changes only to systems that are easy to modify and ignore complex processes to meet the deadline.", isCorrect: false }
    ]
  },
  {
    id: 26,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Failed Online Payments Investigation",
    scenario: "Multiple customers complain about failed online payments. How would you identify the root cause?",
    expectedApproach: [
      "Check payment gateway logs and error codes",
      "Identify if failures are across all banks or specific to one",
      "Check if the issue is merchant-side or bank-side",
      "Review recent system changes",
      "Coordinate with the technical team for resolution"
    ],
    options: [
      { text: "Check payment gateway logs and error codes, determine if failures are isolated to one bank or widespread, identify whether it is merchant-side or bank-side, review recent system changes, and coordinate with technical teams.", isCorrect: true },
      { text: "Ask all customers to retry their payments without investigating the root cause.", isCorrect: false },
      { text: "Assume the issue is with the customer's internet connection and close the complaints.", isCorrect: false },
      { text: "Temporarily shut down the online payment portal without diagnosing the issue first.", isCorrect: false }
    ]
  },
  {
    id: 27,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Daily Transaction Trend Report",
    scenario: "A branch manager wants a report showing daily transaction trends. How would you approach the request?",
    expectedApproach: [
      "Clarify the required metrics, time period, and format",
      "Extract data from the core banking system",
      "Validate data accuracy",
      "Build the report with clear visualizations",
      "Schedule it as a recurring automated report if needed"
    ],
    options: [
      { text: "Clarify required metrics, time period, and format; extract and validate data from the core banking system; build clear visualizations; and schedule as a recurring automated report if needed.", isCorrect: true },
      { text: "Send raw transaction data dumps to the branch manager and let them build their own report.", isCorrect: false },
      { text: "Provide last month's report without updating it for current data.", isCorrect: false },
      { text: "Build the report based on your own assumptions about what metrics matter most without clarifying with the branch manager.", isCorrect: false }
    ]
  },
  {
    id: 28,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "KYC Policy Compliance",
    scenario: "A new KYC policy is introduced. How would you ensure business processes comply?",
    expectedApproach: [
      "Review the new policy in detail",
      "Map the changes to existing processes",
      "Identify gaps",
      "Work with compliance and operations to update workflows",
      "Train staff on new requirements",
      "Monitor compliance through audits"
    ],
    options: [
      { text: "Review the policy, map changes to existing processes, identify gaps, update workflows with compliance and operations, train staff, and monitor through audits.", isCorrect: true },
      { text: "Circulate the new policy document by email and assume all staff will self-implement the required changes.", isCorrect: false },
      { text: "Apply KYC changes only to new customers and leave existing customer processes unchanged.", isCorrect: false },
      { text: "Wait until a regulatory audit flags non-compliance before making any process changes.", isCorrect: false }
    ]
  },
  {
    id: 29,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Duplicate Transaction Alerts",
    scenario: "A customer receives duplicate transaction alerts. How would you investigate?",
    expectedApproach: [
      "Check the notification system logs for duplicate triggers",
      "Verify whether actual duplicate transactions occurred or only the alerts were duplicated",
      "Check recent system changes or bugs",
      "Resolve the technical issue and reassure the customer"
    ],
    options: [
      { text: "Check notification system logs for duplicate triggers, verify whether actual duplicate transactions or only alerts were duplicated, check for recent system changes or bugs, resolve the technical issue, and reassure the customer.", isCorrect: true },
      { text: "Immediately reverse both transactions assuming a duplicate payment occurred without verifying.", isCorrect: false },
      { text: "Tell the customer to ignore duplicate alerts as they are a known system limitation.", isCorrect: false },
      { text: "Block the customer's account pending investigation without informing them of the reason.", isCorrect: false }
    ]
  },
  {
    id: 30,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Fraudulent Transaction Analysis",
    scenario: "Fraudulent transactions are increasing in a particular region. What analysis would you perform?",
    expectedApproach: [
      "Analyze transaction data by region, channel, and customer profile",
      "Identify common patterns (time, amount, merchant type)",
      "Check for compromised card data or credentials",
      "Engage the fraud risk team",
      "Recommend preventive controls"
    ],
    options: [
      { text: "Analyze transaction data by region, channel, and profile; identify patterns in time, amount, and merchant type; check for compromised data; engage the fraud risk team; and recommend preventive controls.", isCorrect: true },
      { text: "Immediately block all transactions from that region without analysis.", isCorrect: false },
      { text: "Wait for more fraud cases to accumulate before starting any investigation.", isCorrect: false },
      { text: "Report the increase to regulators only without performing any internal analysis.", isCorrect: false }
    ]
  },
  {
    id: 31,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Reducing Account Opening Turnaround Time",
    scenario: "The bank wants to reduce account opening turnaround time. How would you help?",
    expectedApproach: [
      "Map the current account opening process end-to-end",
      "Identify bottlenecks and manual steps",
      "Benchmark against industry standards",
      "Recommend automation of document verification and approvals",
      "Measure improvement after implementation"
    ],
    options: [
      { text: "Map the current process end-to-end, identify bottlenecks and manual steps, benchmark against industry standards, recommend automation of key steps, and measure improvement post-implementation.", isCorrect: true },
      { text: "Simply ask staff to work faster without changing any processes or systems.", isCorrect: false },
      { text: "Remove all verification and approval steps to speed up account opening.", isCorrect: false },
      { text: "Reduce turnaround time targets on paper without making any actual process changes.", isCorrect: false }
    ]
  },
  {
    id: 32,
    category: 3,
    categoryName: "Banking & Financial Services",
    title: "Critical Banking Application Unavailable",
    scenario: "A critical banking application is unavailable during business hours. What would be your immediate actions?",
    expectedApproach: [
      "Alert IT and senior management immediately",
      "Check if backup or failover systems are available",
      "Assess business impact and affected transactions",
      "Communicate status to branches and customers",
      "Initiate incident management procedure"
    ],
    options: [
      { text: "Alert IT and senior management immediately, check for backup or failover systems, assess business impact, communicate status to branches and customers, and initiate incident management procedures.", isCorrect: true },
      { text: "Wait an hour to see if the application recovers on its own before taking any action.", isCorrect: false },
      { text: "Ask branch staff to manually process all transactions without reporting the outage.", isCorrect: false },
      { text: "Send an apology email to customers before diagnosing or resolving the issue.", isCorrect: false }
    ]
  },

  // --- CATEGORY 4: DATA ANALYSIS ---
  {
    id: 33,
    category: 4,
    categoryName: "Data Analysis",
    title: "Inconsistent Data from Multiple Sources",
    scenario: "You receive a report containing inconsistent data from multiple sources. What would you do?",
    expectedApproach: [
      "Identify the sources of inconsistency",
      "Cross-check data against primary source records",
      "Check for different data extraction dates or methodologies",
      "Clean and reconcile the data",
      "Document the discrepancy and resolution"
    ],
    options: [
      { text: "Identify sources of inconsistency, cross-check against primary records, check for different extraction dates or methodologies, clean and reconcile the data, and document the discrepancy and resolution.", isCorrect: true },
      { text: "Use the data from whichever source has the highest numbers and proceed with the report.", isCorrect: false },
      { text: "Delete all inconsistent records and report only the data that appears clean.", isCorrect: false },
      { text: "Submit the report with the inconsistencies intact and note it as a data quality issue for someone else to fix.", isCorrect: false }
    ]
  },
  {
    id: 34,
    category: 4,
    categoryName: "Data Analysis",
    title: "Declining Customer Satisfaction Analysis",
    scenario: "Management asks you to identify reasons for declining customer satisfaction. How would you approach the analysis?",
    expectedApproach: [
      "Review customer satisfaction survey data and trends",
      "Analyze customer complaints by category",
      "Cross-reference with service metrics (wait times, resolution rates)",
      "Identify common themes",
      "Present root causes with supporting data and recommendations"
    ],
    options: [
      { text: "Review survey data and complaint trends, cross-reference with service metrics, identify common themes, and present root causes with supporting data and recommendations.", isCorrect: true },
      { text: "Attribute the decline to seasonal factors without reviewing any data.", isCorrect: false },
      { text: "Survey only satisfied customers and use that data to report overall satisfaction.", isCorrect: false },
      { text: "Recommend a marketing campaign without first analyzing the actual reasons for the decline.", isCorrect: false }
    ]
  },
  {
    id: 35,
    category: 4,
    categoryName: "Data Analysis",
    title: "Validating Unexpected Revenue Fluctuations",
    scenario: "A dashboard shows unexpected revenue fluctuations. How would you validate the data?",
    expectedApproach: [
      "Check data pipeline and source system for errors",
      "Verify date ranges and filters applied",
      "Compare against raw transaction data",
      "Check for one-time or non-recurring items",
      "Confirm with the finance team"
    ],
    options: [
      { text: "Check the data pipeline and source systems, verify date ranges and filters, compare against raw transaction data, check for one-time items, and confirm with the finance team.", isCorrect: true },
      { text: "Assume the dashboard is correct and present the fluctuations to management without further investigation.", isCorrect: false },
      { text: "Adjust the revenue figures manually to smooth out fluctuations before presenting.", isCorrect: false },
      { text: "Rebuild the entire dashboard from scratch without first checking whether the source data is correct.", isCorrect: false }
    ]
  },
  {
    id: 36,
    category: 4,
    categoryName: "Data Analysis",
    title: "Missing Records in a Critical Report",
    scenario: "You identify missing records in a critical report. What steps would you take?",
    expectedApproach: [
      "Identify how many records are missing and which time period they cover",
      "Trace back to the data source",
      "Check for extraction or transformation errors",
      "Recover or reconstruct missing records where possible",
      "Report the issue to the relevant owner"
    ],
    options: [
      { text: "Identify the volume and period of missing records, trace back to source, check for extraction or transformation errors, recover records where possible, and report to the relevant owner.", isCorrect: true },
      { text: "Publish the report with missing records and add a footnote.", isCorrect: false },
      { text: "Fill in the missing records with estimated values without disclosing that they are estimates.", isCorrect: false },
      { text: "Discard the report entirely and start collecting data from scratch.", isCorrect: false }
    ]
  },
  {
    id: 37,
    category: 4,
    categoryName: "Data Analysis",
    title: "Large Dataset with No Clear Objective",
    scenario: "A manager requests insights from a large dataset with no clear objective. How would you proceed?",
    expectedApproach: [
      "Clarify the business question or decision the manager is trying to make",
      "Agree on key metrics and dimensions to explore",
      "Perform exploratory data analysis",
      "Present initial findings and refine based on feedback"
    ],
    options: [
      { text: "Clarify the business question, agree on key metrics and dimensions, perform exploratory data analysis, and present initial findings for refinement.", isCorrect: true },
      { text: "Produce every possible chart and table from the dataset and send them all to the manager without any structure.", isCorrect: false },
      { text: "Decline the request until a clear objective is provided in writing.", isCorrect: false },
      { text: "Run a single average calculation across all columns and present it as the insight.", isCorrect: false }
    ]
  },
  {
    id: 38,
    category: 4,
    categoryName: "Data Analysis",
    title: "Customer Churn Increased by 15%",
    scenario: "Customer churn has increased by 15%. How would you analyze the situation?",
    expectedApproach: [
      "Segment churned customers by product, region, tenure, and channel",
      "Compare with retained customers",
      "Analyze churn reasons from exit surveys or complaints",
      "Identify key churn drivers",
      "Recommend targeted retention strategies"
    ],
    options: [
      { text: "Segment churned customers by product, region, tenure, and channel; compare with retained customers; analyze exit surveys and complaints; identify key drivers; and recommend targeted retention strategies.", isCorrect: true },
      { text: "Launch a discount campaign immediately without analyzing who is churning or why.", isCorrect: false },
      { text: "Attribute the churn entirely to competitors without reviewing internal data.", isCorrect: false },
      { text: "Report the 15% figure to management without any segmentation or root cause analysis.", isCorrect: false }
    ]
  },
  {
    id: 39,
    category: 4,
    categoryName: "Data Analysis",
    title: "Mismatched Sales Figures Across Reports",
    scenario: "Sales figures from two reports do not match. How would you investigate?",
    expectedApproach: [
      "Identify the data sources feeding each report",
      "Check if different filters, date ranges, or definitions of revenue are applied",
      "Reconcile at the transaction level",
      "Identify and fix the source of discrepancy",
      "Document the finding"
    ],
    options: [
      { text: "Identify the data sources, check for different filters, date ranges, or revenue definitions, reconcile at transaction level, fix the discrepancy, and document the finding.", isCorrect: true },
      { text: "Use the higher figure in both reports to avoid underreporting revenue.", isCorrect: false },
      { text: "Average the two figures and use that as the official number.", isCorrect: false },
      { text: "Delete one of the reports to eliminate the inconsistency.", isCorrect: false }
    ]
  },
  {
    id: 40,
    category: 4,
    categoryName: "Data Analysis",
    title: "Duplicate Customer Records",
    scenario: "You notice duplicate customer records in the database. How would you address the issue?",
    expectedApproach: [
      "Identify the extent of duplication",
      "Determine matching criteria (name, ID, date of birth)",
      "Merge or flag duplicates following a defined data governance process",
      "Investigate how duplicates were created",
      "Recommend process controls to prevent recurrence"
    ],
    options: [
      { text: "Identify the extent of duplication, apply defined matching criteria, merge or flag duplicates per data governance process, investigate root cause, and recommend controls to prevent recurrence.", isCorrect: true },
      { text: "Delete all duplicate records immediately without reviewing which record is the master.", isCorrect: false },
      { text: "Leave the duplicates in place and filter them out manually in every report going forward.", isCorrect: false },
      { text: "Combine all duplicate fields into one record randomly without checking which data is correct.", isCorrect: false }
    ]
  },
  {
    id: 41,
    category: 4,
    categoryName: "Data Analysis",
    title: "Report Deadline Tomorrow, Data Quality Issues Unresolved",
    scenario: "A report deadline is tomorrow, but data quality issues remain unresolved. What would you do?",
    expectedApproach: [
      "Assess the materiality of the data quality issue",
      "Inform the relevant stakeholder about the issue and its potential impact",
      "Publish the report with a clear caveat if the issue is non-critical",
      "Delay or escalate if the issue is material",
      "Document everything"
    ],
    options: [
      { text: "Assess materiality, inform the stakeholder about the impact, publish with a clear caveat if non-critical, escalate or delay if material, and document everything.", isCorrect: true },
      { text: "Publish the report on time without disclosing any data quality issues.", isCorrect: false },
      { text: "Skip the deadline entirely without informing anyone and fix the issues at your own pace.", isCorrect: false },
      { text: "Fill in the problematic data fields with estimates without any disclosure.", isCorrect: false }
    ]
  },
  {
    id: 42,
    category: 4,
    categoryName: "Data Analysis",
    title: "Presenting Complex Findings to Non-Technical Stakeholders",
    scenario: "How would you present complex analytical findings to non-technical stakeholders?",
    expectedApproach: [
      "Translate findings into business language",
      "Use clear visualizations (charts, dashboards)",
      "Lead with the key insight and business impact",
      "Avoid technical jargon",
      "Prepare a simple summary slide and offer to walk through details separately"
    ],
    options: [
      { text: "Translate into business language, use clear visualizations, lead with the key insight and business impact, avoid jargon, and offer a detailed walkthrough separately.", isCorrect: true },
      { text: "Present the full technical methodology and raw data tables to demonstrate rigor.", isCorrect: false },
      { text: "Simplify by removing all data and presenting only your personal recommendation without supporting evidence.", isCorrect: false },
      { text: "Send the full analysis report without any summary and let stakeholders draw their own conclusions.", isCorrect: false }
    ]
  },

  // --- CATEGORY 5: PROCESS IMPROVEMENT ---
  {
    id: 43,
    category: 5,
    categoryName: "Process Improvement",
    title: "Reducing a 10-Day Process to 5 Days",
    scenario: "A process takes 10 days to complete, and management wants it reduced to 5 days. What would you do?",
    expectedApproach: [
      "Map the current process end-to-end",
      "Identify bottlenecks, delays, and non-value-adding steps",
      "Benchmark against best practices",
      "Redesign the process",
      "Pilot and measure improvement"
    ],
    options: [
      { text: "Map the current process, identify bottlenecks and non-value-adding steps, benchmark against best practices, redesign, pilot, and measure improvement.", isCorrect: true },
      { text: "Ask staff to work overtime to complete the same process in half the time without any process changes.", isCorrect: false },
      { text: "Remove mandatory approval steps without assessing the risk of doing so.", isCorrect: false },
      { text: "Report to management that 5 days is not achievable without attempting any analysis.", isCorrect: false }
    ]
  },
  {
    id: 44,
    category: 5,
    categoryName: "Process Improvement",
    title: "Reducing Manual Data Entry Errors",
    scenario: "Employees frequently make errors during manual data entry. How would you improve the process?",
    expectedApproach: [
      "Identify the most common error types and root causes",
      "Introduce input validation and system controls",
      "Automate where possible",
      "Provide targeted training",
      "Implement a double-check or review step for critical data"
    ],
    options: [
      { text: "Identify common error types and root causes, introduce input validation and controls, automate where possible, provide training, and implement a review step for critical data.", isCorrect: true },
      { text: "Discipline employees who make errors without changing any process or system controls.", isCorrect: false },
      { text: "Accept manual errors as unavoidable and build error correction into downstream processes instead.", isCorrect: false },
      { text: "Replace all staff performing data entry without first understanding why errors are occurring.", isCorrect: false }
    ]
  },
  {
    id: 45,
    category: 5,
    categoryName: "Process Improvement",
    title: "Long Customer Wait Times",
    scenario: "Customers complain about long wait times. How would you analyze and improve the situation?",
    expectedApproach: [
      "Measure current wait times and identify peak demand periods",
      "Analyze resource allocation against demand",
      "Identify bottlenecks in the service process",
      "Implement queue management improvements",
      "Monitor and measure outcomes"
    ],
    options: [
      { text: "Measure current wait times, analyze peak demand and resource allocation, identify service bottlenecks, implement queue management improvements, and monitor outcomes.", isCorrect: true },
      { text: "Ask customers to arrive at off-peak times without making any operational changes.", isCorrect: false },
      { text: "Add more staff without first analyzing where the bottleneck actually exists.", isCorrect: false },
      { text: "Remove service steps to reduce wait time without assessing the impact on service quality.", isCorrect: false }
    ]
  },
  {
    id: 46,
    category: 5,
    categoryName: "Process Improvement",
    title: "Approval Delays Across Multiple Teams",
    scenario: "A process involves approvals from multiple teams causing delays. What would you recommend?",
    expectedApproach: [
      "Map the full approval chain",
      "Identify which approvals add value and which are redundant",
      "Implement parallel approvals where possible",
      "Set SLA timelines for each approval",
      "Automate routing through a workflow tool"
    ],
    options: [
      { text: "Map the approval chain, identify redundant approvals, implement parallel approvals where possible, set SLA timelines, and automate routing through a workflow tool.", isCorrect: true },
      { text: "Remove all approvals to eliminate delays entirely regardless of risk.", isCorrect: false },
      { text: "Keep the same approval chain but add more approvers to speed up the process.", isCorrect: false },
      { text: "Report the delays as a people problem and escalate to HR without analyzing the process.", isCorrect: false }
    ]
  },
  {
    id: 47,
    category: 5,
    categoryName: "Process Improvement",
    title: "Evaluating Automation Feasibility",
    scenario: "A department wants to automate a repetitive manual task. How would you evaluate feasibility?",
    expectedApproach: [
      "Document the current manual process in detail",
      "Identify volume, frequency, and complexity",
      "Assess available technology options",
      "Estimate cost vs benefit",
      "Run a pilot before full implementation"
    ],
    options: [
      { text: "Document the manual process, identify volume, frequency, and complexity, assess technology options, estimate cost vs benefit, and run a pilot before full implementation.", isCorrect: true },
      { text: "Immediately procure automation software without assessing the process or calculating ROI.", isCorrect: false },
      { text: "Reject automation entirely because manual processes are more reliable.", isCorrect: false },
      { text: "Automate the task without documenting the existing process or consulting the team performing it.", isCorrect: false }
    ]
  },
  {
    id: 48,
    category: 5,
    categoryName: "Process Improvement",
    title: "Identifying Bottlenecks in a Business Process",
    scenario: "How would you identify bottlenecks in an existing business process?",
    expectedApproach: [
      "Map the process end-to-end",
      "Collect time data at each step",
      "Identify steps with the longest wait or processing times",
      "Observe the process in practice",
      "Interview staff performing each step",
      "Prioritize the biggest constraint for resolution"
    ],
    options: [
      { text: "Map the process, collect time data at each step, identify the longest wait or processing times, observe in practice, interview staff, and prioritize the biggest constraint.", isCorrect: true },
      { text: "Assume the bottleneck is always at the final step of the process without any data collection.", isCorrect: false },
      { text: "Ask the most senior manager to identify the bottleneck based on intuition alone.", isCorrect: false },
      { text: "Focus only on the steps the team finds most frustrating rather than collecting objective time data.", isCorrect: false }
    ]
  },
  {
    id: 49,
    category: 5,
    categoryName: "Process Improvement",
    title: "Poor Adoption of a New Process",
    scenario: "A new process is implemented, but adoption is poor. What would you do?",
    expectedApproach: [
      "Identify the reasons for poor adoption through interviews or surveys",
      "Check if the training was adequate",
      "Assess whether the new process is more difficult than the old one",
      "Address specific barriers",
      "Reinforce adoption through leadership support and change management"
    ],
    options: [
      { text: "Identify reasons for poor adoption through interviews or surveys, check training adequacy, assess process usability, address specific barriers, and reinforce through leadership support and change management.", isCorrect: true },
      { text: "Mandate compliance through disciplinary action without understanding why adoption is low.", isCorrect: false },
      { text: "Revert to the old process immediately without investigating the adoption issue.", isCorrect: false },
      { text: "Assume adoption will improve on its own over time without any intervention.", isCorrect: false }
    ]
  },
  {
    id: 50,
    category: 5,
    categoryName: "Process Improvement",
    title: "Different Teams Following Different Process Versions",
    scenario: "You find that different teams follow different versions of the same process. How would you handle it?",
    expectedApproach: [
      "Identify the variations and their origins",
      "Assess which version is most effective and compliant",
      "Consult all teams and agree on a single standardized version",
      "Update and publish the official process document",
      "Train all teams and monitor compliance"
    ],
    options: [
      { text: "Identify the variations, assess which version is most effective, consult all teams, agree on a single standard, publish the updated document, train all teams, and monitor compliance.", isCorrect: true },
      { text: "Let each team continue using the version they prefer since outcomes are the same.", isCorrect: false },
      { text: "Choose the version used by the largest team and impose it on others without consultation.", isCorrect: false },
      { text: "Document all versions as equally valid official processes to avoid conflict.", isCorrect: false }
    ]
  },
  {
    id: 51,
    category: 5,
    categoryName: "Process Improvement",
    title: "Measuring Process Improvement Success",
    scenario: "How would you measure whether a process improvement initiative was successful?",
    expectedApproach: [
      "Define success metrics before implementation (time, cost, error rate, customer satisfaction)",
      "Collect baseline data",
      "Measure KPIs after implementation",
      "Compare against baseline",
      "Report findings and sustain improvements"
    ],
    options: [
      { text: "Define success metrics and baseline before implementation, measure KPIs after, compare against baseline, report findings, and sustain improvements.", isCorrect: true },
      { text: "Declare success as soon as the new process is launched without measuring any outcomes.", isCorrect: false },
      { text: "Only measure success if senior management specifically asks for a report.", isCorrect: false },
      { text: "Use employee opinion alone as the measure of success without any quantitative data.", isCorrect: false }
    ]
  },
  {
    id: 52,
    category: 5,
    categoryName: "Process Improvement",
    title: "Cost Reduction Without Affecting Customer Experience",
    scenario: "Management wants cost reduction without affecting customer experience. What approach would you suggest?",
    expectedApproach: [
      "Identify non-customer-facing costs that can be reduced",
      "Automate internal processes",
      "Eliminate waste and duplication",
      "Review vendor contracts",
      "Monitor customer experience metrics throughout to ensure quality is maintained"
    ],
    options: [
      { text: "Identify non-customer-facing cost reduction opportunities, automate internal processes, eliminate waste, review vendor contracts, and monitor customer experience metrics throughout.", isCorrect: true },
      { text: "Reduce headcount in customer-facing roles to achieve the largest savings fastest.", isCorrect: false },
      { text: "Lower product or service quality standards to reduce delivery costs.", isCorrect: false },
      { text: "Increase prices to customers as an alternative to reducing internal costs.", isCorrect: false }
    ]
  },

  // --- CATEGORY 6: PROBLEM SOLVING & DECISION MAKING ---
  {
    id: 53,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Critical Issue One Day Before Go-Live",
    scenario: "You discover a critical issue one day before project go-live. What would you do?",
    expectedApproach: [
      "Immediately escalate to the project manager and relevant stakeholders",
      "Assess the severity and impact",
      "Determine whether to delay go-live or implement a workaround",
      "Communicate transparently",
      "Document the issue and resolution plan"
    ],
    options: [
      { text: "Immediately escalate to the project manager and stakeholders, assess severity and impact, determine whether to delay or apply a workaround, communicate transparently, and document the resolution plan.", isCorrect: true },
      { text: "Proceed with go-live and hope the issue does not affect users.", isCorrect: false },
      { text: "Fix the issue quietly without informing any stakeholders to avoid concern.", isCorrect: false },
      { text: "Cancel the project entirely without assessing whether the issue can be resolved.", isCorrect: false }
    ]
  },
  {
    id: 54,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Stakeholder Requests Data-Unsupported Solution",
    scenario: "A senior stakeholder asks for a solution that data does not support. How would you respond?",
    expectedApproach: [
      "Present the data evidence objectively",
      "Explain what the data suggests",
      "Propose data-supported alternatives",
      "Remain professional and respectful",
      "Escalate if the stakeholder insists on an approach that carries significant risk"
    ],
    options: [
      { text: "Present data evidence objectively, explain what the data suggests, propose supported alternatives, remain professional, and escalate if the stakeholder insists on a high-risk approach.", isCorrect: true },
      { text: "Agree with the stakeholder's solution to avoid conflict regardless of what the data shows.", isCorrect: false },
      { text: "Refuse to work on the solution entirely without discussing alternatives.", isCorrect: false },
      { text: "Implement the solution without raising any concern because the stakeholder is senior.", isCorrect: false }
    ]
  },
  {
    id: 55,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Prioritizing with Limited Budget and Resources",
    scenario: "Your project has limited budget and resources. How would you prioritize work?",
    expectedApproach: [
      "List all deliverables and assess business value and risk of each",
      "Apply a prioritization framework (e.g. MoSCoW)",
      "Agree priorities with stakeholders",
      "Focus resources on highest-value items first",
      "Communicate trade-offs transparently"
    ],
    options: [
      { text: "List deliverables, assess business value and risk, apply a prioritization framework, agree with stakeholders, focus on highest-value items, and communicate trade-offs transparently.", isCorrect: true },
      { text: "Attempt to deliver everything within the same timeline by cutting quality across all deliverables.", isCorrect: false },
      { text: "Focus resources on the easiest tasks first regardless of their business value.", isCorrect: false },
      { text: "Ask for more budget without first demonstrating how existing resources are being prioritized.", isCorrect: false }
    ]
  },
  {
    id: 56,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Assigned to an Unfamiliar Domain",
    scenario: "You are assigned a project in an unfamiliar domain. How would you get up to speed quickly?",
    expectedApproach: [
      "Read background materials and domain documentation",
      "Schedule knowledge transfer sessions with subject matter experts",
      "Ask structured questions",
      "Map key processes and terminology",
      "Apply learning progressively while delivering"
    ],
    options: [
      { text: "Read background materials, schedule knowledge transfer with subject matter experts, ask structured questions, map key processes and terminology, and apply learning while delivering.", isCorrect: true },
      { text: "Pretend to be familiar with the domain to appear confident and figure it out as you go without seeking help.", isCorrect: false },
      { text: "Request to be reassigned to a project in a domain you already know.", isCorrect: false },
      { text: "Wait until the project is fully underway before attempting to understand the domain.", isCorrect: false }
    ]
  },
  {
    id: 57,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Multiple High-Priority Tasks with the Same Deadline",
    scenario: "Multiple high-priority tasks have the same deadline. How would you manage them?",
    expectedApproach: [
      "List all tasks and estimate effort",
      "Assess actual urgency and business impact of each",
      "Negotiate deadlines where possible",
      "Communicate constraints to your manager",
      "Deliver in priority order and flag risks proactively"
    ],
    options: [
      { text: "List tasks and estimate effort, assess urgency and impact, negotiate deadlines where possible, communicate constraints to your manager, and deliver in priority order with proactive risk flagging.", isCorrect: true },
      { text: "Work on all tasks simultaneously without prioritizing, resulting in partial completion of everything.", isCorrect: false },
      { text: "Randomly choose one task to complete and ignore the rest without informing anyone.", isCorrect: false },
      { text: "Tell all requesters their task will be done last to set low expectations.", isCorrect: false }
    ]
  },
  {
    id: 58,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Key Team Member Leaves Unexpectedly",
    scenario: "A key team member leaves the project unexpectedly. How would you minimize the impact?",
    expectedApproach: [
      "Identify and document the departing member's knowledge and responsibilities immediately",
      "Reassign critical tasks",
      "Assess the impact on the project timeline",
      "Inform stakeholders",
      "Plan for backfill or knowledge transfer"
    ],
    options: [
      { text: "Document the departing member's knowledge and responsibilities, reassign critical tasks, assess timeline impact, inform stakeholders, and plan for backfill or knowledge transfer.", isCorrect: true },
      { text: "Divide all their tasks equally among remaining team members without assessing capacity.", isCorrect: false },
      { text: "Wait for a replacement to be hired before resuming the tasks the departing member was responsible for.", isCorrect: false },
      { text: "Inform stakeholders only after the project falls behind schedule.", isCorrect: false }
    ]
  },
  {
    id: 59,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Requirement Declared Technically Impossible",
    scenario: "The development team says a requirement is technically impossible. How would you proceed?",
    expectedApproach: [
      "Understand the specific technical constraints",
      "Explore alternative technical approaches with the team",
      "Consult a technical architect if needed",
      "Present alternatives to the stakeholder",
      "Agree on a feasible solution that meets the core business need"
    ],
    options: [
      { text: "Understand the constraints, explore alternative approaches with the team, consult a technical architect if needed, present alternatives to the stakeholder, and agree on a feasible solution.", isCorrect: true },
      { text: "Accept the development team's statement without question and cancel the requirement.", isCorrect: false },
      { text: "Insist the development team implement it exactly as specified regardless of technical feasibility.", isCorrect: false },
      { text: "Promise the stakeholder the requirement will be delivered without first resolving the technical constraint.", isCorrect: false }
    ]
  },
  {
    id: 60,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "User Resistance to System Change",
    scenario: "Users resist a system change because they prefer existing processes. How would you handle the situation?",
    expectedApproach: [
      "Understand the reasons for resistance through conversations",
      "Communicate the benefits of the change clearly",
      "Involve users in the solution where possible",
      "Provide adequate training and support",
      "Work with leadership to reinforce the change"
    ],
    options: [
      { text: "Understand the reasons for resistance, communicate benefits clearly, involve users in the solution where possible, provide training and support, and work with leadership to reinforce the change.", isCorrect: true },
      { text: "Mandate the change through policy enforcement without addressing user concerns.", isCorrect: false },
      { text: "Revert to the old system to avoid conflict with users.", isCorrect: false },
      { text: "Escalate all resistant users to HR for disciplinary action.", isCorrect: false }
    ]
  },
  {
    id: 61,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "Project Behind Schedule",
    scenario: "A project is behind schedule by several weeks. What actions would you take?",
    expectedApproach: [
      "Identify the root cause of the delay",
      "Assess the remaining work and realistic delivery date",
      "Discuss recovery options (scope reduction, resource addition, parallel workstreams)",
      "Communicate transparently with stakeholders",
      "Update the project plan"
    ],
    options: [
      { text: "Identify root cause of delay, assess remaining work and realistic delivery date, discuss recovery options, communicate transparently with stakeholders, and update the project plan.", isCorrect: true },
      { text: "Continue working at the same pace and hope the project catches up on its own.", isCorrect: false },
      { text: "Reduce quality standards across all remaining deliverables to catch up on time.", isCorrect: false },
      { text: "Inform stakeholders the project is on track to avoid escalation.", isCorrect: false }
    ]
  },
  {
    id: 62,
    category: 6,
    categoryName: "Problem Solving & Decision Making",
    title: "No KPI Improvement After Implementation",
    scenario: "After implementation, KPIs show no improvement despite significant effort. How would you analyze and address the situation?",
    expectedApproach: [
      "Verify that KPIs are being measured correctly",
      "Check if the implementation was fully adopted",
      "Assess whether the root cause was correctly identified in the first place",
      "Analyze external factors",
      "Revisit the solution design and adjust as needed"
    ],
    options: [
      { text: "Verify KPI measurement accuracy, check adoption levels, reassess root cause identification, analyze external factors, and revisit and adjust the solution design.", isCorrect: true },
      { text: "Declare the initiative a failure and move on without investigation.", isCorrect: false },
      { text: "Report the KPIs as improved by adjusting measurement methodology to show a better result.", isCorrect: false },
      { text: "Blame the team responsible for implementation without reviewing data or process.", isCorrect: false }
    ]
  }
];
