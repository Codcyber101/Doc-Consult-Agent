"use client";

import React, { useState } from "react";
import { 
  Gavel, 
  HelpCircle, 
  ChevronDown, 
  ExternalLink, 
  Image as ImageIcon, 
  ZoomIn, 
  Lightbulb, 
  MessageCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function GuidanceSidebar() {
  const [openSection, setOpenSection] = useState<string | null>("plain-language");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="w-full md:w-[420px] bg-surface/50 dark:bg-slate-900/50 backdrop-blur-xl border-l border-border/60 dark:border-slate-800/50 flex flex-col h-full shadow-2xl shadow-slate-200/50 dark:shadow-black/50 z-20 overflow-hidden relative">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-6 border-b border-border/60 dark:border-slate-800/50 bg-surface/40 dark:bg-slate-900/40 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-primary/10 dark:bg-blue-900/30 rounded-full">
            <Gavel className="w-4 h-4 text-primary dark:text-blue-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 font-display">
            Step 3: Identification
          </span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight font-display">
          Guidance & Law
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        
        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {/* Plain Language Guide */}
          <div className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-sm overflow-hidden group">
            <button
              onClick={() => toggleSection("plain-language")}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-muted dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-slate-900 dark:text-white text-sm font-bold font-display">Plain Language Guide</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-ethiopic">ማብራሪያ (Explanation)</span>
              </div>
              <ChevronDown 
                className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === "plain-language" && "rotate-180")} 
              />
            </button>
            <AnimatePresence>
              {openSection === "plain-language" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 border-t border-border/60 dark:border-slate-800/50">
                    <h4 className="text-primary dark:text-blue-400 font-bold text-sm mb-2 font-ethiopic">
                      ይህ መረጃ ለምን አስፈለገ?
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 font-ethiopic">
                      መንግስት ህጋዊ አገልግሎት ለመስጠት ማንነትዎን ማረጋገጥ አለበት። ይህ የማጭበርበር ወንጀልን ለመከላከል ይረዳል።
                    </p>
                    <div className="relative pl-3 border-l-2 border-primary/20">
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic">
                        Identity verification is required to prevent fraud and ensure service delivery to the correct individual. We cross-reference this with the National ID database.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legal Context */}
          <div className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-sm overflow-hidden group">
            <button
              onClick={() => toggleSection("legal-context")}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-muted dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-slate-900 dark:text-white text-sm font-bold font-display">Legal Context</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">Relevant Proclamations</span>
              </div>
              <ChevronDown 
                className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === "legal-context" && "rotate-180")} 
              />
            </button>
            <AnimatePresence>
              {openSection === "legal-context" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 border-t border-border/60 dark:border-slate-800/50">
                    <ul className="space-y-4">
                      <li className="flex flex-col gap-1">
                        <span className="text-slate-900 dark:text-white text-sm font-medium">Proclamation No. 980/2016</span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs">Article 14(2) - Authentication of Documents</span>
                        <a href="#" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-bold mt-1 group/link">
                          Read Full Text 
                          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      </li>
                      <div className="h-px bg-border dark:bg-slate-800 w-full" />
                      <li className="flex flex-col gap-1">
                        <span className="text-slate-900 dark:text-white text-sm font-medium">Regulation No. 421/2018</span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs">Section 5 - Digital Signatures</span>
                        <a href="#" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-bold mt-1 group/link">
                          Read Full Text 
                          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Document Examples */}
        <div>
          <h3 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 px-1">
            <ImageIcon className="w-4 h-4 text-slate-400" />
            Document Examples
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <DocumentExampleCard 
              title="Kebele ID Card" 
              subtitle="Locate 'Issue Date'"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBkrov0r5nRcAnE0Ld3IKGgzXYsM5S4d2OEx3yY2LGvWB1laQj4kk2FZSC7kuq7vmqBD_40Uv_KXLxJd1mzZunTTdQ8v-FWW3Zq4SBqVaR_mM2-0BKWP2DyX1H0YqiOxTuDilhs1wxnvPCR0DhuFOX-4mJ_s8DzTqNNfFi-xcfd1vkJ2tqkqVB46YJb1n4qoM5vY3vlZ87uH_oAjfiremF064cXxb49ifaF3WmQ77rll-ksnpO6DdQL31TC8CoHx7aZzkP6dwvr2w"
            />
            <DocumentExampleCard 
              title="Land Lease" 
              subtitle="Identify 'Stamp'"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDDnzjlh3I4Kz1xrAWlSHa1d2MhgqrOeo_YL7_PsBB1rweVseGRJzBpzq9kMswXPvEswnNJvZkNXc1EJSL7nP4vIC01TnECxP8oPF68SjWOGCSGo0vAX2-097Muy4wxBr3xUIP6LHDDKmnQ3pc3gzIKfTLF2XWoMJb4OOD8UBb_7Lqlz-NH-T7p8QGIEYf7SH1r_CGBib51LjkdbT_Ray_r8zxo8OqukPSNkEEine4-lbKOMzHejTcGwkQFNNvD0_Wii1mMXTzROw"
            />
            <DocumentExampleCard 
              title="Tax Clearance" 
              subtitle="Valid signature area"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuA1oczAjZVEDqBaBgDCCvhY6owhrNe2TkD7SBuiGENQOyg-qKX-xoMb1Ja3HF7FNGKRzaX_PMI67KmfReGpiH4374vtGzgTqF-NiQ9ueaV-LM0nG4_ue7XdxA7Vyf20suiWrLxluyz6r9yM7oCqdiIPpVjG_MHGR4PevT7nI4iexLJ4hzWy_xRXJhJdz2mhczOAWeCJ99h1NOKIPbgbEO0qkzp8Yr9-0CqM5KtvEOig0OUgdpViNe1fagyvDTCUGc4-dW9vBZiHbA"
            />
          </div>
        </div>

        {/* Quick Tip */}
        <div className="bg-primary/10 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800/30 rounded-xl p-5 flex gap-4 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent -mr-4 -mt-4 rounded-full blur-xl" />
          <Lightbulb className="w-5 h-5 text-primary dark:text-blue-400 shrink-0 mt-0.5 relative z-10" />
          <div className="relative z-10">
            <h5 className="text-slate-900 dark:text-blue-200 text-sm font-bold mb-1">Quick Tip</h5>
            <p className="text-slate-700/80 dark:text-blue-300/80 text-sm leading-relaxed">
              Ensure all uploaded documents are scanned in color and edges are clearly visible.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border/60 dark:border-slate-800/50 bg-surface/40 dark:bg-slate-900/40 backdrop-blur-md">
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-surface dark:hover:bg-surface-muted text-white dark:text-slate-900 gap-2 shadow-lg shadow-slate-200/50 dark:shadow-black/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
          <MessageCircle className="w-5 h-5" />
          <span className="truncate text-sm font-bold tracking-wide">Contact Support</span>
        </button>
        <p className="text-center text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-4 font-medium">GovAssist Ethiopia © 2024</p>
      </div>
    </aside>
  );
}

function DocumentExampleCard({ title, subtitle, image }: { title: string, subtitle: string, image: string }) {
  return (
    <button className="group flex flex-col gap-2 text-left focus:outline-none rounded-xl p-1 transition-all hover:bg-surface-muted dark:hover:bg-slate-800/50">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border dark:border-slate-700 shadow-sm group-hover:shadow-md transition-all">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ZoomIn className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="px-1">
        <p className="text-slate-900 dark:text-white text-xs font-bold leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{title}</p>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}
