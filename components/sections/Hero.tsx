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
                ? { opacity: 0, y: 12, color: "#141413" }
                : { opacity: 0, y: 12 }
            }
            animate={
              isLastWord
                ? { opacity: 1, y: 0, color: "#cc785c" }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
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
      className="pt-24 pb-section bg-canvas overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto px-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-xl lg:gap-xxl items-start min-h-[50vh]">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-lg pt-lg min-w-0"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-sm bg-surface-card border border-hairline rounded-pill px-md py-sm w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-sans text-sm text-ink">
                {profile.availability.label} · {profile.availability.locations}
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-ink leading-[1.1]"
            >
              <WordFadeIn text={HERO_TEXT} />
            </h1>

            {/* Tagline */}
            <p className="font-sans text-lg md:text-xl text-body leading-relaxed">
              {profile.tagline}
            </p>

            {/* Button Row */}
            <div className="flex flex-wrap gap-md pt-sm">
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
          </motion.div>

          {/* Right Column: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
