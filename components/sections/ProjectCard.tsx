"use client";

import { useSyncExternalStore } from "react";
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
      {/* Static placeholder - iframe removed to prevent autofocus scroll steal */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-surface-dark-soft">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-md rounded-full bg-surface-dark-elevated flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <p className="font-sans text-sm text-on-dark-soft mb-sm">Live site preview</p>
        </div>
      </div>

      {/* Clickable overlay */}
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-surface-dark/40 hover:bg-surface-dark/20 transition-colors group"
        aria-label="Open live site in new tab"
      >
        <span className="bg-canvas/95 text-ink font-sans text-sm font-medium px-lg py-md rounded-pill border border-hairline group-hover:bg-canvas group-hover:shadow-lg transition-all flex items-center gap-sm">
          Open live site
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </a>

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
  const prefersReducedMotion = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
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
          {liveUrl ? (
            <div className="flex flex-col gap-sm pt-sm w-full">
              <Button variant="tertiary" href={liveUrl} className="group w-full flex justify-between items-center px-3">
                Live Site
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
              <div className="grid grid-cols-2 gap-sm w-full">
                <Button variant="primary" onClick={() => onViewDetails(project.slug)} className="w-full">
                  View Details
                </Button>
                <Button variant="secondary" href={githubUrl} className="w-full">
                  GitHub
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-sm pt-sm w-full">
              <Button variant="primary" onClick={() => onViewDetails(project.slug)} className="w-full">
                View Details
              </Button>
              <Button variant="secondary" href={githubUrl} className="w-full">
                GitHub
              </Button>
            </div>
          )}
        </div>
      </ChatBubble>
    </article>
  );
}
