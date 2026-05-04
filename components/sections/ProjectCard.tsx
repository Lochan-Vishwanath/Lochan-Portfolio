"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeWindow } from "@/components/ui/CodeWindow";

const MAX_VISIBLE_TECH = 6;

interface ProjectCardProps {
  project: Project;
  onViewDetails: (slug: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Preview sub-components                                             */
/* ------------------------------------------------------------------ */

function IframePreview({ src }: { src: string }) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-dark">
      <iframe
        src={src}
        title="Live preview"
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full"
        loading="lazy"
      />
      <span className="absolute top-sm right-sm bg-accent-teal text-surface-dark font-mono text-xs px-sm py-xs rounded-md font-medium">
        Live
      </span>
    </div>
  );
}

function MockupPreview({ src }: { src: string }) {
  return (
    <CodeWindow>
      <Image
        src={src}
        alt="Project mockup"
        width={800}
        height={450}
        className="w-full h-auto rounded"
        loading="lazy"
      />
    </CodeWindow>
  );
}

function GifPreview({ src }: { src: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="aspect-video rounded-lg bg-surface-dark flex items-center justify-center">
        <p className="text-on-dark-soft font-mono text-sm">
          Animation available (reduced motion preferred)
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-dark">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Project demo"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProjectCard                                                        */
/* ------------------------------------------------------------------ */

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const { name, tagline, techStack, metrics, previewType, previewSrc, githubUrl, liveUrl } =
    project;
  const visibleTech = techStack.slice(0, MAX_VISIBLE_TECH);
  const remainingCount = techStack.length - MAX_VISIBLE_TECH;

  const renderPreview = () => {
    switch (previewType) {
      case "iframe":
        return <IframePreview src={previewSrc} />;
      case "mockup":
        return <MockupPreview src={previewSrc} />;
      case "gif":
        return <GifPreview src={previewSrc} />;
      default:
        return null;
    }
  };

  return (
    <article className="flex flex-col gap-md">
      {/* User message – right-aligned coral bubble */}
      <ChatBubble variant="user">Tell me about {name}.</ChatBubble>

      {/* Assistant message – left-aligned cream bubble */}
      <ChatBubble variant="assistant">
        <div className="flex flex-col gap-lg">
          {/* Name + Tagline */}
          <header>
            <h3 className="font-display text-xl text-ink">{name}</h3>
            <p className="font-sans text-body mt-xs">{tagline}</p>
          </header>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-xs">
            {visibleTech.map((tech) => (
              <Badge key={tech} variant="cream">
                {tech}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="default">+{remainingCount} more</Badge>
            )}
          </div>

          {/* Metrics row – 3 stat tiles */}
          <div className="grid grid-cols-3 gap-sm">
            {metrics.map(({ label, value }) => (
              <div
                key={label}
                className="bg-canvas rounded-lg p-md text-center"
              >
                <p className="font-display text-lg text-primary">{value}</p>
                <p className="font-sans text-xs text-muted mt-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Preview */}
          {renderPreview()}

          {/* CTA row */}
          <div className="flex items-center gap-md pt-sm">
            <Button onClick={() => onViewDetails(project.slug)}>
              View Details
            </Button>
            <Button variant="secondary" href={githubUrl}>
              GitHub
            </Button>
            {liveUrl && (
              <Button variant="secondary" href={liveUrl}>
                Live Site
              </Button>
            )}
          </div>
        </div>
      </ChatBubble>
    </article>
  );
}
