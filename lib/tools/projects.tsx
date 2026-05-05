import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { projects } from "@/lib/data/projects";

function ProjectCard({ name, tagline, liveUrl, techStack }: { name: string; tagline: string; liveUrl?: string; techStack: string[] }) {
  return (
    <div className="flex flex-col gap-xs p-sm bg-canvas border border-hairline rounded-lg">
      <span className="font-sans text-sm font-medium text-ink">{name}</span>
      <span className="font-sans text-xs text-body">{tagline}</span>
      <div className="flex flex-wrap gap-xs">
        {techStack.slice(0, 4).map((t) => (
          <span key={t} className="font-sans text-[10px] text-muted bg-surface-card px-xs py-[2px] rounded-sm">{t}</span>
        ))}
      </div>
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
          className="font-sans text-xs text-primary hover:underline mt-xs">Open →</a>
      )}
    </div>
  );
}

export function useProjectsTool() {
  useFrontendTool({
    name: "getProjectDetails",
    description: "Get details about Lochan's projects. Returns all projects if no slug is provided, or a specific project if a slug is given.",
    parameters: z.object({
      slug: z.string().optional().describe("The slug of the project to retrieve. Optional."),
    }),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading projects...</span>
          </div>
        );
      }
      if (!result) return null;
      try {
        const data = JSON.parse(result);
        const items = Array.isArray(data) ? data : [data];
        return (
          <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm font-medium text-ink">Projects</span>
            <div className="grid grid-cols-1 gap-sm">
              {items.map((p: { name: string; tagline: string; liveUrl?: string; techStack?: string[] }) => (
                <ProjectCard key={p.name} name={p.name} tagline={p.tagline} liveUrl={p.liveUrl} techStack={p.techStack || []} />
              ))}
            </div>
          </div>
        );
      } catch {
        return <div className="font-sans text-sm text-body p-md">{result}</div>;
      }
    },
    handler: async ({ slug }) => {
      if (slug) {
        const project = projects.find((p) => p.slug === slug);
        if (!project) return `Project with slug "${slug}" not found.`;
        return JSON.stringify(project);
      }
      return JSON.stringify(projects);
    },
  });
}
