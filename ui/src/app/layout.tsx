// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/common/Toast";
import { I18nInitializer } from "@/components/common/I18nInitializer";
import { OfflineSyncInitializer } from "@/components/common/OfflineSyncInitializer";

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
        className="font-sans antialiased min-h-screen bg-background text-foreground paper-grain"
      >
        <I18nInitializer>
          <ToastProvider>
            <OfflineSyncInitializer />
            {children}
          </ToastProvider>
        </I18nInitializer>
      </body>
    </html>
  );
}
