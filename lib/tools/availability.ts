import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

export function useAvailabilityTool() {
  useFrontendTool({
    name: "getAvailability",
    description:
      "Get Lochan's current availability status and preferred work locations",
    parameters: z.object({}),
    handler: async () => {
      return JSON.stringify({
        label: profile.availability.label,
        locations: profile.availability.locations,
      });
    },
  });
}

export function useBookCallTool() {
  useFrontendTool({
    name: "bookCall",
    description:
      "Book a call with Lochan. Returns scheduling information if available.",
    parameters: z.object({}),
    handler: async () => {
      if (profile.availability.status === "open") {
        return `Lochan is open to calls. Reach out via email at ${profile.email} to schedule a time.`;
      }
      return "Lochan is not available for calls right now.";
    },
  });
}
