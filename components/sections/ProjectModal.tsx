"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeWindow } from "@/components/ui/CodeWindow";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const containerRef = useFocusTrap(isOpen);

  /* ---- Esc key handler ---- */
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleEsc]);

  /* ---- Lock body scroll ---- */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* ---- Don't render if closed or no project ---- */
  if (!isOpen || !project) return null;

  const { name, tagline, techStack, metrics, interestingDecisions, previewType, previewSrc, githubUrl, liveUrl } =
    project;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-lg bg-ink/40"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* 
        Animated wrapper using grid-template-rows (0fr → 1fr)
        instead of interpolate-size, per task requirements.
      */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="grid w-full max-w-[880px] transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden">
          <div className="max-h-[90vh] overflow-y-auto rounded-xl bg-canvas shadow-2xl">
            {/* Header: close button */}
            <div className="sticky top-0 z-10 flex items-center justify-end bg-canvas p-lg rounded-t-xl">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center w-xl h-xl rounded-lg font-mono text-muted hover:bg-surface-card hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-xl pb-xl flex flex-col gap-xl">
              {/* Title + Tagline */}
              <header>
                <h2
                  id="modal-title"
                  className="font-display text-xxl text-ink"
                >
                  {name}
                </h2>
                <p className="font-sans text-lg text-body mt-sm">{tagline}</p>
              </header>

              {/* Full tech stack */}
              <section aria-labelledby="modal-tech-heading">
                <h3
                  id="modal-tech-heading"
                  className="font-display text-lg text-ink mb-md"
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-xs">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="cream">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Metrics */}
              {metrics.length > 0 && (
                <section aria-labelledby="modal-metrics-heading">
                  <h3
                    id="modal-metrics-heading"
                    className="font-display text-lg text-ink mb-md"
                  >
                    Metrics
                  </h3>
                  <div className="grid grid-cols-3 gap-sm">
                    {metrics.map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-surface-card rounded-lg p-md text-center"
                      >
                        <p className="font-display text-lg text-primary">
                          {value}
                        </p>
                        <p className="font-sans text-xs text-muted mt-xs">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interesting decisions */}
              {interestingDecisions.length > 0 && (
                <section aria-labelledby="modal-decisions-heading">
                  <h3
                    id="modal-decisions-heading"
                    className="font-display text-lg text-ink mb-md"
                  >
                    Interesting Decisions
                  </h3>
                  <ul className="flex flex-col gap-md list-disc list-inside">
                    {interestingDecisions.map((decision, i) => (
                      <li
                        key={i}
                        className="font-sans text-body leading-relaxed"
                      >
                        {decision}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Preview */}
              {(previewType === "mockup" || previewType === "gif") && (
                <section aria-labelledby="modal-preview-heading">
                  <h3
                    id="modal-preview-heading"
                    className="font-display text-lg text-ink mb-md"
                  >
                    Preview
                  </h3>
                  {previewType === "mockup" ? (
                    <CodeWindow>
                      <Image
                        src={previewSrc}
                        alt={`${name} mockup`}
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded"
                      />
                    </CodeWindow>
                  ) : (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-dark">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewSrc}
                        alt={`${name} demo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                </section>
              )}

              {/* Links */}
              <footer className="flex items-center gap-md pt-sm border-t border-hairline">
                {githubUrl && (
                  <Button variant="secondary" href={githubUrl}>
                    GitHub
                  </Button>
                )}
                {liveUrl && (
                  <Button variant="primary" href={liveUrl}>
                    Live Site
                  </Button>
                )}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
