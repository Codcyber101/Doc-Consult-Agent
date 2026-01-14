'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Globe, 
  ShieldCheck, 
  Search,
  ArrowRight,
  Shield,
  Clock,
  Zap
} from 'lucide-react';

const SERVICES = [
  {
    id: 'trade-license',
    title: 'Trade License',
    amharic: 'የንግድ ፈቃድ',
    description: 'Renew or apply for new business trade licenses across all sub-cities.',
    icon: <Briefcase className="w-6 h-6" />,
    href: '/flows/trade-license',
    status: 'Ready'
  },
  {
    id: 'passport',
    title: 'Passport Services',
    amharic: 'ፓስፖርት አገልግሎት',
    description: 'Apply for new passports, renewals, or track existing applications.',
    icon: <Globe className="w-6 h-6" />,
    href: '/flows/passport',
    status: 'Draft'
  },
  {
    id: 'tin',
    title: 'TIN Registration',
    amharic: 'የታክስ ከፋይ መለያ ቁጥር',
    description: 'Register for Taxpayer Identification Number for individuals or businesses.',
    icon: <FileText className="w-6 h-6" />,
    href: '/flows/tin',
    status: 'Ready'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen selection:bg-sovereign-gold selection:text-white">
      {/* Background Texture */}
      <div className="fixed inset-0 ethio-pattern opacity-30 -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sovereign-green rounded-xl flex items-center justify-center">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">GovAssist <span className="text-sovereign-green">Ethiopia</span></span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-sm font-semibold hover:text-sovereign-green transition-colors">Admin Portal</Link>
            <button className="bg-sovereign-slate text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sovereign-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sovereign-green"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Sovereign Service Portal</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
                Government <br/>
                <span className="text-sovereign-green italic">Digitalized.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                Efficient, secure, and accessible procedural guidance for all Ethiopian government services. 
                Powered by sovereign-first document intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="relative group flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-sovereign-green transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-14 pr-5 py-5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sovereign-green focus:border-sovereign-green outline-none transition-all shadow-sovereign text-lg"
                    placeholder="Search for a service..."
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square bg-sovereign-green/5 rounded-[4rem] relative overflow-hidden flex items-center justify-center border border-sovereign-green/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-3 bg-gray-100 rounded-full" />
                    <div className="w-8 h-8 bg-sovereign-gold/20 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-50 rounded-full w-full" />
                    <div className="h-4 bg-gray-50 rounded-full w-5/6" />
                    <div className="h-4 bg-gray-50 rounded-full w-4/6" />
                  </div>
                  <div className="mt-12 pt-8 border-t border-gray-50 flex gap-4">
                    <div className="w-10 h-10 bg-sovereign-green/10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-gray-100 rounded-full w-1/3" />
                      <div className="h-2 bg-gray-50 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
                {/* Abstract Motifs */}
                <div className="absolute top-10 right-10 w-24 h-24 border-4 border-sovereign-gold/20 rounded-full" />
                <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-sovereign-green/10 rounded-3xl rotate-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold text-sovereign-green uppercase tracking-[0.2em] mb-4">Service Directory</h2>
              <h3 className="text-4xl font-extrabold tracking-tight">Select your application flow</h3>
            </div>
            <button className="flex items-center gap-2 text-sovereign-slate font-bold hover:gap-4 transition-all">
              Browse All Services <ArrowRight className="w-5 h-5 text-sovereign-gold" />
            </button>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={item}>
                <Link 
                  href={service.href}
                  className="group block h-full bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-sovereign-green transition-all duration-500 hover:shadow-2xl hover:shadow-sovereign-green/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="text-6xl font-black">{service.id === 'trade-license' ? '01' : service.id === 'passport' ? '02' : '03'}</span>
                  </div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-sovereign-sand flex items-center justify-center text-sovereign-green mb-8 group-hover:bg-sovereign-green group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-bold text-sovereign-gold uppercase tracking-wider block mb-1">{service.amharic}</span>
                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-sovereign-green transition-colors">{service.title}</h4>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed mb-10 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${service.status === 'Ready' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                      {service.status}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-sovereign-slate group-hover:border-sovereign-slate transition-all">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sovereign-gold/10 flex items-center justify-center text-sovereign-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold mb-3">Sovereign & Secure</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your data remains within national boundaries. Processed on local sovereign infrastructure with Zero-Trust security.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sovereign-green/10 flex items-center justify-center text-sovereign-green">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold mb-3">Offline-First</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Complete your application even with intermittent connectivity. Automatic sync when you're back online.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sovereign-slate/10 flex items-center justify-center text-sovereign-slate">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold mb-3">Real-time Analysis</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Instant feedback on document validity and completeness before submission to avoid rejections.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sovereign-slate text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-8">
              <Shield className="text-sovereign-green w-8 h-8" />
              <span className="font-bold text-2xl tracking-tighter uppercase">GovAssist</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Empowering Ethiopian citizens through digital sovereignty and intelligent procedural automation.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Facebook'].map(s => (
                <button key={s} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-sovereign-green transition-colors">
                  <span className="sr-only">{s}</span>
                  <div className="w-4 h-4 bg-gray-600 rounded-sm" />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h6 className="font-bold mb-6 text-sovereign-gold uppercase text-[10px] tracking-widest">Platform</h6>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-6 text-sovereign-gold uppercase text-[10px] tracking-widest">Legal</h6>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Data Residency</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500">© 2026 GovAssist Ethiopia. All rights reserved.</span>
          <div className="flex gap-8 text-xs text-gray-500">
            <span>Powered by National Data Center</span>
            <span>v1.0.4-production</span>
          </div>
        </div>
      </footer>
    </div>
  );
}