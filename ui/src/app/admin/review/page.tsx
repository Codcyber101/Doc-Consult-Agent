'use client';

import React, { useState } from 'react';
import { ReviewCard } from '../../../components/admin/ReviewCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

const MOCK_QUEUE = [
  {
    id: 'doc-101',
    documentType: 'Trade License (Addis)',
    reason: 'Missing Stamp on Page 2',
    submittedAt: '2 hours ago',
    user: 'Abebe Kebede',
    status: 'PENDING'
  },
  {
    id: 'doc-102',
    documentType: 'Birth Certificate',
    reason: 'Low OCR Confidence (0.45)',
    submittedAt: '5 hours ago',
    user: 'Sara Tadesse',
    status: 'PENDING'
  },
  {
    id: 'doc-103',
    documentType: 'Investment Permit',
    reason: 'Complex Clause Detection',
    submittedAt: '1 day ago',
    user: 'Ethio SME Corp',
    status: 'IN_PROGRESS'
  }
] as const;

export default function ReviewQueuePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manual Review Queue</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Verify low-confidence extractions and issue sovereign signatures.
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <RefreshCw size={18} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">Total Pending</p>
          <p className="text-4xl font-extrabold text-gray-900">12</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">In Review</p>
          <p className="text-4xl font-extrabold text-blue-600">4</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">SLA At Risk</p>
          <p className="text-4xl font-extrabold text-red-500">2</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by applicant or document ID..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Queue List */}
      <div className="space-y-4">
        {MOCK_QUEUE.map((item) => (
          <ReviewCard 
            key={item.id} 
            item={item} 
            onClick={(id) => console.log('Open review for:', id)} 
          />
        ))}
      </div>
    </div>
  );
}
