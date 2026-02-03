'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  FileText, 
  Eye, 
  Download, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Navbar } from '@/components/domain/Navbar';
import { ProvenanceViewer } from '@/components/domain/ProvenanceViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Kebele ID Card',
    type: 'Identification',
    issuedBy: 'Addis Ababa Civil Registry',
    status: 'Verified',
    issuedAt: '2025-06-12T10:00:00Z',
    expiryDate: '2030-06-12',
    provenance: {
      issuer: 'ET-NAT-ID-AUTH-01',
      issuedAt: '2025-06-12T10:00:00Z',
      signature: '0x882fa...e912',
      payload: { idType: 'Residency', region: 'Addis Ababa', biometricStatus: 'Match' }
    }
  },
  {
    id: 'doc-2',
    title: 'Trade License 2025',
    type: 'Business',
    issuedBy: 'Bole Sub-city Trade Bureau',
    status: 'Verified',
    issuedAt: '2025-01-15T14:20:00Z',
    expiryDate: '2026-01-15',
    provenance: {
      issuer: 'ET-BOLE-TRADE-02',
      issuedAt: '2025-01-15T14:20:00Z',
      signature: '0x1192b...a004',
      payload: { licenseType: 'Retail', category: 'General', status: 'ACTIVE' }
    }
  },
  {
    id: 'doc-3',
    title: 'TIN Certificate',
    type: 'Tax',
    issuedBy: 'Ministry of Revenue',
    status: 'Verified',
    issuedAt: '2024-11-20T09:45:00Z',
    expiryDate: 'N/A',
    provenance: {
      issuer: 'ET-MOR-TAX-01',
      issuedAt: '2024-11-20T09:45:00Z',
      signature: '0xac221...ff32',
      payload: { tin: '1234567890', taxEntity: 'Individual' }
    }
  }
];

export default function VaultPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<typeof DOCUMENTS[0] | null>(null);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);

  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-foreground font-sans">
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-30" />
      <Navbar user={{ name: "Abebe Bikila" }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Encrypted Storage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
              Document <span className="text-primary italic">Vault</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Access your verified credentials and government-issued archives.
            </p>
          </div>
          
          <div className="bg-surface/80 backdrop-blur-md border border-border p-6 rounded-3xl flex items-center gap-6 shadow-sm">
             <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900">{DOCUMENTS.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Documents</span>
             </div>
             <div className="w-px h-10 bg-surface-muted" />
             <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">100%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Verified</span>
             </div>
             <Button className="ml-4 bg-slate-900 hover:bg-primary-dark text-white rounded-xl">
                Add New Document
             </Button>
          </div>
        </div>

        <div className="mb-10 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name or document type..."
             className="w-full h-14 pl-12 pr-6 bg-surface border border-border rounded-2xl outline-none focus:border-primary shadow-sm transition-all"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <AnimatePresence>
              {filteredDocs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                   <Card className="group overflow-hidden hover:border-primary/50 transition-all duration-300">
                      <div className="aspect-[4/3] bg-surface-muted relative overflow-hidden flex items-center justify-center border-b border-border">
                         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <FileText className="w-16 h-16 text-slate-300 group-hover:text-primary/60 transition-colors duration-500" />
                         
                         {/* Status Badge Over Image */}
                         <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-primary/20">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{doc.status}</span>
                         </div>
                         
                         {/* Actions Overlay */}
                            <Button 
                              size="sm" 
                              className="bg-surface text-slate-900 hover:bg-surface shadow-lg"
                              onClick={() => {
                                window.location.href = `/vault/${doc.id}`;
                              }}
                            >
                               <Eye className="w-4 h-4 mr-2" /> View
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-slate-900 text-white shadow-lg"
                              onClick={() => {
                                setSelectedDoc(doc);
                                setIsProvenanceOpen(true);
                              }}
                            >
                               <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> Verify
                            </Button>
                      </div>
                      
                      <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.title}</h3>
                               <p className="text-xs text-slate-500 font-medium">{doc.type}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400">
                               <MoreVertical className="w-4 h-4" />
                            </Button>
                         </div>
                         
                         <div className="space-y-3 pt-4 border-t border-border">
                            <div className="flex items-center justify-between text-xs">
                               <span className="text-slate-400 font-medium uppercase tracking-wider">Issued By</span>
                               <span className="text-slate-700 font-bold">{doc.issuedBy}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                               <span className="text-slate-400 font-medium uppercase tracking-wider">Expires</span>
                               <span className={cn(
                                 "font-bold",
                                 doc.expiryDate.includes('2026') ? "text-amber-600" : "text-slate-700"
                               )}>{doc.expiryDate}</span>
                            </div>
                         </div>
                         
                         <div className="mt-6 flex gap-2">
                            <Button variant="outline" className="flex-1 h-10 text-[10px] uppercase font-black tracking-widest border-border">
                               Share Securely
                            </Button>
                            <Button variant="outline" size="icon" className="h-10 w-10 border-border text-slate-400">
                               <Download className="w-4 h-4" />
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden"
        >
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shrink-0 shadow-glow-primary">
                 <Lock className="w-10 h-10" />
              </div>
              <div>
                 <h3 className="text-2xl font-display font-bold mb-2 tracking-tight">Sovereign Encryption Notice</h3>
                 <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    All documents in your vault are encrypted with your personal HSM key. 
                    Only you and authorized government officers (with your explicit consent) can access these archives.
                 </p>
              </div>
              <Button variant="secondary" className="ml-auto px-8 h-14 rounded-2xl font-bold">
                 Security Audit
              </Button>
           </div>
           <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
        </motion.div>
      </main>

      {selectedDoc && (
        <ProvenanceViewer 
          isOpen={isProvenanceOpen}
          onClose={() => setIsProvenanceOpen(false)}
          data={selectedDoc.provenance}
        />
      )}
    </div>
  );
}
