import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { experience } from "@/lib/data/experience";

export function useExperienceTool() {
  useFrontendTool({
    name: "getExperience",
    description: "Get Lochan's work experience history",
    parameters: z.object({}),
    handler: async () => {
      return JSON.stringify(experience);
    },
  });
}
