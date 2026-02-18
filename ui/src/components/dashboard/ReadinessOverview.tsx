// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ReadinessOverview() {
  const { t } = useTranslation();

  return (
    <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-surface-muted flex justify-between items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted">Readiness Ledger</p>
          <h3 className="font-display font-bold text-lg text-foreground mt-1">{t("readiness.title")}</h3>
          <p className="text-xs text-muted mt-1">{t("readiness.subtitle")}</p>
        </div>
        <div className="size-10 rounded-full border-2 border-accent text-accent flex items-center justify-center stamp">
          3
        </div>
      </div>

      <div className="divide-y divide-border">
        <div className="p-5 hover:bg-surface-muted transition-colors group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-sm text-foreground truncate">{t("services.tinRegistration.title")}</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {t("readiness.status.approved")}
                </span>
              </div>
              <p className="text-xs text-muted font-mono">Ref: #TR-2023-8891</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-surface-muted border-t border-border">
        <button className="w-full py-2.5 text-xs font-bold text-foreground/70 hover:text-primary hover:bg-surface rounded-xl border border-transparent hover:border-border transition-all flex items-center justify-center gap-2 group">
          {t("readiness.viewAll")}
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
