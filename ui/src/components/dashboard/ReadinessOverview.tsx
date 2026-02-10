import React from "react";
import { CheckCircle2, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ReadinessOverview() {
  const { t } = useTranslation();

  return (
    <div className="bg-surface/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-border/70 dark:border-slate-800/60 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/60 dark:border-slate-800/50 bg-surface/40 dark:bg-slate-900/40 flex justify-between items-center">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{t('readiness.title')}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('readiness.subtitle')}</p>
        </div>
        <div className="size-8 rounded-full bg-surface-muted dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <span className="font-mono text-xs font-bold">3</span>
        </div>
      </div>
      
      <div className="divide-y divide-border/50 dark:divide-slate-800/50">
        {/* Item 1: Approved */}
        <div className="p-5 hover:bg-surface-muted dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-primary/10 dark:bg-blue-900/20 text-primary dark:text-blue-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{t('services.tinRegistration.title')}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">{t('readiness.status.approved')}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Ref: #TR-2023-8891</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-surface-muted/60 dark:bg-slate-900/30 border-t border-border/60 dark:border-slate-800/50">
        <button className="w-full py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-surface dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-border dark:hover:border-slate-700 transition-all flex items-center justify-center gap-2 group">
          {t('readiness.viewAll')}
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
