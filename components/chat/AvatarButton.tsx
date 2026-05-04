"use client";

import { useReducedMotion } from "motion/react";
import { useCallback } from "react";

export function AvatarButton() {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat-panel"));
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Open AI chat"
      className={[
        "fixed bottom-lg right-lg z-50",
        "flex items-center justify-center",
        "size-14 rounded-pill",
        "bg-primary text-on-primary",
        "shadow-lg",
        "hover:bg-primary-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "transition-colors",
        !prefersReducedMotion && "animate-glow-pulse",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="font-sans text-sm font-medium">AI</span>
    </button>
  );
}
