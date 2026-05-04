"use client";

import { useState } from "react";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export function Projects() {
  const [modalSlug, setModalSlug] = useState<string | null>(null);

  const selectedProject = modalSlug
    ? projects.find((p) => p.slug === modalSlug) ?? null
    : null;

  const handleViewDetails = (slug: string) => setModalSlug(slug);
  const handleClose = () => setModalSlug(null);

  return (
    <section
      id="projects"
      className="py-section bg-canvas"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto px-lg">
        <FadeIn>
          <h2
            id="projects-heading"
            className="font-display text-4xl md:text-5xl text-ink tracking-tight mb-xxl"
          >
            Projects
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-xxl">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                project={project}
                onViewDetails={handleViewDetails}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={modalSlug !== null}
        onClose={handleClose}
      />
    </section>
  );
}
