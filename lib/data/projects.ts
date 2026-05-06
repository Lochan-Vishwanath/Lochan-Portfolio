export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  liveUrl: string | null;
  githubUrl: string;
  techStack: string[];
  metrics: ProjectMetric[];
  interestingDecisions: string[];
  previewType: "iframe" | "screenshots" | "gif" | "mockup";
  previewSrc: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    slug: "clipguessr",
    name: "ClipGuessr",
    tagline:
      "A daily movie guessing game with a fully automated AI content pipeline.",
    liveUrl: "https://clipguessr.app",
    githubUrl: "https://github.com/Lochan-Vishwanath/ClipGuessr",
    techStack: [
      "Next.js",
      "Supabase",
      "Gemini",
      "Playwright",
    ],
    metrics: [
      { label: "Content pipeline", value: "365-day target batches" },
      { label: "Model fallback chain", value: "5 Gemini models" },
      { label: "Quality control", value: "Multimodal LLM-as-judge" },
    ],
    interestingDecisions: [
      "Five-model Gemini fallback chain with task specific cascade ordering and an error classifier.",
      "Three layer content quality control system combining regex metadata filtering, transcript scanning, and a multimodal LLM-as-judge.",
      "YouTube API to Playwright scraping fallback with a drop in interface and a pipeline state machine with checkpointing.",
    ],
    previewType: "mockup",
    previewSrc: "/projects/clipguessr.png",
    screenshots: [
      "/projects/clipguessr.png"
    ],
  },
  {
    slug: "rag-raju",
    name: "RAGmark",
    tagline:
      "Personal YouTube knowledge base for ingesting and querying content across multiple namespaces.",
    liveUrl: "https://rag-raju-demo.fly.dev/app",
    githubUrl: "https://github.com/Lochan-Vishwanath/RAGmark",
    techStack: [
      "Python",
      "FastAPI",
      "Qdrant",
      "WhisperX",
      "Gemini",
    ],
    metrics: [
      { label: "Retrieval", value: "Hybrid (Dense + Sparse + RRF)" },
      { label: "Reranker", value: "Cross-encoder" },
      { label: "Ingestion pipeline", value: "10-phase" },
    ],
    interestingDecisions: [
      "Built a 10 phase ingestion pipeline from scratch (no LangChain) including GPU accelerated WhisperX transcription, PyAnnote diarization, AI enrichment, and chunking.",
      "Retrieval combines hybrid dense and sparse search with Reciprocal Rank Fusion, cross encoder reranking, recency boost, and CRAG cross namespace fallback.",
      "Insight clustering with running centroids feeds back into retrieval as a frequency boost.",
    ],
    previewType: "mockup",
    previewSrc: "/projects/ragmark.png",
    screenshots: [
      "/projects/ragmark.png"
    ],
  },
  {
    slug: "qa-playwright-plugin",
    name: "QA Playwright Plugin",
    tagline: "AI-powered Playwright QA testing from natural language instructions via MCP.",
    liveUrl: null,
    githubUrl: "https://github.com/Lochan-Vishwanath/qa-playwright-plugin",
    techStack: [
      "Bun",
      "TypeScript",
      "Gemini",
      "Playwright",
      "Model Context Protocol"
    ],
    metrics: [
      { label: "Agent Architecture", value: "Dual Runner/Refactor" },
      { label: "AI Integration", value: "Gemini 2.5 Flash" },
      { label: "Protocol", value: "MCP strategy pattern" }
    ],
    interestingDecisions: [
      "Dual-agent architecture with Runner Agent (browser execution) and Refactor Agent (POM integration).",
      "Used MCP as an abstraction layer for browser automation and filesystem access.",
      "Recursive schema sanitization for Gemini compatibility with MCP JSON schemas.",
      "Orthogonal pass/fail axes and robust error handling to preserve generated scripts even on failures."
    ],
    previewType: "screenshots",
    previewSrc: "",
    screenshots: []
  },
];