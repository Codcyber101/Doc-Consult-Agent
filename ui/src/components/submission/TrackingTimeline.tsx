'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ShieldCheck, ExternalLink, ArrowUpRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'CURRENT';
  source: 'INTERNAL' | 'GOVERNMENT';
}

const MOCK_EVENTS: Event[] = [
  { 
    id: '1', 
    title: 'Application Submitted', 
    description: 'Archive successfully transmitted via National Sovereign Gateway.', 
    timestamp: 'Jan 14, 14:00', 
    status: 'COMPLETED',
    source: 'INTERNAL'
  },
  { 
    id: '2', 
    title: 'Sovereign Validation', 
    description: 'Document intelligence pass: 98% confidence score achieved.', 
    timestamp: 'Jan 14, 14:05', 
    status: 'COMPLETED',
    source: 'INTERNAL'
  },
  { 
    id: '3', 
    title: 'MESOB Handover', 
    description: 'Data successfully ingested by Ministry of Trade systems.', 
    timestamp: 'Jan 14, 14:10', 
    status: 'COMPLETED',
    source: 'GOVERNMENT'
  },
  { 
    id: '4', 
    title: 'Official Bureau Review', 
    description: 'Assigned to senior licensing officer in Bole Sub-city.', 
    timestamp: 'In Progress', 
    status: 'CURRENT',
    source: 'GOVERNMENT'
  },
  { 
    id: '5', 
    title: 'Digital License Issuance', 
    description: 'Generation of digitally signed trade license artifact.', 
    timestamp: 'TBD', 
    status: 'PENDING',
    source: 'GOVERNMENT'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export function TrackingTimeline() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-surface p-10 rounded-[2.5rem] border border-gray-100 shadow-sovereign relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Process Registry</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Audit Trail & Status</p>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-sovereign-green/10 text-sovereign-green rounded-full text-[10px] font-black border border-sovereign-green/20 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 mr-2" />
          Sovereign Certified
        </div>
      </div>

      <div className="relative space-y-12">
        {MOCK_EVENTS.map((event, index) => (
          <motion.div key={event.id} variants={item} className="relative flex items-start group">
            {/* Connector Line */}
            {index !== MOCK_EVENTS.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-[-48px] w-0.5 bg-gray-50 group-hover:bg-sovereign-gold/20 transition-colors duration-500" />
            )}
            
            {/* Status Icon */}
            <div className={`
              z-10 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-sm
              ${event.status === 'COMPLETED' ? 'bg-sovereign-green text-white rotate-0' : 
                event.status === 'CURRENT' ? 'bg-sovereign-gold text-white animate-bounce shadow-lg shadow-sovereign-gold/20' : 
                'bg-gray-50 text-gray-300 border border-gray-100'}
            `}>
              {event.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4" /> : 
               event.status === 'CURRENT' ? <Clock className="w-4 h-4" /> : 
               <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />}
            </div>

            {/* Content */}
            <div className="ml-8 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className={`text-base font-black uppercase tracking-tight ${
                  event.status === 'PENDING' ? 'text-gray-300' : 
                  event.status === 'CURRENT' ? 'text-sovereign-gold' : 'text-sovereign-slate'
                }`}>
                  {event.title}
                </h4>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  event.status === 'CURRENT' ? 'text-sovereign-gold' : 'text-gray-400'
                }`}>
                  {event.timestamp}
                </span>
              </div>
              <p className={`text-sm mt-2 leading-relaxed font-medium ${
                event.status === 'PENDING' ? 'text-gray-200' : 'text-gray-500'
              }`}>
                {event.description}
              </p>
              
              {event.source === 'GOVERNMENT' && event.status !== 'PENDING' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 inline-flex items-center gap-2 text-[9px] font-black text-white bg-sovereign-slate px-3 py-1.5 rounded-lg uppercase tracking-[0.15em]"
                >
                  Gov Portal Connector <ArrowUpRight className="w-3 h-3 text-sovereign-gold" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <ShieldCheck size={200} />
      </div>
    </motion.div>
  );
}