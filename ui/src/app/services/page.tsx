// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

'use client';

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useTranslation } from "react-i18next";
import {
  Search,
  Store,
  Briefcase,
  User,
  Gavel,
  Plane,
  ArrowRight,
  Clock,
  BadgeCheck,
  Zap,
  TrendingUp,
  Baby,
  Building,
  Filter,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <AppSidebar />

      <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <div className="lg:hidden h-16 border-b border-border flex items-center px-4 sticky top-0 bg-surface/90 backdrop-blur z-30">
          <span className="font-bold text-lg font-display">GovAssist</span>
        </div>

        <div className="flex-1 container mx-auto max-w-7xl px-4 md:px-6 pt-6 pb-12 gap-8 flex flex-col lg:flex-row">
          <aside className="flex w-full lg:w-64 flex-col gap-8 shrink-0 lg:sticky lg:top-6 self-start">
            <div className="flex flex-col gap-4 bg-surface border border-border rounded-3xl p-5">
              <div className="flex flex-col pb-3 border-b border-border">
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted">Catalog</p>
                <h1 className="text-base font-bold font-display">{t("catalog.categories.title")}</h1>
                <p className="text-muted text-xs font-medium">{t("catalog.categories.subtitle")}</p>
              </div>
              <nav className="flex flex-col gap-1">
                <CategoryItem
                  icon={
                    <div className="grid grid-cols-2 gap-0.5 size-4">
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                    </div>
                  }
                  label={t("catalog.categories.all")}
                  active={activeFilter === "all"}
                />
                <CategoryItem icon={<Briefcase className="w-4 h-4" />} label={t("catalog.categories.business")} active={activeFilter === "business"} />
                <CategoryItem icon={<User className="w-4 h-4" />} label={t("catalog.categories.personal")} active={activeFilter === "personal"} />
                <CategoryItem icon={<Gavel className="w-4 h-4" />} label={t("catalog.categories.legal")} active={activeFilter === "legal"} />
                <CategoryItem icon={<Plane className="w-4 h-4" />} label={t("catalog.categories.immigration")} active={activeFilter === "immigration"} />
              </nav>
            </div>

            <div className="flex flex-col gap-4 bg-surface border border-border rounded-3xl p-5">
              <div className="flex flex-col pb-3 border-b border-border">
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted">Highlights</p>
                <h1 className="text-base font-bold font-display">{t("catalog.popular.title")}</h1>
                <p className="text-muted text-xs font-medium">{t("catalog.popular.subtitle")}</p>
              </div>
              <div className="flex flex-col gap-2">
                <PopularServiceItem title={t("services.passport.title")} icon={<Plane className="w-3.5 h-3.5" />} color="primary" />
                <PopularServiceItem title="Drivers License" icon={<User className="w-3.5 h-3.5" />} color="gold" />
                <PopularServiceItem title="Tax Clearance" icon={<Briefcase className="w-3.5 h-3.5" />} color="ink" />
              </div>
            </div>

            <div className="rounded-3xl bg-foreground p-5 text-surface relative overflow-hidden shadow-lg">
              <div className="absolute -right-4 -top-4 opacity-10">
                <User className="w-24 h-24" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-surface/70">Support Desk</p>
              <h3 className="font-bold mb-2 text-surface relative z-10 font-display">{t("dashboard.needAssistance")}</h3>
              <p className="text-xs text-surface/70 mb-4 relative z-10 leading-relaxed">{t("dashboard.supportSub")}</p>
              <button className="w-full py-2.5 bg-surface/10 hover:bg-surface/20 text-surface text-xs font-bold rounded-xl border border-surface/20 transition-colors relative z-10 backdrop-blur-sm">
                {t("dashboard.contactSupport")}
              </button>
            </div>
          </aside>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-muted">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Citizen Services Catalog</span>
              </div>
              <h1 className="text-3xl font-black text-foreground leading-tight mb-2 font-display">{t("catalog.title")}</h1>
              <p className="text-muted font-medium">{t("catalog.subtitle")}</p>
            </div>

            <div className="bg-surface border border-border rounded-2xl shadow-sm p-2 mb-8 sticky top-20 lg:top-6 z-20">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 bg-transparent border-none text-foreground placeholder-muted focus:ring-0 sm:text-sm font-medium h-full"
                    placeholder={t("catalog.searchPlaceholder")}
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0">
                  <FilterButton label={t("catalog.categories.all")} active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
                  <FilterButton label={t("catalog.categories.business")} active={activeFilter === "business"} onClick={() => setActiveFilter("business")} />
                  <FilterButton label={t("catalog.categories.personal")} active={activeFilter === "personal"} onClick={() => setActiveFilter("personal")} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CatalogCard
                title={t("services.tradeLicense.title")}
                subtitle={t("services.tradeLicense.description")}
                icon={<Store className="w-5 h-5" />}
                color="primary"
                time={t("services.estimates.days", { count: 3 })}
                digitalReadiness={85}
                fee="500 ETB"
              />

              <CatalogCard
                title={t("services.passport.title")}
                subtitle={t("services.passport.description")}
                icon={<Plane className="w-5 h-5" />}
                color="gold"
                time={t("services.estimates.weeks", { count: 3 })}
                digitalReadiness={40}
                fee="2,000 ETB"
              />

              <CatalogCard
                title={t("services.tinRegistration.title")}
                subtitle={t("services.tinRegistration.description")}
                icon={<BadgeCheck className="w-5 h-5" />}
                color="ink"
                time={t("services.estimates.instant")}
                digitalReadiness={100}
                fee="Free"
              />

              <CatalogCard
                title={t("services.vitalEvents.title")}
                subtitle={t("services.vitalEvents.description")}
                icon={<Baby className="w-5 h-5" />}
                color="primary"
                time={t("services.estimates.days", { count: 1 })}
                digitalReadiness={95}
                fee="50 ETB"
              />

              <CatalogCard
                title="Investment Permit"
                subtitle="የኢንቨስትመንት ፈቃድ"
                icon={<TrendingUp className="w-5 h-5" />}
                color="gold"
                time="5-7 Working Days"
                digitalReadiness={60}
                fee="3,500 ETB"
              />

              <CatalogCard
                title="Construction Permit"
                subtitle="የግንባታ ፈቃድ"
                icon={<Building className="w-5 h-5" />}
                color="ink"
                time="1-2 Months"
                digitalReadiness={15}
                fee="Variable"
              />
            </div>

            <div className="mt-12 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:border-primary/50 hover:text-primary bg-surface transition-all font-bold text-sm shadow-sm hover:shadow-md">
                {t("catalog.loadMore")}
                <div className="grid grid-cols-2 gap-0.5 size-3.5 opacity-50">
                  <div className="bg-current rounded-[0.5px]" />
                  <div className="bg-current rounded-[0.5px]" />
                  <div className="bg-current rounded-[0.5px]" />
                  <div className="bg-current rounded-[0.5px]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CategoryItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group border",
        active
          ? "bg-primary/10 text-primary font-bold border-primary/20"
          : "text-foreground/70 hover:bg-surface-muted font-medium hover:text-foreground border-transparent"
      )}
    >
      <div className={cn("transition-colors", !active && "text-muted group-hover:text-primary")}>{icon}</div>
      <span className="text-sm">{label}</span>
    </a>
  );
}

