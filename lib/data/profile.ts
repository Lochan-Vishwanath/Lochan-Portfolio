export interface Profile {
  name: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  avatarUrl: string;
  availability: {
    status: "open" | "closed";
    label: string;
    locations: string;
  };
  now: string;
}

export const profile: Profile = {
  name: "Lochan Vishwanath",
  tagline:
    "Frontend-heavy full-stack engineer. 6 YoE shipping SaaS, integrations, and AI-assisted product workflows.",
  location: "Bengaluru, India",
  email: "lochan.vish@hotmail.com",
  phone: "+91 8310336397",
  github: "https://github.com/placeholder",
  linkedin: "https://linkedin.com/in/lochanv",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpg",
  availability: {
    status: "open",
    label: "Open to senior FE-AI roles",
    locations: "Bengaluru / Remote",
  },
  now: "Currently: shipping a public RAG demo. Last updated April 2026.",
};