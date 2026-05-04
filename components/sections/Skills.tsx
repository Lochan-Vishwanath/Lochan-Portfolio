"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { skillGroups, strengths } from "@/lib/data/skills";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ReactNode } from "react";

function TypewriterText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text);
      return;
    }

    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayed(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 15);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, reduceMotion]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">▊</span>
      )}
    </span>
  );
}

function TerminalLine({
  command,
  content,
  isAI = false,
  delay = 0,
}: {
  command: string;
  content: ReactNode;
  isAI?: boolean;
  delay?: number;
}) {
  const [showContent, setShowContent] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setShowContent(true);
      return;
    }
    const timeout = setTimeout(() => setShowContent(true), delay + command.length * 15 + 200);
    return () => clearTimeout(timeout);
  }, [delay, command, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className="flex flex-col gap-xs"
    >
      <div className="flex items-center gap-sm">
        <span className="text-muted">$</span>
        <TypewriterText text={command} delay={delay} className="text-on-dark" />
      </div>
      {showContent && (
        <div className={`text-accent-teal pl-lg ${isAI ? "text-primary" : ""}`}>
          <span className="text-accent-teal">→</span> {content}
        </div>
      )}
    </motion.div>
  );
}

export function Skills() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section
      id="skills"
      className="py-section bg-surface-dark"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-3xl mx-auto px-lg">
        <FadeIn>
          <h2
            id="skills-heading"
            className="font-display text-4xl md:text-5xl text-on-dark tracking-tight mb-xl"
          >
            Skills
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div
            onViewportEnter={() => setIsInView(true)}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CodeWindow>
              <div className="flex flex-col gap-md">
                {skillGroups.map((group, i) => (
                  <TerminalLine
                    key={group.command}
                    command={group.command}
                    content={
                      <span>
                        {group.skills.slice(0, -1).join(" · ")}
                        {group.skills.length > 1 && (
                          <> · <span className="text-on-dark-soft italic text-xs">{group.skills[group.skills.length - 1]}</span></>
                        )}
                      </span>
                    }
                    isAI={group.label === "ai"}
                    delay={isInView ? i * 800 : 0}
                  />
                ))}

                <TerminalLine
                  command="lochan --strengths"
                  content={strengths.join(", ")}
                  delay={isInView ? skillGroups.length * 800 : 0}
                />
              </div>
            </CodeWindow>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="font-sans text-xs text-on-dark-soft mt-lg text-center uppercase tracking-widest">
            Honest about levels — fluent, comfortable, and learning are clearly marked.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}