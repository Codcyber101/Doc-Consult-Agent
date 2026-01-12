'use client';

import React, { useState } from 'react';
import { 
  FileCode, 
  History, 
  Plus, 
  Search, 
  ChevronRight,
  MoreVertical,
  Globe,
  MapPin,
  PlayCircle
} from 'lucide-react';

const MOCK_POLICIES = [
  { id: 'p1', name: 'trade-license.yaml', jurisdiction: 'Addis Ababa / Bole', version: 'v2.4.0', updatedAt: 'Oct 12, 2025' },
  { id: 'p2', name: 'passport-renewal.yaml', jurisdiction: 'Federal / Immigration', version: 'v1.1.2', updatedAt: 'Jan 05, 2026' },
  { id: 'p3', name: 'investment-permit.yaml', jurisdiction: 'Federal / EIC', version: 'v3.0.1', updatedAt: 'Dec 20, 2025' },
];

export default function PolicyListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-white dark:text-gray-900">Policy Registry</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Manage procedural playbooks and deterministic compliance rules.
          </p>
        </div>
        <button className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
          <Plus size={20} />
          <span>New Playbook</span>
        </button>
      </div>

      {/* Registry Browser */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search registry..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500"><History size={20} /></button>
            <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500"><MoreVertical size={20} /></button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-5">Playbook Name</th>
              <th className="px-8 py-5">Jurisdiction</th>
              <th className="px-8 py-5">Active Version</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_POLICIES.map((policy) => (
              <tr key={policy.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FileCode size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{policy.name}</p>
                      <p className="text-xs text-gray-400 font-medium">Updated {policy.updatedAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center text-sm text-gray-600 font-medium">
                    <MapPin size={14} className="mr-2 text-gray-400" />
                    {policy.jurisdiction}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                    {policy.version}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <PlayCircle size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
