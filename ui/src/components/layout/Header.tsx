"use client";

import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-slate-800 bg-surface/95 dark:bg-slate-900/95 backdrop-blur shadow-sm">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded bg-primary/10 text-primary">
            <span className="font-bold text-lg">G</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight hidden sm:block">GovAssist Ethiopia</h2>
          <h2 className="text-lg font-bold leading-tight tracking-tight block sm:hidden">GovAssist</h2>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">{t('common.services')}</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">{t('common.trackStatus')}</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">{t('common.support')}</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
