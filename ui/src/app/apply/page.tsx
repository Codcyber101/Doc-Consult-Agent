"use client";

import React from "react";
import { GuidanceSidebar } from "@/components/domain/GuidanceSidebar";
import { WizardShell } from "@/components/domain/WizardShell";

export default function ApplicationPage() {
  return (
    <div className="h-screen w-full bg-background flex overflow-hidden font-sans text-foreground selection:bg-emerald-500/20">
      {/* Main Workspace */}
      <WizardShell />

      {/* Context Rail (Hidden on mobile, visible on desktop) */}
      <div className="hidden lg:block h-full shrink-0">
        <GuidanceSidebar />
      </div>
      
      {/* Mobile Sidebar Toggle (Floating Action Button could go here) */}
    </div>
  );
}