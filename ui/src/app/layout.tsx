// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/common/Toast";
import { I18nInitializer } from "@/components/common/I18nInitializer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic", "latin"],
  variable: "--font-noto-sans-ethiopic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GovAssist Ethiopia",
  description: "Official Document Assistance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${hankenGrotesk.variable} ${notoSansEthiopic.variable} font-sans antialiased min-h-screen bg-background text-foreground paper-grain`}
      >
        <I18nInitializer>
          <ToastProvider>{children}</ToastProvider>
        </I18nInitializer>
      </body>
    </html>
  );
}
