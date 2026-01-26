import * as React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, FileText, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface ReadinessItem {
  id: string
  label: string
  status: "ready" | "missing" | "invalid"
  fixActionLabel?: string
}

export interface ReadinessPanelProps {
  score: number // 0 to 100
  items: ReadinessItem[]
  onFixItem?: (id: string) => void
}

export function ReadinessPanel({ score, items, onFixItem }: ReadinessPanelProps) {
  const isReady = score >= 100
  
  // Donut chart logic (simplified for SVG)
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-lg-soft overflow-hidden">
       <CardHeader className="pb-2 border-b border-black/5">
         <CardTitle className="flex items-center justify-between font-display text-ink">
            <span>Readiness Check</span>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm border-2 transform -rotate-2",
              isReady 
                ? "bg-blue-50 text-blue-700 border-blue-700/20" 
                : "bg-amber-50 text-amber-700 border-amber-700/20"
            )}>
               {isReady ? "Certified Ready" : "Incomplete"}
            </span>
         </CardTitle>
       </CardHeader>
       <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
             
             {/* Score Visualization */}
             <div className="relative flex-shrink-0 w-36 h-36 flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-100">
                 <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56" cy="56" r={radius}
                      stroke="currentColor" strokeWidth="6"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="56" cy="56" r={radius}
                      stroke="currentColor" strokeWidth="6"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      className={cn(
                        score < 50 ? "text-red-500" : score < 100 ? "text-amber-500" : "text-primary"
                      )}
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black font-display text-slate-900 tracking-tighter">{score}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status</span>
                 </div>
             </div>

             {/* Items List */}
             <div className="flex-1 w-full space-y-3">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors",
                      item.status === 'missing' ? "bg-red-50/30 border-red-200/50 hover:bg-red-50/50" : 
                      item.status === 'invalid' ? "bg-amber-50/30 border-amber-200/50 hover:bg-amber-50/50" :
                      "bg-blue-50/10 border-slate-100 hover:bg-white"
                    )}
                  >
                     <div className="flex items-center gap-3">
                        {item.status === 'ready' ? (
                           <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                               <CheckCircle className="h-4 w-4 text-blue-700" />
                           </div>
                        ) : (
                           <AlertTriangle className={cn(
                             "h-5 w-5",
                             item.status === 'missing' ? "text-red-500" : "text-amber-500"
                           )} />
                        )}
                        <span className={cn(
                          "text-sm font-medium",
                          item.status === 'ready' ? "text-slate-500 line-through decoration-slate-300" : "text-slate-900"
                        )}>
                          {item.label}
                        </span>
                     </div>
                     
                     {item.status !== 'ready' && (
                        <Button 
                          size="sm" 
                          variant={item.status === 'missing' ? "destructive" : "secondary"}
                          className={cn(
                             "h-8 text-xs font-semibold shadow-sm",
                             item.status === 'missing' ? "bg-red-500 hover:bg-red-600" : "bg-amber-400 hover:bg-amber-500 text-black"
                          )}
                          onClick={() => onFixItem?.(item.id)}
                        >
                          {item.fixActionLabel || "Fix Issue"}
                        </Button>
                     )}
                  </motion.div>
                ))}
             </div>
          </div>
       </CardContent>
    </Card>
  )
}
