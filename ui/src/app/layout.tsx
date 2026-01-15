// Ensure this file is empty or just passes through if not used, 
// but since I used standard layout in page.tsx for now, let's keep the root layout clean.

import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}