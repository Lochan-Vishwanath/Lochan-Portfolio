"use client";

import { useEffect, useState } from "react";

export function ChatCallout() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Auto-dismiss: 12s on mobile, 2min on desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const duration = isMobile ? 12000 : 120000;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, []);

  // Dismiss when chat opens (from Contact button or Copilot toggle)
  useEffect(() => {
    const handler = () => {
      setVisible(false);
      setDismissed(true);
    };
    window.addEventListener("open-chat-panel", handler);
    window.addEventListener("chat-opened", handler);
    return () => {
      window.removeEventListener("open-chat-panel", handler);
      window.removeEventListener("chat-opened", handler);
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-20 right-6 z-[1050] transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0 animate-bob" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="relative">
        {/* Proper CSS triangle arrow pointing down */}
        <div
          className="absolute -bottom-[6px] right-6 w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "8px solid var(--color-primary)",
          }}
        />
        {/* Callout card */}
        <div className="bg-primary text-on-primary rounded-xl px-4 py-3 shadow-lg max-w-[200px] sm:max-w-[220px]">
          <button
            onClick={() => { setVisible(false); setDismissed(true); }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-on-primary/20 text-on-primary text-[10px] hover:bg-on-primary/30 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            ✕
          </button>
          <p className="font-sans text-sm font-medium leading-snug">
            ✨ This portfolio has AI
          </p>
          <p className="font-sans text-xs text-on-primary/80 mt-1 leading-snug">
            Ask me anything about Lochan&apos;s experience
          </p>
        </div>
      </div>
    </div>
  );
}