function PopularServiceItem({ title, sub, icon, color }: { title: string; sub?: string; icon: React.ReactNode; color: "primary" | "gold" | "ink" }) {
  const bgColors = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-accent/20 text-accent",
    ink: "bg-foreground/10 text-foreground",
  };

  return (
    <div className="group flex gap-3 items-center cursor-pointer p-2.5 rounded-xl hover:bg-surface-muted transition-all border border-transparent hover:border-border hover:shadow-sm">
      <div className={cn("p-2 rounded-lg shrink-0", bgColors[color])}>{icon}</div>
      <div>
        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{title}</p>
        {sub && <p className="text-[10px] text-muted font-ethiopic">{sub}</p>}
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all",
        active ? "bg-foreground text-surface shadow-md" : "bg-surface-muted text-foreground/70 hover:bg-surface"
      )}
    >
      {label}
    </button>
  );
}

interface CatalogCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "primary" | "gold" | "ink";
  time: string;
  digitalReadiness: number;
  fee: string;
}

function CatalogCard({ title, subtitle, icon, color, time, digitalReadiness, fee }: CatalogCardProps) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-accent/20 text-accent",
    ink: "bg-foreground/10 text-foreground",
  };

  const progressColors = {
    primary: "bg-primary",
    gold: "bg-accent",
    ink: "bg-foreground",
  };

  const textColors = {
    primary: "text-primary",
    gold: "text-accent",
    ink: "text-foreground",
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-xl", colors[color])}>{icon}</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted bg-surface-muted px-2 py-1 rounded-lg" title="MESOB Payment Integrated">
            <Zap className="w-3 h-3 text-primary fill-primary" />
            <span>MESOB</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors font-display">{title}</h3>
        <h4 className="text-sm text-muted font-ethiopic mb-6">{subtitle}</h4>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Clock className="w-4 h-4 text-muted" />
            <span className={cn("px-2 py-0.5 rounded-md", colors[color])}>{time}</span>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <span className="text-muted">Digital Readiness</span>
              <span className={textColors[color]}>{digitalReadiness}% Online</span>
            </div>
            <div className="w-full bg-surface-muted rounded-full h-1.5">
              <div className={cn("h-1.5 rounded-full transition-all duration-500", progressColors[color])} style={{ width: `${digitalReadiness}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-surface/50 group-hover:bg-surface transition-colors">
        <div>
          <p className="text-[10px] text-muted uppercase font-black tracking-widest">Fee</p>
          <p className="text-sm font-bold text-foreground">{fee}</p>
        </div>
        <button className="text-xs font-bold uppercase tracking-[0.25em] text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
