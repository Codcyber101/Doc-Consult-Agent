// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { ReadinessOverview } from "@/components/dashboard/ReadinessOverview";
import { useTranslation } from "react-i18next";
import { BadgeCheck, Store, Plane, Baby, ChevronRight, Fingerprint, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <AppSidebar />

      <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header />

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">Citizen Services Desk</p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-display">
                {t("common.welcome")}, Abebe
              </h1>
              <p className="text-muted font-medium">{t("dashboard.welcomeSub")}</p>
            </div>

            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-surface border border-border rounded-2xl reveal reveal-delay-1">
              <Fingerprint className="w-5 h-5 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase text-muted font-bold tracking-[0.28em]">{t("dashboard.securityLevel")}</span>
                <span className="text-xs font-bold text-foreground">Level 2 - Biometric</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-[28px] overflow-hidden bg-surface border border-border min-h-[300px] p-8 md:p-12 shadow-xl shadow-primary/10 maplines reveal reveal-delay-2">
            <div className="absolute inset-0 bg-mesh opacity-70" />
            <div className="absolute right-10 top-8 size-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute left-0 bottom-0 size-48 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/70 text-xs font-bold uppercase tracking-[0.32em] text-foreground stamp-press">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                New Digital ID Available
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground font-display leading-tight">
                {t("dashboard.nationalIdBanner")}
              </h2>
              <p className="text-sm md:text-base text-muted max-w-xl">
                Secure, verify, and submit your application with a streamlined civic workflow. Track each step and receive compliance feedback instantly.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-foreground text-surface font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-foreground/20">
                  {t("dashboard.applyNow")}
                </button>
                <button className="px-6 py-3 bg-surface text-foreground font-bold rounded-xl hover:bg-surface-muted transition-colors border border-border">
                  {t("dashboard.learnMore")}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-8">
              <div className="flex items-center justify-between reveal reveal-delay-3">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Store className="w-5 h-5 text-muted" />
                  {t("dashboard.commonServices")}
                </h3>
                <a href="/services" className="text-xs font-bold uppercase tracking-[0.3em] text-primary hover:text-primary-dark flex items-center gap-2">
                  {t("dashboard.viewCatalog")} <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="reveal reveal-delay-1">
                <ServiceCard
                  title={t("services.tradeLicense.title")}
                  description={t("services.tradeLicense.description")}
                  icon={<Store className="w-6 h-6" />}
                  estimate={t("services.estimates.days", { count: 2 })}
                  badge="online"
                  color="emerald"
                  href="/services/trade-license"
                />
                </div>
                <div className="reveal reveal-delay-2">
                  <ServiceCard
                    title={t("services.tinRegistration.title")}
                    description={t("services.tinRegistration.description")}
                    icon={<BadgeCheck className="w-6 h-6" />}
                    estimate={t("services.estimates.instant")}
                    badge="instant"
                    color="ink"
                  />
                </div>
                <div className="reveal reveal-delay-3">
                  <ServiceCard
                    title={t("services.passport.title")}
                    description={t("services.passport.description")}
                    icon={<Plane className="w-6 h-6" />}
                    estimate={t("services.estimates.weeks", { count: 2 })}
                    badge="inPerson"
                    color="gold"
                  />
                </div>
                <div className="reveal reveal-delay-4">
                  <ServiceCard
                    title={t("services.vitalEvents.title")}
                    description={t("services.vitalEvents.description")}
                    icon={<Baby className="w-6 h-6" />}
                    estimate={t("services.estimates.days", { count: 1 })}
                    badge="online"
                    color="emerald"
                  />
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 space-y-8">
              <div className="reveal reveal-delay-2">
                <ReadinessOverview />
              </div>

              <div className="bg-foreground text-surface rounded-3xl p-8 shadow-xl shadow-foreground/20 relative overflow-hidden reveal reveal-delay-3">
                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                  <span className="text-6xl font-display">GA</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-surface/60">Support Desk</p>
                <h3 className="font-display font-bold text-xl mb-2 relative z-10">{t("dashboard.needAssistance")}</h3>
                <p className="text-surface/70 text-sm mb-6 leading-relaxed relative z-10 max-w-[85%]">
                  {t("dashboard.supportSub")}
                </p>
                <button className="bg-surface text-foreground text-sm font-bold py-3 px-5 rounded-xl hover:bg-surface-muted transition-colors shadow-lg shadow-black/10 relative z-10 w-full sm:w-auto">
                  {t("dashboard.contactSupport")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
