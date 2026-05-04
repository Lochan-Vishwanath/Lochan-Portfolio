"use client";

import { useState, useEffect, useCallback } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import {
  useResumeTool,
  useProjectsTool,
  useExperienceTool,
  useSkillsTool,
  useContactTool,
  useWritingTool,
  useAvailabilityTool,
  useBookCallTool,
} from "@/lib/tools";

/* ─── Main ChatPopup ─── */
export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [openKey, setOpenKey] = useState(0);

  // Register all 8 CopilotKit frontend tools
  useResumeTool();
  useProjectsTool();
  useExperienceTool();
  useSkillsTool();
  useContactTool();
  useWritingTool();
  useAvailabilityTool();
  useBookCallTool();

  // Listen for open-chat-panel events (from Contact section "Open chat" button)
  useEffect(() => {
    const handler = () => {
      // Bump key to force CopilotPopup to remount with defaultOpen=true
      setOpenKey((k) => k + 1);
      setIsOpen(true);
    };
    window.addEventListener("open-chat-panel", handler);
    return () => window.removeEventListener("open-chat-panel", handler);
  }, []);

  // Dispatch event when chat opens so callout can hide
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("chat-opened"));
    }
  }, [isOpen]);

  const handleSetOpen = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <CopilotPopup
      key={openKey}
      defaultOpen={isOpen}
      onSetOpen={handleSetOpen}
      clickOutsideToClose
      labels={{
        title: "Ask Lochan",
        initial:
          "Hi! I'm Lochan's portfolio assistant. Ask me about his work, experience, or skills — I can share his resume, walk through a project, or tell you about his background.",
        placeholder: "Ask about Lochan…",
      }}
    />
  );
}
