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
    <Card className="group relative overflow-hidden border-slate-200 hover:border-emerald-500/50 transition-all duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <div className="w-24 h-24 rounded-full bg-gradient-emerald blur-2xl transform translate-x-8 -translate-y-8" />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
               {isOfflineAvailable && (
                 <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                   Offline Capable
                 </span>
               )}
            </div>
        </div>
        <CardTitle className="text-xl group-hover:text-emerald-700 transition-colors">{title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
           <div className="flex items-center gap-2 text-slate-600">
             <Clock className="h-4 w-4 text-emerald-600" />
             <span>{estimatedTime}</span>
           </div>
           <div className="flex items-center gap-2 text-slate-600">
             <span className="font-semibold text-slate-900">{cost}</span>
           </div>
           
           <div className="col-span-2 flex items-center gap-2 mt-2 pt-3 border-t border-slate-100">
              {missingDocsCount > 0 ? (
                 <span className="flex items-center text-amber-600 font-medium">
                   <AlertCircle className="h-4 w-4 mr-1.5" />
                   {missingDocsCount} docs missing
                 </span>
              ) : (
                <span className="flex items-center text-emerald-600 font-medium">
                   <CheckCircle2 className="h-4 w-4 mr-1.5" />
                   Ready to start
                 </span>
              )}
              <span className="text-slate-400 text-xs ml-auto">
                 {requiredDocsCount} documents total
              </span>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button 
           className="w-full bg-slate-900 text-white hover:bg-emerald-700 transition-colors"
           onClick={onStart}
        >
          Begin Process
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
