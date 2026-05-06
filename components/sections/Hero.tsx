"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import Image from "next/image";
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
  return (
    <span className={className} aria-label={HERO_TEXT}>
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

const terminalContent = `$ lochan.profile
→ Senior Frontend Engineer · 6 Years Experience
$ lochan.location
→ Bengaluru, India · Open to Remote
$ lochan.focus
→ AI-Powered Interfaces · CopilotKit · RAG
$ lochan.stack
→ React · Next.js · TypeScript · Node
$ lochan.status
→ Open to Senior FE-AI Roles`;

const avatarUrl = "/avatar.jpg";

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 pb-12 md:pb-16 bg-canvas overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto px-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-xl lg:gap-xxl items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-md pt-lg min-w-0"
          >
            {/* Photo + Availability Row */}
            <div className="flex items-center gap-md">
              <div className="relative">
                <Image
                  src={avatarUrl}
                  alt={profile.name}
                  width={64}
                  height={64}
                  priority
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-hairline"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-canvas animate-pulse" />
              </div>
              <div className="inline-flex items-center gap-sm bg-surface-card border border-hairline rounded-pill px-md py-sm">
                <span className="font-sans text-sm text-ink">
                  {profile.availability.label} · {profile.availability.locations}
                </span>
              </div>
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
                Download Resume
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
                    const isStatusLine = line.toLowerCase().includes("open to");
                    const isFocusLine = line.toLowerCase().includes("ai-powered");
                    return (
                      <div
                        key={i}
                        className={`pl-lg ${isStatusLine ? "text-primary" : isFocusLine ? "text-accent-teal" : "text-on-dark-soft"}`}
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
