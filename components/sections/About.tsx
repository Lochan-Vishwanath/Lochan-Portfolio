"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export function About() {
  return (
    <section
      id="about"
      className="py-section bg-canvas"
      aria-labelledby="about-heading"
    >
      <div className="max-w-4xl mx-auto px-lg">
        <FadeIn>
          <h2
            id="about-heading"
            className="font-display text-4xl md:text-5xl text-ink tracking-tight mb-xl"
          >
            About
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <FadeIn delay={0.1}>
            <p className="font-sans text-lg md:text-xl text-ink leading-relaxed">
              I&apos;m a Senior Frontend Engineer with six years of experience, currently focused on shipping production AI features — particularly around CopilotKit-powered assistants, RAG workflows, and agent-based UX patterns.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-sans text-lg md:text-xl text-ink leading-relaxed">
              I care deeply about frontend system design at scale: the architecture decisions, the test infrastructure, the performance characteristics that determine whether a product feels solid or brittle as it grows.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="md:col-span-2">
            <div className="border-l-4 border-primary pl-lg py-sm">
              <p className="font-sans text-lg md:text-xl text-body leading-relaxed italic">
                I&apos;m drawn to roles where frontend thinking intersects with AI — specifically building the interfaces, interaction models, and data pipelines that make AI features feel <span className="text-primary font-medium">inevitable</span> rather than bolted on.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}