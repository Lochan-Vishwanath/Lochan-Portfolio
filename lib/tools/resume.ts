import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

export function useResumeTool() {
  useFrontendTool({
    name: "getResumeUrl",
    description: "Get the URL to Lochan's resume PDF",
    parameters: z.object({}),
    handler: async () => {
      return profile.resumeUrl;
    },
  });
}
