"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Users, 
  Search, 
  ShieldCheck, 
  Settings,
  LayoutDashboard
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Policies', href: '/admin/policies', icon: <FileText size={20} /> },
  { name: 'Review Queue', href: '/admin/review', icon: <Users size={20} /> },
  { name: 'Research Lab', href: '/admin/research', icon: <Search size={20} /> },
  { name: 'Audit Logs', href: '/admin/audit', icon: <ShieldCheck size={20} /> },
];

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col shadow-xl">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <h2 className="text-xl font-bold text-white tracking-tight">GAE Admin</h2>
        </div>
        
        <ul className="space-y-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="pt-6 border-t border-slate-800">
          <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 w-full text-left transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </nav>
      
      <main className="flex-1 overflow-auto">
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}