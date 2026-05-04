export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "CloudBees",
    role: "Senior Frontend Engineer",
    period: "Feb 2025 – Apr 2026",
    location: "Bengaluru",
    summary:
      "Frontend-heavy full-stack on the CloudBees SaaS platform — admin dashboards, integrations, and AI-assisted product workflows.",
    bullets: [
      "Enhanced an in-product AI assistant (Unify AI) built with CopilotKit and LLM tool-calling, enabling natural-language workflow operations.",
      "Implemented file-level unit test coverage enforcement across the frontend monorepo, raising compliance to 90%+ on changed files.",
      "Built a hash-based test caching mechanism for pre-push hooks and CI, reducing frontend test execution time by ~45%.",
      "Contributed to a unified connection-status model across Jira, GitHub, GitLab, Bitbucket, Jenkins, and CloudBees CI.",
      "Collaborated on Go, Node.js, REST, and gRPC-to-HTTP integration layers exposing backend platform capabilities to the React/TypeScript SaaS frontend.",
    ],
  },
  {
    company: "HashedIn by Deloitte",
    role: "Software Engineer 2",
    period: "Feb 2020 – Feb 2025",
    location: "Bengaluru",
    summary:
      "Promoted from Intern → SE1 → SE2 over 5 years across e-commerce, analytics, and internal AI tooling.",
    bullets: [
      "Kroger E-Commerce: built check-cashing and credit-card flows; integrated card readers, MICR readers, and weighing scales via Pub/Sub.",
      "Demand Better Analytics: D3.js visualizations in Next.js with React Query optimizations, cutting dashboard load time 20%.",
      "Built an AI-powered Jira ticket generator that converted user stories into structured tickets, reducing manual effort 40%.",
      "Contributed to an AWS-to-Azure migration: integrated Azure AD, Blob Storage, CDN, and SSO; reduced downtime 20%.",
    ],
  },
];