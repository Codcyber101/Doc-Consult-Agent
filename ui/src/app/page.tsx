'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/common/Navbar';
import { ServiceTile } from '@/components/common/ServiceTile';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { 
  Search, 
  Briefcase, 
  FileText, 
  User, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock User State
  const user = { name: "Abebe Bikila", imageUrl: "..." };

  // Mock Services
  const services = [
    {
      id: 'trade-license',
      title: 'Trade License',
      description: 'Apply for a new trade license, renew existing ones, or update business details.',
      icon: <Briefcase className="h-7 w-7" />,
      isPopular: true,
      href: '/flows/trade-license/step-1'
    },
    {
      id: 'id-renewal',
      title: 'Kebele ID Renewal',
      description: 'Renew your residence ID card online without visiting the woreda office.',
      icon: <User className="h-7 w-7" />,
      href: '/flows/id-renewal'
    },
    {
      id: 'vital-events',
      title: 'Vital Events',
      description: 'Birth, marriage, and death certificates from official civil registry.',
      icon: <FileText className="h-7 w-7" />,
      href: '/flows/vital-events'
    },
    {
      id: 'vehicle-reg',
      title: 'Vehicle Services',
      description: 'Register a new vehicle or transfer ownership titles across regions.',
      icon: <Truck className="h-7 w-7" />,
      href: '/flows/vehicle-reg',
      disabled: true
    }
  ];

  // Mock Activities
  const activities = [
    {
      id: 1,
      title: 'Trade License Renewal',
      status: 'In Review',
      date: 'Dec 12, 2025',
      time: '10:23 AM',
      icon: <Briefcase className="h-4 w-4" />,
      progress: 65
    },
    {
      id: 2,
      title: 'Kebele ID (New Application)',
      status: 'Action Required',
      date: 'Dec 10, 2025',
      time: '02:45 PM',
      icon: <User className="h-4 w-4" />,
      progress: 30,
      urgent: true
    }
  ];

  const stats = [
    { label: 'Active Apps', value: '2', icon: <FileText className="w-4 h-4" /> },
    { label: 'Completed', value: '14', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Saved Time', value: '48h', icon: <Zap className="w-4 h-4" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Header Section */}
          <div className="lg:col-span-12 mb-4">
             <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">Official Portal</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Region: Addis Ababa</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-display">
                    Selam, <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-8">{user.name.split(' ')[0]}</span>.
                  </h1>
                  <p className="mt-6 text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
                    Welcome to your unified government gateway. Start a new service or continue where you left off.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                   {stats.map((stat, i) => (
                     <React.Fragment key={stat.label}>
                       <div className="px-4 py-2 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{stat.label}</p>
                         <div className="flex items-center justify-center gap-1">
                           <span className="text-lg font-black text-slate-900">{stat.value}</span>
                         </div>
                       </div>
                       {i < stats.length - 1 && <div className="w-[1px] h-8 bg-slate-100"></div>}
                     </React.Fragment>
                   ))}
                </div>
             </motion.div>

             <motion.div variants={itemVariants} className="mt-12 relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-14 pr-6 py-5 border-2 border-slate-200 rounded-[1.5rem] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-lg shadow-slate-200/50 text-lg font-medium"
                  placeholder="What can we help you find today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-2 right-2 flex items-center">
                   <Button size="sm" className="h-auto py-3 rounded-2xl bg-slate-900 hover:bg-slate-800">Search</Button>
                </div>
             </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Services Grid */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">Quick Services</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-emerald-600 font-bold group">
                  Explore Directory <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, idx) => (
                  <Link key={service.id} href={service.disabled ? '#' : service.href}>
                    <ServiceTile
                      index={idx}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      isPopular={service.isPopular}
                      disabled={service.disabled}
                    />
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* Banner/Feature Card */}
            <motion.section variants={itemVariants}>
               <div className="bg-emerald-600 rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-200 group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Sparkles className="w-48 h-48" />
                  </div>
                  <div className="relative z-10 max-w-lg">
                    <Badge className="mb-4 bg-emerald-500/30 text-emerald-50 border-emerald-400/30 backdrop-blur-md uppercase tracking-widest font-black">Coming Soon</Badge>
                    <h3 className="text-3xl lg:text-4xl font-black mb-4 font-display leading-tight">Digital Vault for your Documents</h3>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed font-medium">
                      Store your Kebele ID, Passport, and Trade Licenses in one secure, government-verified digital vault. Accessible anywhere, anytime.
                    </p>
                    <Button variant="secondary" size="lg" className="rounded-2xl font-black text-slate-900">
                      Learn More
                    </Button>
                  </div>
               </div>
            </motion.section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Recent Activity */}
            <motion.section variants={itemVariants} className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Active Track</h2>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative group cursor-pointer">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={cn(
                        "p-2.5 rounded-xl shrink-0 transition-colors",
                        activity.urgent ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-black text-slate-900 truncate">{activity.title}</p>
                          <Badge variant={activity.urgent ? 'error' : 'success'} className="text-[9px] px-2">
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                          Last update: {activity.date} • {activity.time}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activity.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn(
                          "h-full rounded-full",
                          activity.urgent ? "bg-red-earth" : "bg-emerald-600"
                        )}
                      />
                    </div>
                    
                    {activity.urgent && (
                      <div className="mt-3 flex items-center gap-2 text-red-600">
                        <span className="text-[10px] font-black uppercase">Required: Upload ID Copy</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-8 rounded-2xl border-2 border-slate-100 text-slate-500 font-black hover:bg-slate-50">
                View All Applications
              </Button>
            </motion.section>

            {/* Support Card */}
            <motion.section variants={itemVariants} className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
               
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <HelpCircle className="w-6 h-6 text-emerald-400" />
                 </div>
                 <h3 className="font-black text-xl mb-3 font-display">Need Assistance?</h3>
                 <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                   Our digital assistants and human support team are ready to guide you.
                 </p>
                 <div className="space-y-3">
                   <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black">
                     Chat with GAE Assistant
                   </Button>
                   <Button variant="ghost" className="w-full text-white hover:bg-white/5 rounded-2xl font-bold">
                     Help Center
                   </Button>
                 </div>
               </div>
            </motion.section>

          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-sm">
                 E
               </div>
               <span className="text-sm font-black text-slate-900 tracking-tight">GovAssist Ethiopia</span>
            </div>
            
            <div className="flex gap-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
               <Link href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
               <Link href="#" className="hover:text-emerald-600 transition-colors">Accessibility</Link>
            </div>
            
            <p className="text-[11px] font-bold text-slate-400">
              © 2026 GAE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}