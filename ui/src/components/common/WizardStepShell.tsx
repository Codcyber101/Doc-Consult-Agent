'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import {
    ArrowLeft,
    ArrowRight,
    HelpCircle,
    Save,
    Loader2
} from 'lucide-react';

interface WizardStepShellProps {
    children: React.ReactNode;
    /** Current step number (1-indexed) */
    currentStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Step title */
    title: string;
    /** Step description/instruction */
    description?: string;
    /** Show back button */
    showBack?: boolean;
    /** Back button handler */
    onBack?: () => void;
    /** Next/submit button handler */
    onNext?: () => void;
    /** Next button label */
    nextLabel?: string;
    /** Is the form submitting/loading */
    isLoading?: boolean;
    /** Is the next button disabled */
    nextDisabled?: boolean;
    /** Help tooltip content */
    helpContent?: string;
    /** Show "Why needed?" link */
    showWhyNeeded?: boolean;
    /** Why needed handler */
    onWhyNeeded?: () => void;
    /** Show save & exit */
    showSaveExit?: boolean;
    /** Save & exit handler */
    onSaveExit?: () => void;
    /** Custom footer content (replaces default buttons) */
    customFooter?: React.ReactNode;
    /** Animation direction for page transitions */
    animationDirection?: 'forward' | 'backward';
}

/**
 * WizardStepShell - Single-question wizard layout
 * 
 * Provides consistent structure for wizard steps with:
 * - Progress indicator
 * - Navigation (back/next)
 * - Help button
 * - Save & exit option
 * 
 * Follows "one question per screen" principle for minimal cognitive load.
 */
export const WizardStepShell = ({
    children,
    currentStep,
    totalSteps,
    title,
    description,
    showBack = true,
    onBack,
    onNext,
    nextLabel = 'Continue',
    isLoading = false,
    nextDisabled = false,
    helpContent,
    showWhyNeeded = false,
    onWhyNeeded,
    showSaveExit = true,
    onSaveExit,
    customFooter,
    animationDirection = 'forward',
}: WizardStepShellProps) => {

    const progress = (currentStep / totalSteps) * 100;

    // Animation variants based on direction
    const slideVariants = {
        enter: (direction: 'forward' | 'backward') => ({
            x: direction === 'forward' ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: 'forward' | 'backward') => ({
            x: direction === 'forward' ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-100">
                <motion.div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Step indicator */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                Step {currentStep} of {totalSteps}
                            </span>
                            {helpContent && (
                                <button
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                    title={helpContent}
                                >
                                    <HelpCircle className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Save & Exit */}
                        {showSaveExit && onSaveExit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onSaveExit}
                                leftIcon={<Save className="w-4 h-4" />}
                            >
                                Save & Exit
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col">
                <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1">
                    <AnimatePresence mode="wait" custom={animationDirection}>
                        <motion.div
                            key={currentStep}
                            custom={animationDirection}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1"
                        >
                            {/* Title & Description */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-3">
                                    {title}
                                </h1>
                                {description && (
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        {description}
                                    </p>
                                )}
                                {showWhyNeeded && onWhyNeeded && (
                                    <button
                                        onClick={onWhyNeeded}
                                        className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                                    >
                                        Why is this needed?
                                    </button>
                                )}
                            </div>

                            {/* Step content */}
                            <div className="space-y-6">
                                {children}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer with navigation */}
            <footer className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
                    {customFooter || (
                        <div className="flex items-center justify-between gap-4">
                            {/* Back button */}
                            <div>
                                {showBack && currentStep > 1 && onBack && (
                                    <Button
                                        variant="ghost"
                                        onClick={onBack}
                                        leftIcon={<ArrowLeft className="w-4 h-4" />}
                                    >
                                        Back
                                    </Button>
                                )}
                            </div>

                            {/* Next/Submit button */}
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={onNext}
                                disabled={nextDisabled || isLoading}
                                rightIcon={
                                    isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ArrowRight className="w-4 h-4" />
                                    )
                                }
                            >
                                {nextLabel}
                            </Button>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
};

// ============================================================================
// WIZARD STEP CONTENT LAYOUTS
// ============================================================================

interface WizardStepContentProps {
    children: React.ReactNode;
    className?: string;
}

/** Centered content layout */
export const WizardStepCentered = ({ children, className }: WizardStepContentProps) => (
    <div className={cn("flex flex-col items-center text-center", className)}>
        {children}
    </div>
);

/** Form layout with max width */
export const WizardStepForm = ({ children, className }: WizardStepContentProps) => (
    <div className={cn("max-w-md mx-auto w-full space-y-6", className)}>
        {children}
    </div>
);

/** Full width layout */
export const WizardStepFull = ({ children, className }: WizardStepContentProps) => (
    <div className={cn("w-full space-y-6", className)}>
        {children}
    </div>
);
