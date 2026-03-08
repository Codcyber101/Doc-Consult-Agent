// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Files, History, Settings, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSidebar } from "@/lib/context/SidebarContext";

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col bg-surface border-r border-border h-screen fixed inset-y-0 left-0 z-40 transition-all duration-300 overflow-hidden",
      isCollapsed ? "w-20" : "w-72"
    )}>
      {/* Background decoration moved to avoid conflicting with fixed positioning */}
      <div className="absolute inset-0 maplines pointer-events-none opacity-50" />

      <div className="p-6 pb-3 relative z-10 flex items-center justify-between">
        <Link href="/" className={cn("flex items-center gap-4 group transition-opacity duration-300", isCollapsed && "opacity-0 invisible w-0 overflow-hidden")}>
          <div className="size-11 rounded-full border-2 border-foreground/15 bg-gradient-to-br from-surface to-surface-muted flex items-center justify-center shadow-sm shrink-0">
            <span className="font-display font-bold text-xl">G</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-foreground text-lg font-bold leading-none tracking-tight font-display">{t("common.brandName")}</h1>
            <p className="text-muted text-[10px] font-semibold uppercase tracking-[0.35em] mt-1">{t("common.ethiopia")}</p>
          </div>
        </Link>
        
        {isCollapsed && (
          <div className="size-11 rounded-full border-2 border-foreground/15 bg-gradient-to-br from-surface to-surface-muted flex items-center justify-center shadow-sm shrink-0 mx-auto transition-all duration-300">
            <span className="font-display font-bold text-xl">G</span>
          </div>
        )}
      </div>

      <button 
        onClick={toggleSidebar}
        className="absolute -right-0 top-20 size-6 bg-surface border border-border border-r-0 rounded-l-full flex items-center justify-center text-muted hover:text-primary shadow-sm z-50 transition-transform hover:scale-110"
        style={{ transform: 'translateX(0)' }}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10 custom-sidebar-scroll">
        {!isCollapsed && <p className="px-3 text-[10px] font-bold text-muted uppercase tracking-[0.32em] mb-2">{t("common.mainMenu")}</p>}

        <NavItem href="/" icon={<LayoutDashboard className="w-5 h-5" />} label={t("common.dashboard")} active={pathname === "/"} isCollapsed={isCollapsed} />
        <NavItem href="/services" icon={<Files className="w-5 h-5" />} label={t("common.services")} active={pathname === "/services"} isCollapsed={isCollapsed} />
        <NavItem href="/vault" icon={<Database className="w-5 h-5" />} label={t("common.myVault")} active={pathname === "/vault"} isCollapsed={isCollapsed} />
        <NavItem href="/queue" icon={<History className="w-5 h-5" />} label={t("common.myQueue")} active={pathname === "/queue"} badge="3" isCollapsed={isCollapsed} />

        <div className="my-6 border-t border-border" />

        {!isCollapsed && (
          <>
            <p className="px-3 text-[10px] font-bold text-muted uppercase tracking-[0.32em] mb-2">{t("common.system")}</p>

            <div className="px-2 py-2">
              <div className="bg-surface-muted rounded-2xl p-4 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Database className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{t("common.localDb")}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t("common.syncActive")}</span>
                </div>
                <div className="w-full bg-surface rounded-full h-1.5 mb-1 overflow-hidden border border-border">
                  <div className="bg-primary h-1.5 rounded-full w-[24%]" />
                </div>
                <p className="text-[10px] text-muted text-right font-mono">12MB / 50MB</p>
              </div>
            </div>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-border relative z-10 bg-surface">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-2xl text-foreground/80 hover:bg-surface-muted transition-colors group">
          <div
            className="size-9 rounded-full bg-surface-muted bg-cover bg-center border border-border shrink-0"
            style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${encodeURIComponent(t("common.citizenName"))}&background=f6f1e8&color=14161b)` }}
          />
          {!isCollapsed && (
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate w-full text-left">{t("common.citizenName")}</span>
              <span className="text-[10px] text-muted truncate w-full text-left">{t("common.citizenId")}: {t("common.citizenIdNumber")}</span>
            </div>
          )}
          {!isCollapsed && <Settings className="w-4 h-4 ml-auto text-muted group-hover:rotate-90 transition-transform shrink-0" />}
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  active?: boolean;
  badge?: string;
  isCollapsed?: boolean;
}

function NavItem({ href, icon, label, subLabel, active, badge, isCollapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative",
        active ? "bg-primary/10 text-primary font-bold" : "text-foreground/70 hover:bg-surface-muted hover:text-foreground font-medium",
        isCollapsed && "justify-center px-0"
      )}
    >
      {active && <div className={cn(
        "absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-2 border-accent bg-accent/10 stamp-press",
        isCollapsed ? "left-1/2 -translate-x-1/2" : "left-3"
      )} />}
      <div className={cn("transition-transform group-hover:scale-110 shrink-0", active && "text-primary")}>{icon}</div>
      {!isCollapsed && (
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm leading-none tracking-tight truncate">{label}</span>
          {subLabel && <span className="text-[10px] opacity-70 font-normal font-ethiopic mt-0.5 truncate">{subLabel}</span>}
        </div>
      )}
      {badge && !isCollapsed && (
        <span className="ml-auto bg-foreground text-surface text-[10px] font-bold px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </Link>
  );
}
