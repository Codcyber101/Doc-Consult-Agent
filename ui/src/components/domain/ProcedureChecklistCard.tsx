import * as React from "react"
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ProcedureChecklistCardProps {
  title: string
  description: string
  estimatedTime: string
  cost: string
  isOfflineAvailable?: boolean
  requiredDocsCount: number
  missingDocsCount?: number
  onStart?: () => void
}

export function ProcedureChecklistCard({
  title,
  description,
  estimatedTime,
  cost,
  isOfflineAvailable = false,
  requiredDocsCount,
  missingDocsCount = 0,
  onStart,
}: ProcedureChecklistCardProps) {
  return (
    <Card className="group relative overflow-hidden border-slate-200 hover:border-primary/50 transition-all duration-300 rounded-3xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <div className="w-24 h-24 rounded-full bg-primary blur-2xl transform translate-x-8 -translate-y-8" />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
               {isOfflineAvailable && (
                 <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                   Offline Capable
                 </span>
               )}
            </div>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors font-display">{title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1 font-body">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
             <Clock className="h-4 w-4 text-primary" />
             <span className="font-medium">{estimatedTime}</span>
           </div>
           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
             <span className="font-bold text-slate-900 dark:text-white">{cost}</span>
           </div>
           
           <div className="col-span-2 flex items-center gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              {missingDocsCount > 0 ? (
                 <span className="flex items-center text-amber-600 font-bold">
                   <AlertCircle className="h-4 w-4 mr-1.5" />
                   {missingDocsCount} docs missing
                 </span>
              ) : (
                <span className="flex items-center text-primary font-bold">
                   <CheckCircle2 className="h-4 w-4 mr-1.5" />
                   Ready to start
                 </span>
              )}
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-auto">
                 {requiredDocsCount} documents
              </span>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button 
           className="w-full bg-slate-900 dark:bg-primary text-white hover:bg-primary dark:hover:bg-primary-dark transition-all font-bold h-11 rounded-xl shadow-lg shadow-black/10 hover:shadow-primary/20"
           onClick={onStart}
        >
          Begin Process
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
