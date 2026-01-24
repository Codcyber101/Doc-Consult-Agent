"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20">
      <AppSidebar />
      
      <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-30">
           <span className="font-bold text-lg font-display">GovAssist</span>
        </div>

        <div className="flex-1 container mx-auto max-w-7xl px-4 md:px-6 pt-6 pb-12 gap-8 flex flex-col lg:flex-row">
          
          {/* Left Sidebar (Filters) */}
          <aside className="hidden lg:flex w-64 flex-col gap-8 shrink-0 sticky top-6 self-start">
            {/* Categories */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col pb-2 border-b border-slate-200 dark:border-slate-800">
                <h1 className="text-base font-bold font-display">Categories</h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Browse by sector</p>
              </div>
              <nav className="flex flex-col gap-1">
                <CategoryItem 
                  icon={<div className="grid grid-cols-2 gap-0.5 size-4"><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/></div>} 
                  label="All Services" 
                  active 
                />
                <CategoryItem icon={<Briefcase className="w-4 h-4" />} label="Business (ንግድ)" />
                <CategoryItem icon={<User className="w-4 h-4" />} label="Personal (የግል)" />
                <CategoryItem icon={<Gavel className="w-4 h-4" />} label="Legal (ህጋዊ)" />
                <CategoryItem icon={<Plane className="w-4 h-4" />} label="Immigration" />
              </nav>
            </div>

            {/* Popular Services Widget */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col pb-2 border-b border-slate-200 dark:border-slate-800">
                <h1 className="text-base font-bold font-display">Popular Services</h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Most requested this week</p>
              </div>
              <div className="flex flex-col gap-2">
                <PopularServiceItem title="Passport Renewal" sub="ፓስፖርት እድሳት" icon={<Plane className="w-3.5 h-3.5" />} color="blue" />
                <PopularServiceItem title="Drivers License" sub="የመንጃ ፈቃድ" icon={<User className="w-3.5 h-3.5" />} color="amber" />
                <PopularServiceItem title="Tax Clearance" sub="የግብር ክሊራንስ" icon={<Briefcase className="w-3.5 h-3.5" />} color="purple" />
              </div>
            </div>

            {/* Support Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white relative overflow-hidden shadow-lg">
              <div className="absolute -right-4 -top-4 opacity-10">
                <User className="w-24 h-24" />
              </div>
              <h3 className="font-bold mb-2 text-emerald-400 relative z-10 font-display">Need Help?</h3>
              <p className="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">Our support center is available 24/7 to assist with your applications.</p>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors relative z-10 backdrop-blur-sm">
                Contact Support
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Headlines */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2 font-display">
                Find Government Services <span className="block text-xl md:inline md:text-2xl text-slate-400 font-ethiopic font-normal md:ml-2">/ የመንግስት አገልግሎቶችን ያግኙ</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Transparent, efficient, and digital-first public services.</p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 p-2 mb-8 sticky top-20 lg:top-6 z-20">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-11 pr-4 py-3 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 sm:text-sm font-medium h-full" 
                    placeholder="Search for licenses, passports, permits... (ለምሳሌ፦ ንግድ ፈቃድ)" 
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
                  <FilterButton label="All Services" active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
                  <FilterButton label="Business (ንግድ)" active={activeFilter === "business"} onClick={() => setActiveFilter("business")} />
                  <FilterButton label="Personal (የግል)" active={activeFilter === "personal"} onClick={() => setActiveFilter("personal")} />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              <CatalogCard 
                title="New Business License"
                subtitle="አዲስ የንግድ ፈቃድ"
                icon={<Store className="w-5 h-5" />}
                color="emerald"
                time="3-5 Working Days"
                digitalReadiness={85}
                fee="500 ETB"
              />

              <CatalogCard 
                title="Passport Issuance"
                subtitle="የፓስፖርት አገልግሎት"
                icon={<Plane className="w-5 h-5" />}
                color="blue"
                time="15-30 Days"
                digitalReadiness={40}
                fee="2,000 ETB"
              />

              <CatalogCard 
                title="VAT Registration"
                subtitle="የተጨማሪ እሴት ታክስ ምዝገባ"
                icon={<BadgeCheck className="w-5 h-5" />}
                color="purple"
                time="1 Day Instant"
                digitalReadiness={100}
                fee="Free"
              />

              <CatalogCard 
                title="Investment Permit"
                subtitle="የኢንቨስትመንት ፈቃድ"
                icon={<TrendingUp className="w-5 h-5" />}
                color="amber"
                time="5-7 Working Days"
                digitalReadiness={60}
                fee="3,500 ETB"
              />

              <CatalogCard 
                title="Birth Certificate"
                subtitle="የልደት የምስክር ወረቀት"
                icon={<Baby className="w-5 h-5" />}
                color="pink"
                time="Same Day"
                digitalReadiness={95}
                fee="50 ETB"
              />

              <CatalogCard 
                title="Construction Permit"
                subtitle="የግንባታ ፈቃድ"
                icon={<Building className="w-5 h-5" />}
                color="slate"
                time="1-2 Months"
                digitalReadiness={15}
                fee="Variable"
              />

            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-600 bg-white dark:bg-slate-900 transition-all font-bold text-sm shadow-sm hover:shadow-md">
                Load More Services
                <div className="grid grid-cols-2 gap-0.5 size-3.5 opacity-50">
                   <div className="bg-current rounded-[0.5px]"/>
                   <div className="bg-current rounded-[0.5px]"/>
                   <div className="bg-current rounded-[0.5px]"/>
                   <div className="bg-current rounded-[0.5px]"/>
                </div>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function CategoryItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
      active 
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-800" 
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium hover:text-slate-900 dark:hover:text-white"
    )}>
      <div className={cn("transition-colors", !active && "text-slate-400 group-hover:text-emerald-600")}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </a>
  );
}

function PopularServiceItem({ title, sub, icon, color }: { title: string, sub: string, icon: React.ReactNode, color: "blue" | "amber" | "purple" }) {
  const bgColors = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="group flex gap-3 items-center cursor-pointer p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hover:shadow-sm">
      <div className={cn("p-2 rounded-lg shrink-0", bgColors[color])}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">{title}</p>
        <p className="text-[10px] text-slate-400 font-ethiopic">{sub}</p>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all",
        active 
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105" 
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
  color: "emerald" | "blue" | "purple" | "amber" | "pink" | "slate";
  time: string;
  digitalReadiness: number;
  fee: string;
}

function CatalogCard({ title, subtitle, icon, color, time, digitalReadiness, fee }: CatalogCardProps) {
  const colors = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  };

  const progressColors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    pink: "bg-pink-500",
    slate: "bg-slate-500",
  };

  const textColors = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    amber: "text-amber-600 dark:text-amber-400",
    pink: "text-pink-600 dark:text-pink-400",
    slate: "text-slate-600 dark:text-slate-400",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-xl", colors[color])}>
            {icon}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg" title="MESOB Payment Integrated">
            <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            <span>MESOB</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors font-display">{title}</h3>
        <h4 className="text-sm text-slate-500 dark:text-slate-400 font-ethiopic mb-6">{subtitle}</h4>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className={cn("px-2 py-0.5 rounded-md", colors[color])}>{time}</span>
          </div>
          
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <span className="text-slate-400">Digital Readiness</span>
              <span className={textColors[color]}>{digitalReadiness}% Online</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
              <div className={cn("h-1.5 rounded-full transition-all duration-500", progressColors[color])} style={{ width: `${digitalReadiness}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Fee</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{fee}</p>
        </div>
        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}