import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

function ContactRenderer({ result }: { result?: string }) {
  let data = { email: profile.email, linkedin: profile.linkedin, github: profile.github };
  if (result) {
    try { data = JSON.parse(result); } catch {}
  }

  return (
    <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
      <span className="font-sans text-sm font-medium text-ink">Contact Lochan</span>
      <div className="flex flex-wrap gap-sm">
        <a href={`mailto:${data.email}`}
          className="inline-flex items-center gap-xs rounded-pill bg-primary text-on-primary px-md py-xs font-sans text-xs font-medium hover:bg-primary-active transition-colors">
          ✉️ Email
        </a>
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-xs rounded-pill border border-hairline bg-canvas text-ink px-md py-xs font-sans text-xs font-medium hover:bg-surface-card transition-colors">
          💼 LinkedIn
        </a>
        <a href={data.github} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-xs rounded-pill border border-hairline bg-canvas text-ink px-md py-xs font-sans text-xs font-medium hover:bg-surface-card transition-colors">
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}

export function useContactTool() {
  useFrontendTool({
    name: "getContact",
    description: "Get Lochan's contact information (email, LinkedIn, GitHub)",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading contact info...</span>
          </div>
        );
      }
      return <ContactRenderer result={result} />;
    },
    handler: async () => {
      return JSON.stringify({
        email: profile.email,
        linkedin: profile.linkedin,
        github: profile.github,
      });
    },
  });
}
