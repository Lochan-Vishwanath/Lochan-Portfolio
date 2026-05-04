import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

function ResumeRenderer({ result }: { result?: string }) {
  const url = result || profile.resumeUrl;
  return (
    <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
      <div className="flex items-center gap-sm">
        <span className="text-lg">📄</span>
        <span className="font-sans text-sm font-medium text-ink">Resume</span>
      </div>
      <button
        onClick={() => window.open(url, "_blank")}
        className="inline-flex items-center justify-center rounded-pill bg-primary text-on-primary px-lg py-sm font-sans text-sm font-medium hover:bg-primary-active transition-colors cursor-pointer"
      >
        Open Resume →
      </button>
    </div>
  );
}

export function useResumeTool() {
  useFrontendTool({
    name: "getResumeUrl",
    description: "Get the URL to Lochan's resume PDF",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="text-lg">📄</span>
            <span className="font-sans text-sm text-muted">Loading resume...</span>
          </div>
        );
      }
      return <ResumeRenderer result={result} />;
    },
    handler: async () => {
      return profile.resumeUrl;
    },
  });
}
