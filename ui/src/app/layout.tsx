// Ensure this file is empty or just passes through if not used, 
// but since I used standard layout in page.tsx for now, let's keep the root layout clean.

import type { Metadata } from "next";
import { Public_Sans, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/common/Toast";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
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
      <body className={`${publicSans.variable} ${notoSansEthiopic.variable} font-sans antialiased min-h-screen bg-background text-foreground grain`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}