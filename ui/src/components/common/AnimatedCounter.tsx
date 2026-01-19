'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Target value to count to */
    value: number;
    /** Duration of animation in seconds */
    duration?: number;
    /** Decimal places to show */
    decimals?: number;
    /** Prefix (e.g., "$") */
    prefix?: string;
    /** Suffix (e.g., "%", "h") */
    suffix?: string;
    /** Locale for number formatting */
    locale?: string;
    /** Start animation when element comes into view */
    animateOnView?: boolean;
    /** Delay before starting animation (ms) */
    delay?: number;
    /** Easing function */
    easing?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
}

/**
 * AnimatedCounter - Count-up animation for statistics
 * 
 * Animates from 0 to target value when visible in viewport.
 * Use for dashboards, stats displays, and achievement numbers.
 */
export const AnimatedCounter = ({
    value,
    duration = 1.5,
    decimals = 0,
    prefix = '',
    suffix = '',
    locale = 'en-US',
    animateOnView = true,
    delay = 0,
    easing = 'easeOut',
    className,
    ...props
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Spring configuration based on easing
    const springConfig = {
        linear: { stiffness: 100, damping: 100 },
        easeOut: { stiffness: 100, damping: 30 },
        easeInOut: { stiffness: 50, damping: 20 },
        spring: { stiffness: 300, damping: 30 },
    };

    // Create animated value
    const springValue = useSpring(0, {
        ...springConfig[easing],
        duration: duration * 1000,
    });

    // Format the number
    const displayValue = useTransform(springValue, (latest) => {
        const formatted = new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(latest);
        return `${prefix}${formatted}${suffix}`;
    });

    // Trigger animation
    useEffect(() => {
        if (!animateOnView || (isInView && !hasAnimated)) {
            const timeoutId = setTimeout(() => {
                springValue.set(value);
                setHasAnimated(true);
            }, delay);
            return () => clearTimeout(timeoutId);
        }
    }, [isInView, value, animateOnView, hasAnimated, springValue, delay]);

    // For non-animated display
    if (!animateOnView && hasAnimated) {
        const formatted = new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value);

        return (
            <span ref={ref} className={cn("tabular-nums", className)} {...props}>
                {prefix}{formatted}{suffix}
            </span>
        );
    }

    return (
        <motion.span
            ref={ref}
            className={cn("tabular-nums", className)}
            {...props}
        >
            {displayValue}
        </motion.span>
    );
};

// ============================================================================
// PRESET COUNTER VARIANTS
// ============================================================================

interface PresetCounterProps extends Omit<AnimatedCounterProps, 'prefix' | 'suffix'> { }

/** Currency counter (ETB) */
export const CurrencyCounter = ({ value, ...props }: PresetCounterProps) => (
    <AnimatedCounter value={value} prefix="ETB " decimals={0} {...props} />
);

/** Percentage counter */
export const PercentCounter = ({ value, ...props }: PresetCounterProps) => (
    <AnimatedCounter value={value} suffix="%" decimals={1} {...props} />
);

/** Time/hours counter */
export const HoursCounter = ({ value, ...props }: PresetCounterProps) => (
    <AnimatedCounter value={value} suffix="h" decimals={0} {...props} />
);

/** Days counter */
export const DaysCounter = ({ value, ...props }: PresetCounterProps) => (
    <AnimatedCounter value={value} suffix=" days" decimals={0} {...props} />
);

// ============================================================================
// STAT DISPLAY COMPONENT
// ============================================================================

interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Label for the stat */
    label: string;
    /** Numeric value */
    value: number;
    /** Prefix (e.g., "$") */
    prefix?: string;
    /** Suffix (e.g., "%") */
    suffix?: string;
    /** Optional icon */
    icon?: React.ReactNode;
    /** Trend indicator */
    trend?: {
        value: number;
        direction: 'up' | 'down';
    };
}

/**
 * StatDisplay - Complete stat card with counter
 */
export const StatDisplay = ({
    label,
    value,
    prefix,
    suffix,
    icon,
    trend,
    className,
    ...props
}: StatDisplayProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-1",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-2 text-slate-500">
                {icon && <span className="text-slate-400">{icon}</span>}
                <span className="text-xs font-semibold uppercase tracking-wider">
                    {label}
                </span>
            </div>

            <div className="flex items-baseline gap-2">
                <AnimatedCounter
                    value={value}
                    prefix={prefix}
                    suffix={suffix}
                    className="text-2xl font-bold text-slate-900"
                />

                {trend && (
                    <span className={cn(
                        "text-xs font-semibold",
                        trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'
                    )}>
                        {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>
        </div>
    );
};
