'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import {
    Shield,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertTriangle,
    FileText,
    Lock
} from 'lucide-react';

interface DataField {
    label: string;
    value: string;
    /** Is this field PII/sensitive */
    sensitive?: boolean;
    /** Should this field be masked in preview */
    masked?: boolean;
}

interface ConsentScreenProps {
    /** Title of the consent request */
    title: string;
    /** Description of what data is being shared */
    description: string;
    /** Service/system receiving the data */
    recipient: string;
    /** Purpose of data sharing */
    purpose: string;
    /** Data fields being shared */
    dataFields: DataField[];
    /** Data retention period */
    retentionPeriod?: string;
    /** Privacy policy link */
    privacyPolicyUrl?: string;
    /** Terms of service link */
    termsUrl?: string;
    /** Consent handler */
    onConsent: () => void;
    /** Decline handler */
    onDecline: () => void;
    /** Is submitting */
    isLoading?: boolean;
    /** Custom class name */
    className?: string;
}

/**
 * ConsentScreen - PII disclosure & consent
 * 
 * Shows exactly what data is being shared, with whom,
 * for what purpose. Allows preview of data with masking option.
 * Requires explicit consent checkbox before proceeding.
 */
export const ConsentScreen = ({
    title,
    description,
    recipient,
    purpose,
    dataFields,
    retentionPeriod,
    privacyPolicyUrl,
    termsUrl,
    onConsent,
    onDecline,
    isLoading = false,
    className,
}: ConsentScreenProps) => {
    const [showSensitive, setShowSensitive] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);

    // Mask sensitive values
    const maskValue = (value: string, sensitive?: boolean, masked?: boolean) => {
        if (!sensitive || showSensitive || !masked) return value;
        if (value.length <= 4) return '****';
        return value.slice(0, 2) + '*'.repeat(value.length - 4) + value.slice(-2);
    };

    const sensitiveFields = dataFields.filter(f => f.sensitive);
    const regularFields = dataFields.filter(f => !f.sensitive);

    return (
        <div className={cn(
            "bg-surface rounded-3xl border-2 border-border overflow-hidden",
            className
        )}>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                        Data Consent Required
                    </Badge>
                </div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-slate-200 text-sm">{description}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Recipient & Purpose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-muted rounded-xl p-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Recipient
                        </p>
                        <p className="font-medium text-slate-900">{recipient}</p>
                    </div>
                    <div className="bg-surface-muted rounded-xl p-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Purpose
                        </p>
                        <p className="font-medium text-slate-900">{purpose}</p>
                    </div>
                </div>

                {/* Data preview */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Data Being Shared
                        </h3>
                        {sensitiveFields.length > 0 && (
                            <button
                                onClick={() => setShowSensitive(!showSensitive)}
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                {showSensitive ? (
                                    <>
                                        <EyeOff className="w-4 h-4" />
                                        Hide Sensitive
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        Show Sensitive
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="bg-surface-muted rounded-xl p-4 space-y-3">
                        {/* Regular fields */}
                        {regularFields.map((field, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">{field.label}</span>
                                <span className="font-medium text-slate-900">{field.value}</span>
                            </div>
                        ))}

                        {/* Sensitive fields with visual indicator */}
                        {sensitiveFields.length > 0 && (
                            <>
                                {regularFields.length > 0 && (
                                    <div className="border-t border-border my-3" />
                                )}
                                <div className="flex items-center gap-2 text-xs text-amber-600 mb-2">
                                    <Lock className="w-3 h-3" />
                                    <span className="font-medium">Sensitive Information</span>
                                </div>
                                {sensitiveFields.map((field, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">{field.label}</span>
                                        <span className="font-mono text-slate-900">
                                            {maskValue(field.value, field.sensitive, field.masked !== false)}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Retention notice */}
                {retentionPeriod && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">Data Retention</p>
                            <p className="text-sm text-blue-700 mt-0.5">
                                Your data will be retained for {retentionPeriod}. You can request deletion at any time.
                            </p>
                        </div>
                    </div>
                )}

                {/* Consent checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                        <input
                            type="checkbox"
                            checked={hasAgreed}
                            onChange={(e) => setHasAgreed(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            hasAgreed
                                ? "bg-primary border-primary"
                                : "border-border group-hover:border-primary/60"
                        )}>
                            {hasAgreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                    </div>
                    <span className="text-sm text-slate-700">
                        I understand and consent to sharing the above data with {recipient} for the stated purpose.
                        {(privacyPolicyUrl || termsUrl) && (
                            <span className="text-slate-500">
                                {' '}I have read the{' '}
                                {privacyPolicyUrl && (
                                    <a href={privacyPolicyUrl} target="_blank" rel="noopener" className="text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                )}
                                {privacyPolicyUrl && termsUrl && ' and '}
                                {termsUrl && (
                                    <a href={termsUrl} target="_blank" rel="noopener" className="text-primary hover:underline">
                                        Terms of Service
                                    </a>
                                )}
                                .
                            </span>
                        )}
                    </span>
                </label>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 flex items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={onDecline}
                    disabled={isLoading}
                >
                    Decline
                </Button>

                <Button
                    variant="primary"
                    onClick={onConsent}
                    disabled={!hasAgreed || isLoading}
                    isLoading={isLoading}
                >
                    I Consent & Continue
                </Button>
            </div>
        </div>
    );
};
