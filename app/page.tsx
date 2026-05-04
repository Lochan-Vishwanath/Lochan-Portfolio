"use client";

import { TopNav } from "@/components/nav/TopNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ChatPopup } from "@/components/chat/ChatPopup";
import { AvatarButton } from "@/components/chat/AvatarButton";

export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Writing />
      <Contact />
      <Footer />
      <ChatPopup />
      <AvatarButton />
    </>
  );
}
