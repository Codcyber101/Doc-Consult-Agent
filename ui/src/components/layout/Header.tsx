// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

"use client";

import React from "react";
import { Bell } from "lucide-react";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-transparent" />
      <div className="px-4 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-10 rounded-full border-2 border-foreground/10 bg-surface shadow-sm">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">G</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Federal Service</p>
            <h2 className="text-lg font-bold tracking-tight text-foreground">GovAssist Ethiopia</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground transition-colors" href="#">
              {t("common.services")}
            </a>
            <a className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground transition-colors" href="#">
              {t("common.trackStatus")}
            </a>
            <a className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground transition-colors" href="#">
              {t("common.support")}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button className="relative p-2 rounded-full border border-border bg-surface text-foreground/70 hover:text-foreground hover:border-foreground/20 transition-colors">
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-accent shadow-glow-gold" />
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
