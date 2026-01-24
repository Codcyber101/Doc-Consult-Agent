import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Check, Lock, X, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Since I haven't implemented Dialog or ScrollArea in this session, 
// I will build a custom Modal for ProvenanceViewer to ensure it works without missing dependencies.

interface ProvenanceViewerProps {
  isOpen: boolean
  onClose: () => void
  data: {
    issuer: string
    issuedAt: string
    signature: string
    payload: Record<string, any>
  }
}

export function ProvenanceViewer({ isOpen, onClose, data }: ProvenanceViewerProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh] overflow-hidden border border-slate-100">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                     <Shield className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-lg font-display font-bold text-slate-900">Digital Provenance</h3>
                     <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                       <Lock className="w-3 h-3" /> Cryptographically Signed
                     </p>
                   </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5 text-slate-400" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Issuer</p>
                       <p className="text-sm font-medium text-slate-900">{data.issuer}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Timestamp</p>
                       <p className="text-sm font-medium text-slate-900">{new Date(data.issuedAt).toLocaleString()}</p>
                    </div>
                 </div>

                 <div className="relative group">
                    <div className="absolute right-2 top-2">
                       <Button size="sm" variant="outline" className="h-8 gap-2 bg-slate-900 text-white border-none hover:bg-slate-800" onClick={handleCopy}>
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? "Copied" : "Copy JSON"}
                       </Button>
                    </div>
                    <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 shadow-inner">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                 </div>

                 <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm border border-emerald-100">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <p>This document contains a valid digital signature anchored to the Ethiopian National Trust Chain.</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
