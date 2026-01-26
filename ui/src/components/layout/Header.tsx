"use client";

import React from "react";
import { Globe, Bell, Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm">
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
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Services</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Track Status</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Support</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">English / አማርኛ</span>
              <span className="sm:hidden">EN</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
