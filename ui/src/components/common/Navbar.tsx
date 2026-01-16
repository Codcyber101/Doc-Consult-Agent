import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import { Menu, Bell, Search } from 'lucide-react';

interface NavbarProps {
  className?: string;
  user?: {
    name: string;
    imageUrl?: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ className, user }) => {
  return (
    <nav className={cn("sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm-soft", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                  E
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-900 leading-none tracking-tight">GovAssist</span>
                  <span className="text-[10px] font-bold text-emerald-600 leading-tight uppercase tracking-[0.2em]">Ethiopia</span>
                </div>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" active>Dashboard</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/documents">Documents</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center">
              <LanguageSwitcher />
            </div>

            <button className="p-2.5 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all focus:outline-none relative">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-earth rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            {user ? (
               <div className="flex items-center gap-3 pl-2">
                 <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Citizen Account</p>
                 </div>
                 <button className="h-10 w-10 rounded-xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-emerald-700 font-black hover:scale-105 transition-transform hover:shadow-md">
                    {user.name.charAt(0)}
                 </button>
               </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Log in</Button>
                <Button variant="primary" size="sm">Get Started</Button>
              </div>
            )}
            
            <div className="md:hidden flex items-center ml-2">
               <button className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                  <Menu className="h-6 w-6" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => (
  <Link 
    href={href}
    className={cn(
      "px-4 py-2 rounded-xl text-sm font-bold transition-all",
      active 
        ? "text-emerald-700 bg-emerald-50" 
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    )}
  >
    {children}
  </Link>
);
