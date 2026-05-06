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
    "Frontend heavy full stack AI engineer. 6+ years building SaaS platforms, enterprise dashboards, and AI-powered product features (agent orchestration, tool calling, RAG).",
  location: "Bangalore, India",
  email: "lochan.vish@hotmail.com",
  phone: "+91 8310336397",
  github: "https://github.com/Lochan-Vishwanath",
  linkedin: "https://linkedin.com/in/lochanv",
  resumeUrl: "https://drive.google.com/file/d/1qA0vOgliFWUxdJGAU7ReDGpklO90EEZC/view?usp=sharing",
  avatarUrl: "/avatar.jpg",
  availability: {
    status: "open",
    label: "Open to Senior Frontend / AI roles",
    locations: "Bangalore / Remote",
  },
  now: "Currently: Senior Frontend Engineer at CloudBees, scaling Unify AI.",
};