import type { Metadata, Viewport } from "next";
import { CopilotKit } from "@copilotkit/react-core/v2";
import { MotionConfig } from "motion/react";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./copilotkit-overrides.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lochan Vishwanath — Frontend Engineer who ships AI",
  description:
    "Senior Frontend Engineer with 6 YoE pivoting to Frontend-heavy Full-Stack with AI. Bengaluru / Remote.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <CopilotKit runtimeUrl="/api/copilotkit" showDevConsole={false} useSingleEndpoint>
          <MotionConfig reducedMotion="never">
            {children}
          </MotionConfig>
        </CopilotKit>
      </body>
    </html>
  );
}