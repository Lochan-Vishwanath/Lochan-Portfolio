"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { profile } from "@/lib/data/profile";

export function Contact() {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat-panel")
    );
  };

  return (
    <section
      id="contact"
      className="py-section bg-canvas"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-lg">
        <FadeIn>
          <h2
            id="contact-heading"
            className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-md"
          >
            Get in touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-sans text-lg md:text-xl text-body mb-xl max-w-2xl">
            Whether it is a role, a project, or just a chat about frontend AI — my inbox is open.
          </p>
        </FadeIn>

        {/* Contact method cards */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-xl">
          {/* Email */}
          <StaggerItem>
            <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Mail className="w-6 h-6 text-primary" aria-hidden />
              <span className="font-sans text-base font-medium text-ink">Email</span>
              <a
                href={`mailto:${profile.email}`}
                className="font-sans text-sm text-body text-primary hover:underline"
              >
                Email me
              </a>
            </Card>
          </StaggerItem>

          {/* LinkedIn */}
          <StaggerItem>
            <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Linkedin className="w-6 h-6 text-primary" aria-hidden />
              <span className="font-sans text-base font-medium text-ink">LinkedIn</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-body text-primary hover:underline"
              >
                Connect
              </a>
            </Card>
          </StaggerItem>

          {/* GitHub */}
          <StaggerItem>
            <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Github className="w-6 h-6 text-primary" aria-hidden />
              <span className="font-sans text-base font-medium text-ink">GitHub</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-body text-primary hover:underline"
              >
                Follow
              </a>
            </Card>
          </StaggerItem>
        </StaggerContainer>

        {/* Coral callout CTA - disabled until CopilotKit is ready */}
        {/* <FadeIn delay={0.3}>
          <Card variant="callout-coral" className="text-center p-xl md:p-2xl">
            <h3 className="font-display text-2xl md:text-3xl tracking-tight text-on-primary mb-sm">
              Or just ask the bot.
            </h3>
            <p className="font-sans text-base md:text-lg text-on-primary opacity-90 mb-lg w-full text-center px-md">
              The chatbot on this page knows this portfolio inside out. Ask it anything.
            </p>
            <Button
              variant="secondary"
              onClick={openChat}
            >
              Open chat ↘
            </Button>
          </Card>
        </FadeIn> */}
      </div>
    </section>
  );
}