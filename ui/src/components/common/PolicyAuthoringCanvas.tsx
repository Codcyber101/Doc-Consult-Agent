'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import { Input } from './Input';
import {
    FileText,
    Plus,
    Trash2,
    Save,
    Eye,
    Settings,
    MoreVertical,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

interface PolicyRule {
    id: string;
    condition: string;
    action: string;
    description?: string;
    isActive: boolean;
}

interface PolicyAuthoringCanvasProps {
    initialTitle?: string;
    initialDescription?: string;
    initialRules?: PolicyRule[];
    onSave?: (policy: { title: string; description: string; rules: PolicyRule[] }) => void;
    isLoading?: boolean;
    className?: string;
}

/**
 * PolicyAuthoringCanvas - Editor for creating/editing policies
 * 
 * Provides a structured interface for defining policy rules,
 * consisting of conditions and actions.
 */
export const PolicyAuthoringCanvas = ({
    initialTitle = '',
    initialDescription = '',
    initialRules = [],
    onSave,
    isLoading = false,
    className,
}: PolicyAuthoringCanvasProps) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [rules, setRules] = useState<PolicyRule[]>(initialRules);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    const addRule = () => {
        const newRule: PolicyRule = {
            id: Math.random().toString(36).substr(2, 9),
            condition: '',
            action: '',
            isActive: true,
        };
        setRules([...rules, newRule]);
    };

    const updateRule = (id: string, field: keyof PolicyRule, value: any) => {
        setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    const removeRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
    };

    const handleSave = () => {
        if (onSave) {
            onSave({ title, description, rules });
        }
    };

    return (
        <div className={cn("bg-surface rounded-3xl border-2 border-border overflow-hidden flex flex-col h-[800px]", className)}>
            {/* Header */}
            <div className="bg-surface border-b border-border p-6 flex justify-between items-center">
                <div>
                    <Input
                        label="Policy Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg font-bold bg-transparent border-transparent focus:bg-surface focus:border-border transition-colors w-80 mb-2"
                        placeholder="e.g. Trade License Renewal Policy"
                    />
                    <Input
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-sm text-slate-500 bg-transparent border-transparent focus:bg-surface focus:border-border w-96"
                        placeholder="Short description of this policy"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-surface-muted rounded-lg p-1 flex items-center">
                        <button
                            onClick={() => setActiveTab('editor')}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                activeTab === 'editor' ? "bg-surface text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Editor
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                activeTab === 'preview' ? "bg-surface text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Preview logic
                        </button>
                    </div>

                    <div className="h-6 w-[1px] bg-slate-300 mx-2" />

                    <Button
                        variant="primary"
                        onClick={handleSave}
                        isLoading={isLoading}
                        leftIcon={<Save className="w-4 h-4" />}
                    >
                        Save Policy
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-surface/50 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">

                    {activeTab === 'editor' ? (
                        <>
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                    Rules ({rules.length})
                                </h2>
                                <Button variant="ghost" size="sm" onClick={addRule} leftIcon={<Plus className="w-4 h-4" />}>
                                    Add Rule
                                </Button>
                            </div>

                            <AnimatePresence>
                                {rules.map((rule, index) => (
                                    <motion.div
                                        key={rule.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={cn(
                                            "bg-surface rounded-xl border border-border p-5 shadow-sm transition-all group",
                                            !rule.isActive && "opacity-60 bg-surface"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-surface-muted text-slate-500 flex items-center justify-center text-xs font-mono">
                                                    {index + 1}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400 uppercase">
                                                    IF
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateRule(rule.id, 'isActive', !rule.isActive)}
                                                    title={rule.isActive ? "Deactivate" : "Activate"}
                                                    className={cn(
                                                        "p-1.5 rounded-lg transition-colors",
                                                        rule.isActive ? "text-primary hover:bg-primary/10" : "text-slate-400 hover:bg-surface-muted"
                                                    )}
                                                >
                                                    {rule.isActive ? <CheckCircle2 className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => removeRule(rule.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-slate-500">Condition</label>
                                                <textarea
                                                    value={rule.condition}
                                                    onChange={(e) => updateRule(rule.id, 'condition', e.target.value)}
                                                    className="w-full h-24 p-3 text-sm rounded-lg border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none resize-none font-mono bg-surface-muted focus:bg-surface transition-colors"
                                                    placeholder="e.g. applicant.age >= 18 && applicant.residency == 'Addis Ababa'"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-slate-400 uppercase">THEN</span>
                                                    <label className="text-xs font-medium text-slate-500">Action</label>
                                                </div>
                                                <textarea
                                                    value={rule.action}
                                                    onChange={(e) => updateRule(rule.id, 'action', e.target.value)}
                                                    className="w-full h-24 p-3 text-sm rounded-lg border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none resize-none font-mono bg-surface-muted focus:bg-surface transition-colors"
                                                    placeholder="e.g. return { eligible: true, nextStep: 'document-upload' }"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {rules.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">No rules defined yet</p>
                                    <Button variant="ghost" size="sm" onClick={addRule} className="mt-2 text-primary">
                                        Add your first rule
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm overflow-x-auto">
                            <pre>
                                {JSON.stringify({
                                    policy: {
                                        title,
                                        description,
                                        rules: rules.filter(r => r.isActive).map(r => ({
                                            if: r.condition,
                                            then: r.action
                                        }))
                                    }
                                }, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
