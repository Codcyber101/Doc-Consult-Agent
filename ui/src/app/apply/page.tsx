"use client";

import React from "react";
import { GuidanceSidebar } from "@/components/domain/GuidanceSidebar";
import { WizardShell } from "@/components/domain/WizardShell";
import { useTranslation } from "react-i18next";

export default function ApplicationPage() {
  const { t } = useTranslation();

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden font-sans text-foreground selection:bg-primary/20">
      {/* Main Workspace */}
      <WizardShell 
        currentStep={1}
        totalSteps={3}
        title={t("apply.title")}
        description={t("apply.subtitle")}
        onNext={() => {}}
      >
        <div className="p-8 bg-surface dark:bg-slate-900 rounded-[2rem] border border-border dark:border-slate-800">
           <h3 className="text-xl font-bold mb-4">{t("apply.welcome")}</h3>
           <p className="text-slate-500">{t("apply.instruction")}</p>
        </div>
      </WizardShell>

      {/* Context Rail (Hidden on mobile, visible on desktop) */}
      <div className="hidden lg:block h-full shrink-0">
        <GuidanceSidebar />
      </div>
      
      {/* Mobile Sidebar Toggle (Floating Action Button could go here) */}
    </div>
  );
}
