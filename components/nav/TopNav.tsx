"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { profile } from "@/lib/data/profile";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(["about", "projects", "experience", "writing", "contact"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-xl border-b border-hairline shadow-sm"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="w-full max-w-6xl mx-auto px-lg flex items-center justify-between">
        {/* Left: SpikeMark + Wordmark */}
        <Link href="#hero" className="flex items-center gap-sm group">
          <SpikeMark className="text-ink transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-lg text-ink tracking-tight">
            {profile.name.split(" ")[0]}
          </span>
        </Link>

        {/* Center-right: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors relative group ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Right: Availability Pill */}
        <div className="hidden md:flex items-center gap-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-sans text-xs text-muted">Available</span>
        </div>

        {/* Mobile: Hamburger */}
        <button
          type="button"
          className="md:hidden p-sm text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-canvas/95 backdrop-blur-xl border-b border-hairline p-lg md:hidden"
          >
            <div className="flex flex-col gap-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-sans text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted hover:text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-sm pt-sm border-t border-hairline">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-sans text-xs text-muted">Available</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}