import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { experience } from "@/lib/data/experience";

export function useExperienceTool() {
  useFrontendTool({
    name: "getExperience",
    description: "Get Lochan's work experience history",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading experience...</span>
          </div>
        );
      }
      if (!result) return null;
      try {
        const data = JSON.parse(result);
        return (
          <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm font-medium text-ink">Experience</span>
            <div className="flex flex-col gap-sm">
              {data.map((exp: { company: string; period: string; role: string }) => (
                <div key={exp.company} className="flex flex-col gap-xs p-sm bg-canvas border border-hairline rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm font-medium text-ink">{exp.company}</span>
                    <span className="font-sans text-[10px] text-muted">{exp.period}</span>
                  </div>
                  <span className="font-sans text-xs text-body">{exp.role}</span>
                </div>
              ))}
            </div>
          </div>
        );
      } catch {
        return <div className="font-sans text-sm text-body p-md">{result}</div>;
      }
    },
    handler: async () => {
      return JSON.stringify(experience);
    },
  });
}
