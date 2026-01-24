"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { ReadinessOverview } from "@/components/dashboard/ReadinessOverview";
import { 
  BadgeCheck, 
  Store, 
  Plane, 
  Baby, 
  Car, 
  Gavel, 
  Search,
  Globe,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20">
      <AppSidebar />
      
      <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Mobile Header Placeholder (visible only on small screens) */}
        <div className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 bg-white/80 backdrop-blur-md z-30">
           <span className="font-bold text-lg">GovAssist</span>
        </div>

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-10">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                Welcome back, Abebe
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Access government services, track applications, and manage your digital identity.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">English / አማርኛ</span>
                  <span className="sm:hidden">EN</span>
               </button>
            </div>
          </div>

          {/* Hero Banner (Abstract Gradient) */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-black min-h-[240px] flex items-center p-8 md:p-12 shadow-2xl shadow-emerald-900/20 group">
             {/* Abstract Background */}
             <div className="absolute inset-0 bg-mesh-emerald opacity-40 mix-blend-screen" />
             <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                   New Digital ID Available
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display leading-tight">
                   Secure your digital identity with the new <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">National ID</span>
                </h2>
                <div className="flex gap-4">
                   <button className="px-6 py-3 bg-white text-emerald-950 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg shadow-black/20">
                      Apply Now
                   </button>
                   <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md">
                      Learn More
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
                      Common Services
                   </h3>
                   <a href="/services" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                      View Catalog <ChevronRight className="w-4 h-4" />
                   </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ServiceCard 
                      title="Trade License Renewal" 
                      description="Renew your business operating license for the 2016 fiscal year."
                      icon={<Store className="w-6 h-6" />}
                      estimate="Est. 2 Days"
                      badge="Online"
                      color="emerald"
                      href="/apply"
                   />
                   <ServiceCard 
                      title="TIN Registration" 
                      description="Get your Tax Identification Number instantly for new businesses."
                      icon={<BadgeCheck className="w-6 h-6" />}
                      estimate="Instant"
                      badge="Instant"
                      color="blue"
                   />
                   <ServiceCard 
                      title="Passport Services" 
                      description="New issuance and renewal of Ethiopian passports."
                      icon={<Plane className="w-6 h-6" />}
                      estimate="Est. 2 Weeks"
                      badge="In-Person"
                      color="amber"
                   />
                   <ServiceCard 
                      title="Vital Events" 
                      description="Register births, marriages, and other vital life events."
                      icon={<Baby className="w-6 h-6" />}
                      estimate="Est. 1 Day"
                      badge="Online"
                      color="purple"
                   />
                   <ServiceCard 
                      title="Vehicle Registration" 
                      description="Annual inspection and new vehicle plate registration."
                      icon={<Car className="w-6 h-6" />}
                      estimate="Est. 1 Day"
                      badge="In-Person"
                      color="amber"
                   />
                   <ServiceCard 
                      title="Legal Services" 
                      description="Notary services and legal document authentication."
                      icon={<Gavel className="w-6 h-6" />}
                      estimate="Est. 3 Days"
                      badge="Online"
                      color="emerald"
                   />
                </div>
             </div>

             {/* Right Column: Readiness & Support (4 cols) */}
             <div className="xl:col-span-4 space-y-8">
                <ReadinessOverview />
                
                {/* Support Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                   </div>
                   <h3 className="font-display font-bold text-xl mb-2 relative z-10">Need Assistance?</h3>
                   <p className="text-indigo-100 text-sm mb-6 leading-relaxed relative z-10 max-w-[80%]">
                      Our support team is available 24/7 to help you navigate through government services.
                   </p>
                   <button className="bg-white text-indigo-700 text-sm font-bold py-3 px-5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10 relative z-10 w-full sm:w-auto">
                      Contact Support
                   </button>
                </div>
             </div>

          </div>
        </div>
      </main>
    </div>
  );
}
