"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { ReadinessOverview } from "@/components/dashboard/ReadinessOverview";
import { useTranslation } from "react-i18next";
import { 
  BadgeCheck, 
  Store, 
  Plane, 
  Baby, 
  Car, 
  Gavel, 
  Search,
  Globe,
  ChevronRight,
  Fingerprint
} from "lucide-react";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <AppSidebar />
      
      <main className="flex-1 pl-72 flex flex-col min-w-0">
        <Header />

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-10">
          
          {/* Header & Welcome */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                {t('common.welcome')}, Abebe
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {t('dashboard.welcomeSub')}
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800 rounded-full">
              <Fingerprint className="w-4 h-4 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">{t('dashboard.securityLevel')}</span>
                <span className="text-xs font-bold text-primary">Level 2 - Biometric</span>
              </div>
            </div>
          </div>

          {/* Hero Banner (Abstract Gradient) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 dark:bg-black min-h-[280px] flex items-center p-8 md:p-12 shadow-2xl shadow-primary/20 group">
             {/* Abstract Background */}
             <div className="absolute inset-0 bg-mesh opacity-40 mix-blend-screen" />
             <div className="absolute right-0 top-0 w-[420px] h-[420px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
             <div className="absolute left-[-10%] bottom-[-30%] w-[420px] h-[420px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />
             
             <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                   New Digital ID Available
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
                   {t('dashboard.nationalIdBanner')}
                </h2>
                <div className="flex gap-4">
                   <button className="px-6 py-3 bg-surface text-blue-950 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5">
                      {t('dashboard.applyNow')}
                   </button>
                   <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md">
                      {t('dashboard.learnMore')}
                   </button>
                </div>
             </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
             
             {/* Left Column: Services (8 cols) */}
             <div className="xl:col-span-8 space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Store className="w-5 h-5 text-slate-400" />
                      {t('dashboard.commonServices')}
                   </h3>
                   <a href="/services" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1">
                      {t('dashboard.viewCatalog')} <ChevronRight className="w-4 h-4" />
                   </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ServiceCard 
                      title={t('services.tradeLicense.title')} 
                      description={t('services.tradeLicense.description')}
                      icon={<Store className="w-6 h-6" />}
                      estimate={t('services.estimates.days', { count: 2 })}
                      badge="online"
                      color="blue"
                      href="/flows/trade-license"
                   />
                   <ServiceCard 
                      title={t('services.tinRegistration.title')} 
                      description={t('services.tinRegistration.description')}
                      icon={<BadgeCheck className="w-6 h-6" />}
                      estimate={t('services.estimates.instant')}
                      badge="instant"
                      color="blue"
                   />
                   <ServiceCard 
                      title={t('services.passport.title')} 
                      description={t('services.passport.description')}
                      icon={<Plane className="w-6 h-6" />}
                      estimate={t('services.estimates.weeks', { count: 2 })}
                      badge="inPerson"
                      color="amber"
                   />
                   <ServiceCard 
                      title={t('services.vitalEvents.title')} 
                      description={t('services.vitalEvents.description')}
                      icon={<Baby className="w-6 h-6" />}
                      estimate={t('services.estimates.days', { count: 1 })}
                      badge="online"
                      color="purple"
                   />
                </div>
             </div>

             {/* Right Column: Readiness & Support (4 cols) */}
             <div className="xl:col-span-4 space-y-8">
                <ReadinessOverview />
                
                {/* Support Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                      <Gavel width="120" height="120" />
                   </div>
                   <h3 className="font-display font-bold text-xl mb-2 relative z-10">{t('dashboard.needAssistance')}</h3>
                   <p className="text-blue-100 text-sm mb-6 leading-relaxed relative z-10 max-w-[80%]">
                      {t('dashboard.supportSub')}
                   </p>
                   <button className="bg-surface text-blue-700 text-sm font-bold py-3 px-5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 relative z-10 w-full sm:w-auto">
                      {t('dashboard.contactSupport')}
                   </button>
                </div>
             </div>

          </div>
        </div>
      </main>
    </div>
  );
}
