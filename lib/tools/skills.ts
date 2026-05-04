import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { skillGroups, strengths } from "@/lib/data/skills";

export function useSkillsTool() {
  useFrontendTool({
    name: "getSkills",
    description:
      "Get Lochan's technical skills grouped by category and his key strengths",
    parameters: z.object({}),
    handler: async () => {
      return JSON.stringify({ skillGroups, strengths });
    },
  });
}
