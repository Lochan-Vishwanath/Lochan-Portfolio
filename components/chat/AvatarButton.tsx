"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useState, useEffect } from "react";

export function AvatarButton() {
  const prefersReducedMotion = useReducedMotion();
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleClick = useCallback(() => {
    setHasInteracted(true);
    setShowTooltip(false);
    window.dispatchEvent(new CustomEvent("open-chat-panel"));
  }, []);

  return (
    <div className="fixed bottom-lg right-lg z-50 flex flex-col items-end gap-sm">
      {/* Tooltip */}
      {showTooltip && !hasInteracted && (
        <div 
          className="bg-surface-dark text-on-primary px-md py-sm rounded-lg shadow-lg max-w-[200px] text-right animate-bounce"
          style={{ animationDuration: '2s', animationIterationCount: '3' }}
        >
          <p className="font-sans text-sm font-medium">👋 Ask me anything!</p>
          <p className="font-sans text-xs text-on-dark-soft mt-xs">I know this portfolio inside out</p>
        </div>
      )}
      
      {/* Button with label */}
      <div className="flex items-center gap-sm">
        {!hasInteracted && (
          <span className="hidden md:block font-sans text-sm text-body bg-canvas border border-hairline px-md py-sm rounded-pill shadow-sm">
            Chat with my AI assistant
          </span>
        )}
        <button
          onClick={handleClick}
          aria-label="Open AI chat"
          className={[
            "flex items-center justify-center gap-sm",
            "h-14 px-md rounded-pill",
            "bg-primary text-on-primary",
            "shadow-lg hover:shadow-xl",
            "hover:bg-primary-active hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "transition-all duration-300",
            !prefersReducedMotion && "animate-glow-pulse",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-sans text-sm font-medium pr-sm">Ask AI</span>
        </button>
      </div>
    </div>
  );
}
