import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

export function useContactTool() {
  useFrontendTool({
    name: "getContact",
    description: "Get Lochan's contact information (email, LinkedIn, GitHub)",
    parameters: z.object({}),
    handler: async () => {
      return JSON.stringify({
        email: profile.email,
        linkedin: profile.linkedin,
        github: profile.github,
      });
    },
  });
}
