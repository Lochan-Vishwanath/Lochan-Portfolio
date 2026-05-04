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

/* ─── Custom messages container ─── */
function CustomMessages({ children, ..._rest }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-md p-lg min-h-0 flex-1 overflow-y-auto">
      {children}
    </div>
  );
}

/* ─── Custom user message ─── */
function CustomUserMessage({ message }: { message?: any }) {
  const text =
    typeof message === "string"
      ? message
      : typeof message?.content === "string"
      ? message.content
      : message?.content?.[0]?.text || message?.displayContent || "";

  return (
    <div className="flex justify-end w-full mb-sm">
      <div className="bg-primary text-on-primary rounded-lg rounded-br-sm px-lg py-md max-w-[75%] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
        {String(text)}
      </div>
    </div>
  );
}

/* ─── Custom assistant message ─── */
function CustomAssistantMessage({ message }: { message?: any }) {
  const text =
    typeof message === "string"
      ? message
      : typeof message?.content === "string"
      ? message.content
      : message?.content?.[0]?.text || message?.displayContent || "";

  return (
    <div className="flex justify-start w-full mb-sm">
      <div className="bg-surface-card text-ink border border-hairline rounded-lg rounded-bl-sm px-xl py-lg max-w-[85%] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
        {String(text)}
      </div>
    </div>
  );
}

/* ─── Branding & notification cleanup ─── */
function useCleanupCopilotKitUI(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const hideElements = () => {
      // Hide version announcements, notifications, toasts
      document.querySelectorAll('[class*="announcement"], [class*="notification"], [class*="toast"], [role="alert"]').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      // Hide npm install / update banners
      document.querySelectorAll('[class*="banner"], [class*="upgrade"], [class*="update"]').forEach((el) => {
        const text = el.textContent || '';
        if (text.includes('npm install') || text.includes('update') || text.includes('version') || text.includes('now live')) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // Hide Help and Debug buttons
      document.querySelectorAll('button').forEach((btn) => {
        const text = btn.textContent?.trim() || '';
        if (text === 'Help' || text === 'Debug' || text === 'Debug ↓') {
          (btn as HTMLElement).style.display = 'none';
        }
      });

      // Hide "Powered by" branding
      document.querySelectorAll('div, span, footer, p').forEach((el) => {
        const text = el.textContent?.trim() || '';
        if (text.includes('Powered by CopilotKit') || (text.includes('CopilotKit') && text.includes('now live'))) {
          (el as HTMLElement).style.display = 'none';
        }
      });
    };

    hideElements();
    const interval = setInterval(hideElements, 500);
    return () => clearInterval(interval);
  }, [isOpen]);
}

/* ─── Main ChatPopup ─── */
export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Register all 8 CopilotKit frontend tools
  useResumeTool();
  useProjectsTool();
  useExperienceTool();
  useSkillsTool();
  useContactTool();
  useWritingTool();
  useAvailabilityTool();
  useBookCallTool();

  const handleOpenChat = useCallback(() => {
    setIsOpen(true);
    setHasError(false);
  }, []);

  useEffect(() => {
    const handler = () => handleOpenChat();
    window.addEventListener("open-chat-panel", handler);
    return () => window.removeEventListener("open-chat-panel", handler);
  }, [handleOpenChat]);

  const handleSetOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) setHasError(false);
  }, []);

  // Cleanup branding when chat is open
  useCleanupCopilotKitUI(isOpen);

  // Catch runtime errors from CopilotKit
  useEffect(() => {
    if (!isOpen) return;
    
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes("copilot") || event.message?.includes("Copilot")) {
        setHasError(true);
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [isOpen]);

  if (hasError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-canvas border border-hairline rounded-xl p-lg max-w-sm mx-lg shadow-xl">
          <h3 className="font-display text-xl text-ink mb-sm">Chat temporarily unavailable</h3>
          <p className="font-sans text-sm text-body mb-md">
            The AI assistant is offline. You can still reach out via email or LinkedIn.
          </p>
          <div className="flex gap-md">
            <button
              onClick={() => setHasError(false)}
              className="bg-primary text-on-primary px-md py-sm rounded-pill font-sans text-sm font-medium hover:bg-primary-active transition-colors"
            >
              Close
            </button>
            <a
              href="mailto:lochan.vish@hotmail.com"
              className="border border-hairline text-ink px-md py-sm rounded-pill font-sans text-sm font-medium hover:bg-surface-card transition-colors"
            >
              Email instead
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onError={() => setHasError(true)}>
      <CopilotPopup
        defaultOpen={isOpen}
        onSetOpen={handleSetOpen}
        clickOutsideToClose
        labels={{
          title: "Ask Lochan",
          initial:
            "Hi! I'm Lochan's portfolio assistant. Ask me about his work, experience, or skills — I can share his resume, walk through a project, or tell you about his background.",
          placeholder: "Ask about Lochan…",
        }}
        Messages={CustomMessages}
        UserMessage={CustomUserMessage}
        AssistantMessage={CustomAssistantMessage}
        className="[--copilot-kit-primary-color:#cc785c] [--copilot-kit-background-color:#faf9f5] [--copilot-kit-separator-color:#e6dfd8] [--copilot-kit-secondary-color:#efe9de] [--copilot-kit-secondary-contrast-color:#141413] [--copilot-kit-contrast-color:#141413]"
      />
    </div>
  );
}
