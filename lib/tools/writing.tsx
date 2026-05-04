import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { writing } from "@/lib/data/writing";

export function useWritingTool() {
  useFrontendTool({
    name: "getWriting",
    description: "Get Lochan's writing entries and blog post teasers",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading writing...</span>
          </div>
        );
      }
      if (!result) return null;
      try {
        const data = JSON.parse(result);
        return (
          <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm font-medium text-ink">Writing</span>
            <div className="flex flex-col gap-sm">
              {data.map((w: any) => (
                <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col gap-xs p-sm bg-canvas border border-hairline rounded-lg hover:bg-surface-card transition-colors">
                  <span className="font-sans text-sm font-medium text-ink">{w.title}</span>
                  <span className="font-sans text-xs text-body">{w.description}</span>
                </a>
              ))}
            </div>
          </div>
        );
      } catch {
        return <div className="font-sans text-sm text-body p-md">{result}</div>;
      }
    },
    handler: async () => {
      return JSON.stringify(writing);
    },
  });
}
