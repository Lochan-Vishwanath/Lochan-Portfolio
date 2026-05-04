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

/* ─── Tool-call pill ─── */
function ToolCallPill({
  name,
  status,
}: {
  name?: string;
  status?: string;
}) {
  const isRunning = status === "executing";
  const isComplete = status === "complete";

  return (
    <div
      className={`inline-flex items-center gap-xs px-md py-xs rounded-pill font-mono text-xs border mb-sm transition-all ${
        isRunning ? "border-primary text-primary shadow-[0_0_8px_rgba(204,120,92,0.35)]" : ""
      } ${isComplete ? "border-accent-teal text-accent-teal" : ""} ${
        !isRunning && !isComplete ? "border-hairline text-muted" : ""
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isRunning
            ? "bg-primary animate-pulse"
            : isComplete
            ? "bg-accent-teal"
            : "bg-muted"
        }`}
        aria-hidden
      />
      <span className="truncate max-w-[180px]">{name || "Tool"}</span>
      {isRunning && (
        <span className="font-mono text-[10px] text-primary animate-pulse ml-auto">
          running…
        </span>
      )}
    </div>
  );
}

/* ─── Custom messages container ─── */
function CustomMessages({ children, ..._rest }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-md p-lg min-h-0 flex-1 overflow-y-auto">
      {children}
    </div>
  );
}

/* ─── Custom user message ─── */
function CustomUserMessage({
  message,
}: {
  message?: any;
}) {
  // CopilotKit passes message as a complex object — extract text content
  const text =
    typeof message === "string"
      ? message
      : typeof message?.content === "string"
      ? message.content
      : message?.content?.[0]?.text ||
        message?.displayContent ||
        "";

  return (
    <div className="flex justify-end w-full mb-sm">
      <div className="bg-primary text-on-primary rounded-lg rounded-br-sm px-lg py-md max-w-[75%] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
        {String(text)}
      </div>
    </div>
  );
}

/* ─── Custom assistant message ─── */
function CustomAssistantMessage({
  message,
}: {
  message?: any;
}) {
  // CopilotKit passes message as a complex object — extract text content
  const text =
    typeof message === "string"
      ? message
      : typeof message?.content === "string"
      ? message.content
      : message?.content?.[0]?.text ||
        message?.displayContent ||
        "";

  return (
    <div className="flex justify-start w-full mb-sm">
      <div className="bg-surface-card text-ink border border-hairline rounded-lg rounded-bl-sm px-xl py-lg max-w-[85%] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
        {String(text)}
      </div>
    </div>
  );
}

/* ─── Custom action execution message (tool-fire pill) ─── */
function CustomRenderActionExecutionMessage({
  name,
  status,
  ..._rest
}: {
  name?: string;
  status?: string;
  [key: string]: unknown;
}) {
  return <ToolCallPill name={name} status={status} />;
}

/* ─── Error Fallback ─── */
function ChatErrorFallback({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-canvas border border-hairline rounded-xl p-lg max-w-sm mx-lg shadow-xl">
        <h3 className="font-display text-xl text-ink mb-sm">Chat temporarily unavailable</h3>
        <p className="font-sans text-sm text-body mb-md">
          The AI assistant is offline. You can still reach out via email or LinkedIn.
        </p>
        <div className="flex gap-md">
          <button
            onClick={onClose}
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

/* ─── Main ChatPopup ─── */
export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [popupKey, setPopupKey] = useState(0);

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
    setPopupKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handler = () => handleOpenChat();
    window.addEventListener("open-chat-panel", handler);
    return () => window.removeEventListener("open-chat-panel", handler);
  }, [handleOpenChat]);

  const handleSetOpen = useCallback((open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setHasError(false);
    }
  }, []);

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
    return <ChatErrorFallback onClose={() => setHasError(false)} />;
  }

  return (
    <>
      {/* Coral pulse keyframes */}
      <style>{`
        @keyframes coral-card-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204, 120, 92, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(204, 120, 92, 0); }
        }
      `}</style>

      {isOpen && (
        <div onError={() => setHasError(true)}>
          <CopilotPopup
            key={popupKey}
            defaultOpen
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
            RenderActionExecutionMessage={
              CustomRenderActionExecutionMessage as any
            }
            className="[--copilot-kit-primary-color:#cc785c] [--copilot-kit-background-color:#181715] [--copilot-kit-separator-color:#e6dfd8] [--copilot-kit-secondary-color:#1f1e1b] [--copilot-kit-secondary-contrast-color:#ffffff] [--copilot-kit-contrast-color:#ffffff]"
          />
        </div>
      )}
    </>
  );
}
