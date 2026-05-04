import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { projects } from "@/lib/data/projects";

export function useProjectsTool() {
  useFrontendTool({
    name: "getProjectDetails",
    description:
      "Get details about Lochan's projects. Returns all projects if no slug is provided, or a specific project if a slug is given.",
    parameters: z.object({
      slug: z
        .string()
        .optional()
        .describe("The slug of the project to retrieve. Optional."),
    }),
    handler: async ({ slug }) => {
      if (slug) {
        const project = projects.find((p) => p.slug === slug);
        if (!project) {
          return `Project with slug "${slug}" not found.`;
        }
        return JSON.stringify(project);
      }
      return JSON.stringify(projects);
    },
  });
}
