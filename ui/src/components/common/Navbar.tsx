import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Menu, Bell } from 'lucide-react';

interface NavbarProps {
  className?: string;
  user?: {
    name: string;
    imageUrl?: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ className, user }) => {
  return (
    <nav className={cn("sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm-soft", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Placeholder Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  E
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 leading-none">GovAssist</span>
                  <span className="text-[10px] font-medium text-emerald-600 leading-tight uppercase tracking-wider">Ethiopia</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard"
                className="border-emerald-500 text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/services"
                className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Services
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
            </button>
            
            {user ? (
               <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                    {user.name.charAt(0)}
                 </div>
               </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Log in</Button>
                <Button variant="primary" size="sm">Get Started</Button>
              </div>
            )}
            
            <div className="sm:hidden flex items-center">
               <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100">
                  <Menu className="h-6 w-6" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
