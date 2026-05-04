import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { skillGroups, strengths } from "@/lib/data/skills";

export function useSkillsTool() {
  useFrontendTool({
    name: "getSkills",
    description: "Get Lochan's technical skills grouped by category and his key strengths",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading skills...</span>
          </div>
        );
      }
      if (!result) return null;
      try {
        const data = JSON.parse(result);
        return (
          <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm font-medium text-ink">Skills</span>
            <div className="flex flex-wrap gap-xs">
              {data.skillGroups?.flatMap((g: any) => g.skills || []).map((s: string) => (
                <span key={s} className="font-sans text-xs text-ink bg-canvas border border-hairline rounded-pill px-sm py-xs">{s}</span>
              ))}
            </div>
          </div>
        );
      } catch {
        return <div className="font-sans text-sm text-body p-md">{result}</div>;
      }
    },
    handler: async () => {
      return JSON.stringify({ skillGroups, strengths });
    },
  });
}
