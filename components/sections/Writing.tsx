"use client";

import { writing } from "@/lib/data/writing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export function Writing() {
  return (
    <section
      id="writing"
      className="bg-canvas py-section"
    >
      <div className="max-w-5xl mx-auto px-lg">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-tight mb-xl">
            Writing
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="grid gap-lg grid-cols-1 md:grid-cols-2">
          {writing.map((entry) => (
            <StaggerItem key={entry.title}>
              <Card variant="surface" className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight mb-sm">{entry.title}</h3>
                <p className="font-sans text-xs font-medium tracking-widest uppercase text-muted mb-md">
                  {entry.estimatedDate} · 5 min read
                </p>
                <p className="font-sans text-base text-body leading-relaxed mb-md">{entry.teaser}</p>
                <Badge variant="coral">Coming soon</Badge>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}