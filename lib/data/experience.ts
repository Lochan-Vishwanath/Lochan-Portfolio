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
    period: "Feb 2025 – Present",
    location: "Remote",
    summary:
      "Frontend heavy full stack on the CloudBees Unify SaaS platform; part of a 20+ engineer frontend team.",
    bullets: [
      "Owned the YAML read and edit capability of the in product AI Assistant built on CopilotKit, enabling the assistant to read existing pipeline YAML, propose edits, and write back validated changes.",
      "Integrated platform Go/gRPC and REST capabilities into CopilotKit tool callable actions, defining frontend facing tool contracts.",
      "Owned design and delivery of the connection health view across third party integrations (Jira, GitHub, GitLab, Bitbucket, Jenkins, CloudBees CI).",
      "Co owned the Admin Tools surface across Licenses, Subscriptions, and Roles.",
      "Wrote a spike for file level unit test coverage enforcement and scaled the rollout, lifting coverage above 90%.",
      "Proposed and implemented a hash based test caching pattern, cutting frontend test execution time by ~45%.",
      "Owned the Playwright E2E codebase for the frontend team, authoring and maintaining tests for admin dashboards."
    ],
  },
  {
    company: "HashedIn by Deloitte",
    role: "Software Engineer 2",
    period: "Feb 2020 – Jan 2025",
    location: "Bangalore",
    summary:
      "Promoted from Intern → SE1 → SE2 over 5 years. Rotated across 7 client projects spanning enterprise SaaS, e-commerce IoT, and analytics.",
    bullets: [
      "Built check cashing and credit card checkout flows for Kroger in store checkout machines; improved transaction speed by ~25%.",
      "Built a web app integrating the ChatGPT API with the Jira API that converted PM and customer conversation transcripts into structured Jira tickets.",
      "Built production analytics dashboards for Demand Better using Next.js and D3.js, optimizing load times by ~20%.",
      "Contributed to migration of frontend infrastructure from AWS to Azure, integrating Azure AD, Blob Storage, CDN, and SSO.",
      "Led technical delivery for the Deloitte Engineering brand page, building the public site in React with scroll-based animations.",
      "Built form heavy enterprise UIs for Herc Rentals and Nexus Platform, optimizing data input flows that lifted form completion by ~25%."
    ],
  },
];