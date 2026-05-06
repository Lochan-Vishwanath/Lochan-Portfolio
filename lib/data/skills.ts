export interface SkillGroup {
  command: string;
  label: string;
  skills: string[];
  qualifier?: string;
}

export const skillGroups: SkillGroup[] = [
  {
    command: "lochan --stack frontend",
    label: "frontend",
    skills: [
      "react",
      "next.js (app router/rsc)",
      "typescript",
      "tailwind",
      "material-ui",
      "react-query",
      "redux-toolkit",
      "framer-motion",
    ],
  },
  {
    command: "lochan --stack ai",
    label: "ai",
    skills: [
      "copilotkit",
      "llm-tool-calling",
      "rag",
      "multi-agent-orchestration",
      "model-fallback-chains",
      "gemini",
      "openai-sdk",
      "deepseek",
      "mcp",
    ],
  },
  {
    command: "lochan --stack backend",
    label: "backend",
    skills: [
      "node.js",
      "python (fastapi)",
      "go (familiar)",
      "postgres",
      "supabase",
      "qdrant",
      "rest / grpc",
    ],
  },
  {
    command: "lochan --stack testing",
    label: "testing",
    skills: [
      "playwright",
      "jest",
      "vitest",
      "pytest",
      "github-actions",
      "azure",
      "vercel",
    ],
  },
];

export const strengths: string[] = [
  "shipping production AI features",
  "frontend system design at scale",
  "test infrastructure & coverage strategy",
  "cross-functional collaboration",
];