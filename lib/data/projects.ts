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
      "A daily movie guessing game with a 5-model Gemini fallback pipeline.",
    liveUrl: "https://clipguessr.app",
    githubUrl: "https://github.com/placeholder/clipguessr",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Gemini AI",
      "Playwright",
      "TMDB",
    ],
    metrics: [
      { label: "Daily clips analyzed", value: "100+" },
      { label: "Model fallback chain", value: "5 Gemini models" },
      { label: "Pipeline cost", value: "~₹200/month" },
    ],
    interestingDecisions: [
      "Multi-model fallback chain with retry logic that classifies errors (rate limit vs model unavailable vs network) and routes accordingly.",
      "YouTube quota → Playwright fallback for video search when API quota exhausts.",
      "Theme engine that curates daily clips around monthly themes, weekly sub-themes, and celebrity birthdays.",
    ],
    previewType: "iframe",
    previewSrc: "https://clipguessr.app",
    screenshots: [
      "/projects/clipguessr-1.png",
      "/projects/clipguessr-2.png",
      "/projects/clipguessr-3.png",
    ],
  },
  {
    slug: "rag-raju",
    name: "RAG-Raju",
    tagline:
      "A personal knowledge base that turns YouTube videos into a queryable second brain.",
    liveUrl: null,
    githubUrl: "https://github.com/placeholder/rag-raju",
    techStack: [
      "FastAPI",
      "Qdrant",
      "WhisperX",
      "BGE Embeddings",
      "Gemini Flash",
      "Cross-encoder rerank",
      "SQLite",
      "React",
    ],
    metrics: [
      { label: "Retrieval mode", value: "Hybrid (Dense + BM25 + RRF)" },
      { label: "Reranker", value: "ms-marco MiniLM" },
      { label: "Architecture", value: "10-phase pipeline" },
    ],
    interestingDecisions: [
      "Hybrid search with Reciprocal Rank Fusion, then cross-encoder rerank, then CRAG cross-namespace fallback when min-score threshold isn't hit.",
      "Insight clustering: BGE embeddings, 0.70 cosine threshold, running centroid update, with cluster frequency boosting retrieval scores.",
      "Built without LangChain — needed precise control over RRF, recency boost, and reranker weights.",
    ],
    previewType: "mockup",
    previewSrc: "/projects/ragraju-mockup.png",
    screenshots: [],
  },
  {
    slug: "qa-playwright",
    name: "QA Playwright Plugin",
    tagline: "An MCP-based agent that turns natural language into Playwright tests.",
    liveUrl: null,
    githubUrl: "https://github.com/placeholder/qa-playwright-plugin",
    techStack: [
      "TypeScript",
      "Bun",
      "Gemini",
      "MCP SDK",
      "Playwright",
    ],
    metrics: [
      { label: "Agent loop", value: "Up to 50 iterations" },
      { label: "MCP servers", value: "Playwright + Filesystem" },
      { label: "Smart refactor", value: "Auto-integrates into POM repos" },
    ],
    interestingDecisions: [
      "Two-agent architecture: a runner agent for browser automation, a refactor agent for integrating generated tests into existing Page Object Model repos.",
      "Locator strategy hierarchy (role → label → text → testid → CSS) baked into the agent's persona.",
      "Stdio-transport MCP client lets the same architecture swap browser drivers without changing the agent.",
    ],
    previewType: "screenshots",
    previewSrc: "/projects/qaplaywright-terminal.png",
    screenshots: [],
  },
];