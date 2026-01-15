import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ServiceTile } from '@/components/common/ServiceTile';
import { ActivityItem } from '@/components/common/ActivityItem';
import { Navbar } from '@/components/common/Navbar';
import { 
  Briefcase, 
  FileText, 
  Search, 
  ShieldCheck, 
  History 
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation Bar */}
      <Navbar user={{ name: "Yared Abebe" }} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Background Pattern - Subtle Sovereign Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#006B3F 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="success" className="mb-6 shadow-sm">Official Pilot Phase</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display mb-6">
              Government services, <br className="hidden sm:block" />
              <span className="text-emerald-600 inline-block relative">
                simplified.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold-400 opacity-40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto">
              Prepare, validate, and submit your official documents with confidence. 
              Step-by-step guidance for trade licenses, passports, and more.
            </p>
            
            {/* Quick Search */}
            <div className="relative max-w-md mx-auto shadow-xl-soft rounded-2xl group focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-4 py-4 border-none rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 text-base shadow-sm" 
                placeholder="What do you need help with today?" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Left Column: Start New Service */}
          <div className="lg:col-span-2 space-y-6 animate-in slide-in-from-left-4 duration-700 delay-150">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 font-display">Start a New Service</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/flows/trade-license" className="block w-full">
                <ServiceTile 
                  title="Renew Trade License" 
                  description="For sole proprietors and PLCs in Addis Ababa."
                  icon={<Briefcase className="w-6 h-6 text-emerald-600" />}
                  isPopular
                />
              </Link>
              
              <Link href="/flows/passport" className="block w-full">
                <ServiceTile 
                  title="New Passport Application" 
                  description="Document preparation for first-time applicants."
                  icon={<FileText className="w-6 h-6 text-blue-600" />}
                />
              </Link>
              
              <ServiceTile 
                title="VAT Registration" 
                description="Coming soon to GovAssist."
                icon={<ShieldCheck className="w-6 h-6 text-slate-400" />}
                disabled
              />
            </div>
          </div>

          {/* Right Column: My Activities */}
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-700 delay-300">
            <h2 className="text-xl font-bold text-slate-900 font-display">Recent Activity</h2>
            <Card className="overflow-hidden border-slate-200/60 shadow-lg-soft">
              <div className="divide-y divide-slate-100">
                <ActivityItem 
                  title="Trade License Renewal" 
                  status="Ready to Submit" 
                  date="Today" 
                  variant="success"
                />
                <ActivityItem 
                  title="Bole Sub-city Clearance" 
                  status="In Review" 
                  date="Yesterday" 
                  variant="warning"
                />
                <ActivityItem 
                  title="TIN Verification" 
                  status="Action Required" 
                  date="Jan 12" 
                  variant="error"
                />
              </div>
              <div className="p-2 bg-slate-50 border-t border-slate-100">
                <Button variant="ghost" size="sm" className="w-full text-slate-500 hover:text-emerald-700 justify-between group">
                  View Full History <History className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>

    </main>
  );
}