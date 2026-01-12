'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  FileText, 
  Globe, 
  ShieldCheck, 
  Search,
  ArrowRight
} from 'lucide-react';

const SERVICES = [
  {
    id: 'trade-license',
    title: 'Trade License',
    description: 'Renew or apply for new business trade licenses across all sub-cities.',
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    href: '/flows/trade-license',
    color: 'bg-blue-50'
  },
  {
    id: 'passport',
    title: 'Passport Services',
    description: 'Apply for new passports, renewals, or track existing applications.',
    icon: <Globe className="w-8 h-8 text-green-600" />,
    href: '/flows/passport',
    color: 'bg-green-50'
  },
  {
    id: 'tin',
    title: 'TIN Registration',
    description: 'Register for Taxpayer Identification Number for individuals or businesses.',
    icon: <FileText className="w-8 h-8 text-amber-600" />,
    href: '/flows/tin',
    color: 'bg-amber-50'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-blue-600">GovAssist Ethiopia</span>
              <span className="block">Digital Government, Simplified.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Sovereign, secure, and accessible procedural guidance for all government services. 
              Powered by automated document intelligence.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                  placeholder="What service do you need today? (e.g. 'Trade License')"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Popular Services</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
            View All Services <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link 
              key={service.id} 
              href={service.href}
              className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                Start Application <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <ShieldCheck className="w-10 h-10 text-blue-600 mt-1" />
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Sovereign & Secure</h4>
                <p className="text-sm text-gray-500">Your data never leaves Ethiopia. Processed on local sovereign infrastructure.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="w-10 h-10 text-blue-600 mt-1" />
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Offline-First</h4>
                <p className="text-sm text-gray-500">Continue your application even without internet. Sync automatically later.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Search className="w-10 h-10 text-blue-600 mt-1" />
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Smart Analysis</h4>
                <p className="text-sm text-gray-500">Real-time feedback on your documents before you submit to government.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
