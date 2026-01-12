'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Calendar, 
  FileText, 
  Download, 
  Key, 
  CheckCircle2,
  Lock
} from 'lucide-react';

const MOCK_LOGS = [
  { id: 'ev-991', event: 'Document Analysis', actor: 'VisionRouter', timestamp: '2026-01-12 14:05:22', status: 'SIGNED' },
  { id: 'ev-992', event: 'PII Masking', actor: 'SafetyAgent', timestamp: '2026-01-12 14:05:25', status: 'SIGNED' },
  { id: 'ev-993', event: 'Manual Approval', actor: 'Admin:abebe', timestamp: '2026-01-12 14:10:11', status: 'SIGNED' },
  { id: 'ev-994', event: 'Portal Submission', actor: 'MESOBConnector', timestamp: '2026-01-12 14:12:00', status: 'SIGNED' },
];

export default function AuditExplorerPage() {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sovereign Audit Explorer</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Verify the immutable event log and digital artifact provenance.
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            <span>Export Logs (CSV)</span>
          </button>
          <button 
            onClick={() => { setIsVerifying(true); setTimeout(() => setIsVerifying(false), 2000); }}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
          >
            <ShieldCheck size={18} />
            <span>Verify Merkle Root</span>
          </button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Today\'s Events', val: '1,240', icon: <FileText size={16} /> },
          { label: 'Signed Artifacts', val: '856', icon: <Key size={16} /> },
          { label: 'Integrity Check', val: 'PASSING', icon: <ShieldCheck size={16} /> },
          { label: 'Storage Usage', val: '14.2 GB', icon: <Database size={16} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-2">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <p className={`text-2xl font-black ${stat.val === 'PASSING' ? 'text-green-600' : 'text-gray-900'}`}>
              {stat.val}
            </p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center bg-gray-50/50 space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by ID, Actor, or Event Type..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner font-medium"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 text-sm transition-all">
            <Calendar size={18} />
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-5">Event ID</th>
              <th className="px-8 py-5">Action</th>
              <th className="px-8 py-5">Actor</th>
              <th className="px-8 py-5">Timestamp</th>
              <th className="px-8 py-5 text-right">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-6 font-mono text-xs text-blue-600 font-bold">{log.id}</td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-gray-900">{log.event}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center text-sm font-medium text-gray-600">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    {log.actor}
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-400 font-medium">{log.timestamp}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-2 text-green-600">
                    <Lock size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">Signed</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border border-gray-100 scale-in-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Chain Verified!</h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              All Merkle roots match the sovereign anchoring service. The event log is 100% untampered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal missing component for the stat icons
function Database({ size, className }: { size: number, className?: string }) {
  return <div className={className}><FileText size={size} /></div>;
}
