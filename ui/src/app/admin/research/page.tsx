'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Database, 
  Play, 
  Terminal, 
  CheckCircle2, 
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ResearchLabPage() {
  const [isCrawlActive, setIsCrawlActive] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Policy Research Lab</h1>
        <p className="text-gray-500 mt-2 font-medium text-lg">
          Orchestrate agentic research jobs to discover and draft new policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Configuration Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 text-lg flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              Job Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Research Query</label>
                <input 
                  type="text" 
                  placeholder="e.g. New Investment Proclamation 2025"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Target Domains (Allowlist)</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  {['moti.gov.et', 'eic.gov.et', 'chilot.me'].map((domain) => (
                    <label key={domain} className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-medium text-gray-700">{domain}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setIsCrawlActive(true)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 transition-all"
                >
                  <Play size={18} />
                  <span>Start Research Agent</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <p className="ml-4 text-xs text-amber-800 leading-relaxed font-medium">
              Research Agent will exclusively crawl allowed domains to prevent hallucinations and ensure sovereign data integrity.
            </p>
          </div>
        </div>

        {/* Real-time Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col h-[600px]">
            <div className="bg-slate-800 p-4 px-6 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <Terminal className="text-blue-400" size={18} />
                <span className="text-slate-300 font-mono text-xs font-bold uppercase tracking-widest">Agent Activity Log</span>
              </div>
              {isCrawlActive && (
                <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold animate-pulse">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>AGENT ACTIVE</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-8 font-mono text-sm space-y-4 overflow-auto">
              {!isCrawlActive ? (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  Waiting for job initiation...
                </div>
              ) : (
                <>
                  <div className="text-blue-400">[SYSTEM] Initializing Policy Research Agent v1.2...</div>
                  <div className="text-slate-400">[RESEARCH] Target: Investment Proclamation 2025</div>
                  <div className="text-slate-400">[CRAWL] Scanning chilot.me/archives/invest-2025...</div>
                  <div className="text-green-400">[FOUND] Relevant PDF: Proclamation_1321_2025.pdf (98% confidence)</div>
                  <div className="text-slate-400">[EXTRACT] Parsing Article 12: Business Licensing requirements...</div>
                  <div className="text-slate-400">[RAG] Cross-referencing with Federal Directives...</div>
                  <div className="flex items-center space-x-3 text-white">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    <span>[DRAFT] Building YAML Playbook snippets...</span>
                  </div>
                </>
              )}
            </div>

            {isCrawlActive && (
              <div className="p-6 bg-slate-800 border-t border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                  <span>Job Progress</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-blue-500 transition-all duration-1000" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
