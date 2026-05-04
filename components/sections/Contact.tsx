"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
      <div className="max-w-xl mx-auto px-lg">
        <h2
          id="contact-heading"
          className="font-display text-4xl tracking-tighter text-ink mb-md"
        >
          Get in touch
        </h2>
        <p className="font-sans text-body-strong text-ink mb-xl">
          Whether it is a role, a project, or just a chat about frontend AI — my inbox is open.
        </p>

        {/* Contact method cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
          {/* Email */}
          <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center">
            <Mail className="w-5 h-5 text-primary" aria-hidden />
            <span className="font-sans text-sm font-medium text-ink">Email</span>
            <a
              href={`mailto:${profile.email}`}
              className="font-sans text-sm text-body text-primary hover:underline"
            >
              Email me
            </a>
          </Card>

          {/* LinkedIn */}
          <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center">
            <Linkedin className="w-5 h-5 text-primary" aria-hidden />
            <span className="font-sans text-sm font-medium text-ink">LinkedIn</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-body text-primary hover:underline"
            >
              Connect
            </a>
          </Card>

          {/* GitHub */}
          <Card variant="surface" className="flex flex-col items-center gap-sm p-lg text-center">
            <Github className="w-5 h-5 text-primary" aria-hidden />
            <span className="font-sans text-sm font-medium text-ink">GitHub</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-body text-primary hover:underline"
            >
              Follow
            </a>
          </Card>
        </div>

        {/* Coral callout CTA */}
        <Card variant="callout-coral" className="text-center">
          <h3 className="font-display text-2xl tracking-tighter text-on-primary mb-sm">
            Or just ask the bot.
          </h3>
          <p className="font-sans text-sm text-on-primary opacity-90 mb-lg">
            The chatbot on this page knows this portfolio inside out. Ask it anything.
          </p>
          <Button
            variant="secondary"
            onClick={openChat}
          >
            Open chat ↘
          </Button>
        </Card>
      </div>
    </section>
  );
}