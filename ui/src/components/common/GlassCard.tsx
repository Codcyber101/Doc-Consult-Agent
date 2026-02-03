'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
    /** Blur intensity */
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    /** Background opacity */
    opacity?: 'light' | 'medium' | 'heavy';
    /** Border style */
    border?: 'subtle' | 'glow' | 'gradient' | 'none';
    /** Add hover effect */
    hoverable?: boolean;
    /** Add grain texture */
    grain?: boolean;
    /** Padding size */
    padding?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * GlassCard - A premium frosted glass effect container
 * 
 * Uses backdrop-filter for the blur effect. Works best on colorful
 * or gradient backgrounds.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({
        className,
        blur = 'lg',
        opacity = 'medium',
        border = 'subtle',
        hoverable = false,
        grain = false,
        padding = 'lg',
        children,
        ...props
    }, ref) => {

        // Blur intensity levels
        const blurLevels = {
            sm: 'backdrop-blur-sm',
            md: 'backdrop-blur-md',
            lg: 'backdrop-blur-lg',
            xl: 'backdrop-blur-xl',
        };

        // Background opacity levels
        const opacityLevels = {
            light: 'bg-surface/40 dark:bg-slate-900/40',
            medium: 'bg-surface/60 dark:bg-slate-900/60',
            heavy: 'bg-surface/80 dark:bg-slate-900/80',
        };

        // Border styles
        const borderStyles = {
            subtle: 'border border-white/30 dark:border-white/10',
            glow: 'border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)]',
            gradient: 'border-2 border-transparent [background:linear-gradient(var(--glass-bg),var(--glass-bg))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0.1))_border-box]',
            none: '',
        };

        // Padding sizes
        const paddingSizes = {
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
            xl: 'p-10',
        };

        // Hover animation
        const hoverAnimation = hoverable ? {
            whileHover: {
                y: -4,
                scale: 1.01,
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
            },
            whileTap: { scale: 0.99 }
        } : {};

        return (
            <motion.div
                ref={ref}
                className={cn(
                    // Base styles
                    "rounded-3xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    // Glass effect
                    blurLevels[blur],
                    opacityLevels[opacity],
                    borderStyles[border],
                    // Shadow
                    "shadow-xl shadow-slate-900/5",
                    // Padding
                    paddingSizes[padding],
                    // Grain texture
                    grain && "grain",
                    // Hoverable cursor
                    hoverable && "cursor-pointer",
                    className
                )}
                {...(hoverAnimation as any)}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = 'GlassCard';

// ============================================================================
// PRESET GLASS CARDS
// ============================================================================

interface PresetGlassCardProps extends Omit<GlassCardProps, 'blur' | 'opacity' | 'border'> { }

/** Light, subtle glass effect */
export const GlassCardLight = React.forwardRef<HTMLDivElement, PresetGlassCardProps>(
    (props, ref) => (
        <GlassCard ref={ref} blur="md" opacity="light" border="subtle" {...props} />
    )
);
GlassCardLight.displayName = 'GlassCardLight';

/** Standard glass effect */
export const GlassCardMedium = React.forwardRef<HTMLDivElement, PresetGlassCardProps>(
    (props, ref) => (
        <GlassCard ref={ref} blur="lg" opacity="medium" border="subtle" {...props} />
    )
);
GlassCardMedium.displayName = 'GlassCardMedium';

/** Heavy, prominent glass effect */
export const GlassCardHeavy = React.forwardRef<HTMLDivElement, PresetGlassCardProps>(
    (props, ref) => (
        <GlassCard ref={ref} blur="xl" opacity="heavy" border="glow" grain {...props} />
    )
);
GlassCardHeavy.displayName = 'GlassCardHeavy';
