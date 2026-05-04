import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { writing } from "@/lib/data/writing";

export function useWritingTool() {
  useFrontendTool({
    name: "getWriting",
    description: "Get Lochan's writing entries and blog post teasers",
    parameters: z.object({}),
    handler: async () => {
      return JSON.stringify(writing);
    },
  });
}
