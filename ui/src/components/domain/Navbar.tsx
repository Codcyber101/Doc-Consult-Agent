// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, Globe, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarProps {
  user?: {
    name: string;
    imageUrl?: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur border-b border-border">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full border-2 border-foreground/15 bg-surface flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-foreground" />
                <div className="absolute inset-0 rounded-full ring-1 ring-foreground/10" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-foreground tracking-tight">GovAssist</span>
                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-muted">Ethiopia</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-xs font-bold uppercase tracking-[0.28em] text-foreground/70 hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/track" className="text-xs font-bold uppercase tracking-[0.28em] text-foreground/70 hover:text-foreground transition-colors">
              Track Application
            </Link>
            <Link href="/vault" className="text-xs font-bold uppercase tracking-[0.28em] text-foreground/70 hover:text-foreground transition-colors">
              Document Vault
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground border border-border rounded-full">
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground border border-border rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border border-surface"></span>
            </Button>

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-foreground leading-none">{user.name}</p>
                  <p className="text-xs text-muted">Citizen ID: 998-22</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-muted border border-border shadow-sm flex items-center justify-center overflow-hidden">
                  {user.imageUrl ? (
                    <Image src={user.imageUrl} alt={user.name} fill sizes="40px" className="object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-muted" />
                  )}
                </div>
              </div>
            ) : (
              <Button className="bg-foreground text-surface hover:opacity-90">Sign In</Button>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link href="/services" className="block text-sm font-bold uppercase tracking-[0.28em] text-foreground">
                Services
              </Link>
              <Link href="/track" className="block text-sm font-bold uppercase tracking-[0.28em] text-foreground">
                Track Application
              </Link>
              <Link href="/vault" className="block text-sm font-bold uppercase tracking-[0.28em] text-foreground">
                Document Vault
              </Link>
              <div className="pt-4 border-t border-border flex items-center gap-4">
                <Button variant="outline" className="w-full justify-center">English</Button>
                <Button className="w-full justify-center bg-foreground text-surface">Sign In</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
