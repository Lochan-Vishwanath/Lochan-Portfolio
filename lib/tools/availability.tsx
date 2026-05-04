import { useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { profile } from "@/lib/data/profile";

export function useAvailabilityTool() {
  useFrontendTool({
    name: "getAvailability",
    description: "Get Lochan's current availability status and preferred work locations",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Checking availability...</span>
          </div>
        );
      }
      if (!result) return null;
      try {
        const data = JSON.parse(result);
        const isOpen = data.label?.toLowerCase().includes("open");
        return (
          <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <div className="flex items-center gap-sm">
              <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-muted"}`} />
              <span className="font-sans text-sm font-medium text-ink">Availability</span>
            </div>
            <span className="font-sans text-sm text-body">{data.label}</span>
            <span className="font-sans text-xs text-muted">{data.locations}</span>
          </div>
        );
      } catch {
        return <div className="font-sans text-sm text-body p-md">{result}</div>;
      }
    },
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
    description: "Book a call with Lochan. Returns scheduling information if available.",
    parameters: z.object({}),
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") {
        return (
          <div className="flex items-center gap-sm p-md bg-surface-card border border-hairline rounded-xl">
            <span className="font-sans text-sm text-muted">Loading...</span>
          </div>
        );
      }
      const isOpen = profile.availability.status === "open";
      return (
        <div className="flex flex-col gap-sm p-md bg-surface-card border border-hairline rounded-xl">
          <span className="font-sans text-sm font-medium text-ink">Schedule a Call</span>
          {isOpen ? (
            <>
              <span className="font-sans text-sm text-body">Lochan is open to calls. Reach out to schedule a time.</span>
              <a href={`mailto:${profile.email}?subject=Scheduling a call`}
                className="inline-flex items-center justify-center rounded-pill bg-primary text-on-primary px-lg py-sm font-sans text-sm font-medium hover:bg-primary-active transition-colors">
                📅 Send Email →
              </a>
            </>
          ) : (
            <span className="font-sans text-sm text-body">Lochan is not available for calls right now.</span>
          )}
        </div>
      );
    },
    handler: async () => {
      if (profile.availability.status === "open") {
        return `Lochan is open to calls. Reach out via email at ${profile.email} to schedule a time.`;
      }
      return "Lochan is not available for calls right now.";
    },
  });
}
