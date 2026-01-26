import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ArrowLeft, ArrowRight, UploadCloud } from 'lucide-react';

export default async function FlowPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Mock Playbook Step
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Step Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Identification</h1>
        <p className="text-lg text-slate-600">
          Please provide a clear scan of your renewed Resident ID or Passport.
        </p>
      </div>

      {/* Main Interaction Area */}
      <Card className="p-8 border-dashed border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-semibold text-slate-900">Click to upload or drag and drop</h3>
        <p className="text-sm text-slate-500 mt-1">
          SVG, PNG, JPG or PDF (max. 10MB)
        </p>
      </Card>

      {/* Form Fields Example */}
      <div className="grid gap-6">
         <Input label="Document ID Number" placeholder="e.g. 123456789" />
         <Input label="Issue Date" type="date" />
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <Button variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4"/>}>
          Back
        </Button>
        <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4"/>}>
          Continue
        </Button>
      </div>

    </div>
  );
}
