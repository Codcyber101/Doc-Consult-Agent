import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Bell, Globe, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavbarProps {
  user?: {
    name: string
    imageUrl?: string
  }
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                <Shield className="w-5 h-5 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-soft"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-slate-900 tracking-tight">
                  GovAssist
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Ethiopia
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
             <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
               Services
             </Link>
             <Link href="/track" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
               Track Application
             </Link>
             <Link href="/vault" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
               Document Vault
             </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
               <Globe className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-earth rounded-full border border-white"></span>
            </Button>
            
            {user ? (
               <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="text-right hidden lg:block">
                     <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                     <p className="text-xs text-slate-500">Citizen ID: 998-22</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-muted border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                     {user.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                     ) : (
                        <User className="w-5 h-5 text-slate-400" />
                     )}
                  </div>
               </div>
            ) : (
               <Button className="bg-slate-900 text-white hover:bg-primary">
                 Sign In
               </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
         {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-surface border-b border-border overflow-hidden"
            >
               <div className="px-4 py-6 space-y-4">
                  <Link href="/services" className="block text-lg font-medium text-slate-900">Services</Link>
                  <Link href="/track" className="block text-lg font-medium text-slate-900">Track Application</Link>
                  <Link href="/vault" className="block text-lg font-medium text-slate-900">Document Vault</Link>
                  <div className="pt-4 border-t border-border flex items-center gap-4">
                     <Button variant="outline" className="w-full justify-center">English</Button>
                     <Button className="w-full justify-center bg-slate-900 text-white">Sign In</Button>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </nav>
  )
}
