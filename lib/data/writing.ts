export interface WritingEntry {
  title: string;
  teaser: string;
  status: "coming-soon" | "published";
  estimatedDate?: string;
}

export const writing: WritingEntry[] = [
  {
    title: "Five Gemini models, one fallback chain",
    teaser:
      "What I learned building ClipGuessr's content pipeline across flash-lite, flash, and pro tiers.",
    status: "coming-soon",
    estimatedDate: "May 2026",
  },
  {
    title: "Why I built RAGmark without LangChain",
    teaser:
      "On choosing primitives over abstractions when retrieval precision matters.",
    status: "coming-soon",
    estimatedDate: "May 2026",
  },
];