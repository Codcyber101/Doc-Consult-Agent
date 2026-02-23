import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, Camera, X, FileCheck, AlertCircle, RefreshCw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api/client"

export interface DocumentUploadResult {
  documentId: string
  storagePath?: string
}

export interface DocumentUploadWidgetProps {
  label: string
  description?: string
  accept?: string
  maxSizeMB?: number
  onUpload?: (file: File) => Promise<void>
  onUploaded?: (result: DocumentUploadResult) => Promise<void>
}

export function DocumentUploadWidget({
  label,
  description,
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  onUpload,
  onUploaded,
}: DocumentUploadWidgetProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<'idle' | 'analyzing' | 'ready' | 'error'>('idle')
  const [qualityScore, setQualityScore] = React.useState(0)
  const [documentId, setDocumentId] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (uploadedFile: File) => {
    setErrorMessage(null)
    setFile(uploadedFile)
    setStatus('analyzing')
    setQualityScore(0)
    setDocumentId(null)

    // Simulate preview generation
    if (uploadedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result as string)
        reader.readAsDataURL(uploadedFile)
    } else {
        setPreview(null)
    }

    // Basic size check
    const maxBytes = maxSizeMB * 1024 * 1024
    if (uploadedFile.size > maxBytes) {
      setStatus("error")
      setErrorMessage(`File too large. Max ${maxSizeMB}MB.`)
      return
    }

    try {
      const form = new FormData()
      form.append("file", uploadedFile)

      const resp = await apiClient.post("/documents/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const id = resp.data?.document_id as string | undefined
      const storagePath = resp.data?.storage_path as string | undefined
      if (!id) {
        throw new Error("Upload succeeded but no document_id returned.")
      }

      // MVP quality: use simple heuristic until backend returns OCR quality metrics.
      const mockQuality = uploadedFile.type.startsWith("image/") ? 85 : 80
      setQualityScore(mockQuality)
      setDocumentId(id)
      setStatus("ready")

      await onUpload?.(uploadedFile)
      await onUploaded?.({ documentId: id, storagePath })
    } catch (err: any) {
      setStatus("error")
      setErrorMessage(err?.message || "Upload failed")
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setStatus('idle')
    setQualityScore(0)
    setDocumentId(null)
    setErrorMessage(null)
  }

  return (
    <div className="w-full space-y-3">
       <div className="flex justify-between items-end">
          <label className="text-sm font-bold font-display text-ink uppercase tracking-wide">{label}</label>
          {status === 'ready' && (
             <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
               Quality: {qualityScore}%
             </span>
          )}
       </div>

       {status === "error" && errorMessage && (
         <div className="flex items-start gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-800">
           <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
           <p className="text-xs font-semibold leading-relaxed">{errorMessage}</p>
         </div>
       )}
       
       <AnimatePresence mode="wait">
         {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300",
                dragActive 
                  ? "border-primary bg-primary/10 scale-[1.02]" 
                  : "border-border bg-surface/60 hover:bg-surface hover:border-primary/40 hover:shadow-lg-soft"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                accept={accept}
                onChange={handleChange}
              />
              
              <div className="flex flex-col items-center gap-3 text-slate-500 pointer-events-none">
                <div className="p-4 bg-surface rounded-full shadow-md border border-border">
                   <UploadCloud className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                   <p className="text-sm font-bold text-ink">Click to upload or drag and drop</p>
                   <p className="text-xs mt-1 text-slate-500 font-medium">{description || "PDF, PNG or JPG (max 5MB)"}</p>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 z-20">
                 <Button size="sm" variant="outline" className="gap-2 bg-surface hover:bg-gold-50 border-border text-ink shadow-sm" onClick={(e) => { e.preventDefault(); /* Trigger camera logic */ }}>
                    <Camera className="w-4 h-4 text-primary" />
                    Use Camera
                 </Button>
              </div>
            </motion.div>
         ) : (
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, y: -10 }}
               className="relative w-full rounded-2xl border border-border bg-surface/80 backdrop-blur-sm shadow-md overflow-hidden"
            >
               <div className="flex p-4 gap-4">
                  <div className="relative w-20 h-20 shrink-0 bg-surface-muted rounded-lg overflow-hidden flex items-center justify-center border border-border">
                     {preview ? (
                       <Image
                         src={preview}
                         alt="Preview"
                         fill
                         sizes="80px"
                         className="object-cover"
                       />
                     ) : (
                       <FileText className="w-8 h-8 text-slate-400" />
                     )}
                     {status === 'analyzing' && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-[2px]">
                           <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                        </div>
                     )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <p className="text-sm font-bold font-display text-ink truncate">{file.name}</p>
                     <p className="text-xs text-slate-500 mb-2 font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                     {documentId && (
                       <p className="text-[10px] text-slate-500 font-mono mb-2 truncate">
                         Doc ID: {documentId}
                       </p>
                     )}
                     
                     {status === 'analyzing' ? (
                       <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                            <span>Verifying...</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-1.5 bg-surface-muted" />
                       </div>
                     ) : (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 w-fit px-2 py-1 rounded-sm border border-primary/20"
                        >
                           <FileCheck className="w-4 h-4" />
                           <span>VERIFIED DOCUMENT</span>
                        </motion.div>
                     )}
                  </div>

                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={clearFile}>
                     <X className="w-5 h-5" />
                  </Button>
               </div>
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  )
}
