"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";

const HERO_TEXT = "Frontend engineer who ships AI.";
const WORDS = HERO_TEXT.split(" ");

function WordFadeIn({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    if (text === "AI." || text === "AI") {
      return <span className={`text-primary ${className}`}>{text}</span>;
    }
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={HERO_TEXT}>
      {WORDS.map((word, i) => {
        const isLastWord = i === WORDS.length - 1;
        const isAI = word === "AI.";

        return (
          <motion.span
            key={i}
            className={`inline-block mr-[0.25em] ${isAI ? "text-primary" : ""}`}
            initial={
              isLastWord
                ? { opacity: 0, y: 8, color: "#141413" }
                : { opacity: 0, y: 8 }
            }
            animate={
              isLastWord
                ? { opacity: 1, y: 0, color: "#cc785c" }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.3,
              delay: 0.04 + i * 0.06,
              ease: "easeOut",
            }}
            aria-hidden
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

const terminalContent = `$ whoami
→ lochan vishwanath · senior frontend engineer
$ pwd
→ /bengaluru/building-with-ai
$ cat current-stack.txt
→ react · next.js · typescript
→ copilotkit · langchain · rag
→ node · postgres · gemini
$ uptime
→ 6 years shipping production frontend`;

export function Hero() {
  return (
    <section
      id="hero"
      className="py-section bg-canvas overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto px-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xxl items-center min-h-[60vh]">
          {/* Left Column */}
          <div className="flex flex-col gap-lg">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-sm bg-surface-card border border-hairline rounded-pill px-md py-sm w-fit">
              <div className="w-xs h-xs rounded-full bg-green-500" />
              <span className="font-sans text-sm text-ink">
                {profile.availability.label} · {profile.availability.locations}
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-display text-5xl lg:text-6xl tracking-tighter text-ink leading-tight"
            >
              <WordFadeIn text={HERO_TEXT} />
            </h1>

            {/* Tagline */}
            <p className="font-sans text-lg text-body leading-relaxed max-w-xl">
              {profile.tagline}
            </p>

            {/* Button Row */}
            <div className="flex flex-wrap gap-md">
              <Button
                variant="primary"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View projects
              </Button>
              <Button
                variant="secondary"
                href={profile.resumeUrl}
                download
              >
                Download resume
              </Button>
            </div>
          </div>

          {/* Right Column: Terminal */}
          <div className="hidden lg:block">
            <CodeWindow>
              <pre className="font-mono text-sm text-on-dark whitespace-pre-wrap">
                {terminalContent.split("\n").map((line, i) => {
                  if (line.startsWith("$")) {
                    return (
                      <div key={i} className="text-on-dark">
                        <span className="text-muted">{line.split(" ")[0]}</span>
                        <span className="text-on-dark">
                          {line.slice(line.indexOf(" "))}
                        </span>
                      </div>
                    );
                  }
                  if (line.startsWith("→")) {
                    const isAILine =
                      line.toLowerCase().includes(" ai ") ||
                      line.toLowerCase().includes("ai ");
                    return (
                      <div
                        key={i}
                        className={`text-accent-teal pl-lg ${isAILine ? "text-primary" : ""}`}
                      >
                        {line}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="text-on-dark-soft">
                      {line}
                    </div>
                  );
                })}
              </pre>
            </CodeWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
