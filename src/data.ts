import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "MIS Reporting Accuracy",
    scenario: "One department's expenses are showing 30% higher than last month. The Finance Manager asks for an explanation within an hour.",
    modelApproach: [
      "Verify source data accuracy first.",
      "Compare current vs previous month's transactions in detail.",
      "Identify unusual entries or outlier transactions.",
      "Check for one-time expenses or wrong accounting bookings.",
      "Prepare a concise summary with supporting data to present to the Finance Manager."
    ]
  },
  {
    id: 2,
    title: "Cost Variance Analysis",
    scenario: "Manufacturing cost for a product increased 15% vs budget.",
    modelApproach: [
      "Break costs down into material, labor, and overhead elements.",
      "Compare actual costs vs budgeted costs for each element.",
      "Identify key drivers of the increase (e.g. key raw material price hike, labor overtime, utilities spike).",
      "Discuss findings and operational variables with the operations/production team.",
      "Recommend concrete corrective actions (e.g. renegotiating with vendors, optimizing labor shifts)."
    ]
  },
  {
    id: 3,
    title: "Data Mismatch in ERP",
    scenario: "ERP shows ₹25 lakhs inventory, warehouse reports ₹22 lakhs.",
    modelApproach: [
      "Reconcile ERP system balances with physical inventory count sheets.",
      "Check recent stock transaction logs for unposted or double-posted entries.",
      "Verify pending GRNs (Goods Received Notes) and stock status adjustments.",
      "Identify specific posting errors or physical shrinkage.",
      "Escalate to seniors with a detailed reconciliation ledger if any unexplained gap remains."
    ]
  },
  {
    id: 4,
    title: "Tight Deadline Reporting",
    scenario: "Finance, HR, and Operations all send \"urgent\" requests simultaneously.",
    modelApproach: [
      "Assess relative commercial and business impact of each request.",
      "Clarify and align specific expectations and absolute deadlines with stakeholders.",
      "Prioritize critical regulatory and cash-sensitive reports first.",
      "Communicate realistic processing timelines proactively to manage stakeholder expectations.",
      "Deliver outputs in pre-aligned phases or draft layouts if compressed schedules demand."
    ]
  },
  {
    id: 5,
    title: "Excel Problem Solving",
    scenario: "Dataset of 50,000 rows with duplicates and missing values.",
    modelApproach: [
      "Always create a backup copy of the original raw dataset before staging modifications.",
      "Remove duplicates systematically via Excel's 'Remove Duplicates' feature or advanced formulas.",
      "Apply filters, conditional formatting, and sorting to inspect visual anomalies and blank fields.",
      "Handle missing values logically (e.g., zero-fills, mean-imputation, or omitting after validating context).",
      "Use Pivot Tables, XLOOKUP/VLOOKUP, and standard summaries to perform aggregation and structured analysis."
    ]
  },
  {
    id: 6,
    title: "Budget Overrun",
    scenario: "A department exceeds its quarterly budget by 20%.",
    modelApproach: [
      "Execute an Actual vs Budget comparison across all budget heads.",
      "Provide a monthly trend analysis to pinpoint the exact time and context of the cost spike.",
      "Identify the true root cause (unexpected business volume, price hikes, or poor control frameworks).",
      "Assess direct impact on full-year forecasts and coordinate adjustments.",
      "Present actionable cost-control suggestions or localized freeze recommendations to management."
    ]
  },
  {
    id: 7,
    title: "Stakeholder Management",
    scenario: "A department head disputes the numbers in your MIS report.",
    modelApproach: [
      "Maintain absolute professionalism, active listening, and open posture.",
      "Offer to review underlying calculations and audit formulas side-by-side.",
      "Verify source data inputs alongside the department head's operational logs.",
      "Explain the reporting methodology, data definitions, and standards systematically.",
      "Own and promptly correct the report if an actual data-entry or logic error is identified."
    ]
  },
  {
    id: 8,
    title: "Cash Flow Monitoring",
    scenario: "Cash availability is reducing despite increasing sales.",
    modelApproach: [
      "Analyze accounts receivables aging reports to inspect collection delays.",
      "Review current payment cycles, vendor credit terms, and cash disbursement frequency.",
      "Check inventory turnover ratios to pinpoint potential inventory buildup or deadweight stock.",
      "Examine sharp changes in operating expenses or pre-paid transactions.",
      "Prepare critical cash flow insights outlining the cash conversion cycle (CCC) trends."
    ]
  },
  {
    id: 9,
    title: "Process Improvement",
    scenario: "Monthly reporting takes three days and is highly manual.",
    modelApproach: [
      "Identify and list repetitive tasks, manual hand-offs, and copy-paste steps.",
      "Automate manual steps using advanced Excel formulas, Power Query, standardized macros, and Pivot Tables.",
      "Create standardized data collection templates for business departments.",
      "Reduce manual interventions through automated data pipelines and links.",
      "Build dynamic validation and checksum formulas to minimize review cycles."
    ]
  },
  {
    id: 10,
    title: "Confidential Data Handling",
    scenario: "A colleague asks you to share salary data unrelated to their work.",
    modelApproach: [
      "Strictly adhere to company information security and payroll privacy policies.",
      "Refuse the request in a polite, direct manner, citing compliance rules and standard governance.",
      "Escalate the suspicious request immediately to the Finance Director or HR compliance if pressured.",
      "Never share or view sensitive data unless verified business authorization is officially documented."
    ]
  },
  {
    id: 11,
    title: "Manufacturing Cost Variance (Fresher-Level FP&A)",
    scenario: "A product's actual manufacturing cost is 18% higher than budgeted. (Treat this as an FP&A-focused variant of variance analysis, suitable for a fresher with internship experience.)",
    modelApproach: [
      "Compare actual vs budgeted costs thoroughly across categories.",
      "Break the variance down specifically into material price/quantity variance, labor rate/efficiency, and overhead.",
      "Identify major external and internal drivers (e.g., raw material inflation, machinery downtime labor, overtime costs).",
      "Validate operational assumptions and actual figures directly with production and procurement leads.",
      "Summarize findings in a clear table, quantify financial impacts, and isolate controllable vs uncontrollable variance.",
      "Recommend corrective actions such as renegotiating freight/vendor pricing, processing audits, or labor optimization."
    ]
  },
  {
    id: 12,
    title: "MIS Reporting Error",
    scenario: "You submitted an MIS report and later discovered a formula error in a report already shared with management.",
    modelApproach: [
      "Acknowledge and own the mathematical formula or data error immediately and professionally without defensiveness.",
      "Correct the report immediately and recalculate all downstream figures.",
      "Proactively communicate the correction to all stakeholders who received the original version, providing the updated copy.",
      "Clearly and briefly explain the impact of the error, highlighting whether it is material or immaterial to strategic decisions.",
      "Implement a strict checker step (such as a checklist summary, peer-review feedback, or automated cross-footing formulas) before any future release."
    ]
  }
];
