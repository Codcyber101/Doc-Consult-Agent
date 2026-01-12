'use client';

import React from 'react';
import { CheckCircle2, Clock, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

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
    description: 'Submitted via GAE Portal Connector', 
    timestamp: '2026-01-12 14:00', 
    status: 'COMPLETED',
    source: 'INTERNAL'
  },
  { 
    id: '2', 
    title: 'Document Analysis Passed', 
    description: 'All 3 documents verified with 95%+ confidence', 
    timestamp: '2026-01-12 14:05', 
    status: 'COMPLETED',
    source: 'INTERNAL'
  },
  { 
    id: '3', 
    title: 'Received by MESOB', 
    description: 'Handed over to Ministry of Trade system', 
    timestamp: '2026-01-12 14:10', 
    status: 'COMPLETED',
    source: 'GOVERNMENT'
  },
  { 
    id: '4', 
    title: 'Officer Review', 
    description: 'Assigning to licensing officer in Bole Sub-city', 
    timestamp: 'Pending...', 
    status: 'CURRENT',
    source: 'GOVERNMENT'
  },
  { 
    id: '5', 
    title: 'Final Approval', 
    description: 'Trade license issuance and digital signature', 
    timestamp: 'TBD', 
    status: 'PENDING',
    source: 'GOVERNMENT'
  },
];

export function TrackingTimeline() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-bold text-gray-900">Application Status</h3>
        <div className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold border border-green-100">
          <ShieldCheck className="w-3 h-3 mr-1" />
          VERIFIED BY GAE
        </div>
      </div>

      <div className="space-y-8">
        {MOCK_EVENTS.map((event, index) => (
          <div key={event.id} className="relative flex items-start group">
            {/* Connector Line */}
            {index !== MOCK_EVENTS.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-32px] w-0.5 bg-gray-100 group-hover:bg-blue-100 transition-colors" />
            )}
            
            {/* Status Icon */}
            <div className={`
              z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all
              ${event.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 
                event.status === 'CURRENT' ? 'bg-blue-600 text-white animate-pulse' : 
                'bg-gray-100 text-gray-400'}
            `}>
              {event.status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : 
               event.status === 'CURRENT' ? <Clock className="w-5 h-5" /> : 
               <div className="w-2 h-2 bg-gray-300 rounded-full" />}
            </div>

            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-bold ${event.status === 'PENDING' ? 'text-gray-400' : 'text-gray-900'}`}>
                  {event.title}
                </h4>
                <span className="text-xs font-medium text-gray-400">{event.timestamp}</span>
              </div>
              <p className={`text-sm mt-1 leading-relaxed ${event.status === 'PENDING' ? 'text-gray-300' : 'text-gray-500'}`}>
                {event.description}
              </p>
              
              {event.source === 'GOVERNMENT' && (
                <div className="mt-3 inline-flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100">
                  Government Portal <ExternalLink className="w-2 h-2 ml-1" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
