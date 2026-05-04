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
      "next.js",
      "typescript",
      "tailwind",
      "zustand",
      "react-query",
      "d3",
      "storybook",
    ],
  },
  {
    command: "lochan --stack ai",
    label: "ai",
    skills: [
      "copilotkit",
      "langchain (familiar)",
      "rag",
      "vector-search",
      "pgvector",
      "openai-sdk",
      "anthropic-sdk",
      "gemini",
      "prompt-engineering",
      "evaluations",
    ],
  },
  {
    command: "lochan --stack backend",
    label: "backend",
    skills: [
      "node",
      "express",
      "postgres",
      "mongodb",
      "go (light)",
      "grpc",
      "rest",
    ],
  },
  {
    command: "lochan --stack devops",
    label: "devops",
    skills: [
      "azure",
      "aws (basics)",
      "github-actions",
      "ci-cd",
      "playwright",
      "jest",
      "vitest",
    ],
  },
];

export const strengths: string[] = [
  "shipping production AI features",
  "frontend system design at scale",
  "test infrastructure & coverage strategy",
  "cross-functional collaboration",
];