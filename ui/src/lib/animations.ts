/**
 * ANIMATIONS LIBRARY
 * Centralized Framer Motion animation variants for GovAssist Ethiopia
 * Use these for consistent, premium animations throughout the app.
 */

import { Variants, Transition } from 'framer-motion';

// ============================================================================
// TIMING PRESETS
// ============================================================================

export const timing = {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
} as const;

export const easing = {
    // Smooth deceleration (natural feeling)
    outExpo: [0.16, 1, 0.3, 1] as const,
    // Overshoot effect (playful bounce)
    outBack: [0.34, 1.56, 0.64, 1] as const,
    // Standard ease
    easeOut: [0.0, 0.0, 0.2, 1] as const,
    // Spring-like
    spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
};

// ============================================================================
// FADE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: timing.normal, ease: easing.easeOut }
    },
    exit: { opacity: 0, transition: { duration: timing.fast } }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: { opacity: 0, y: -10, transition: { duration: timing.fast } }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: { opacity: 0, y: 10, transition: { duration: timing.fast } }
};

export const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: timing.normal, ease: easing.outBack }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: timing.fast } }
};

// ============================================================================
// SLIDE VARIANTS
// ============================================================================

export const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: { opacity: 0, x: -30, transition: { duration: timing.fast } }
};

export const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: { opacity: 0, x: 30, transition: { duration: timing.fast } }
};

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

export const staggerContainer = (
    staggerDelay: number = 0.1,
    delayChildren: number = 0
): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
        }
    }
});

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    }
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

export const bounceIn: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
        }
    }
};

export const scaleOnHover = {
    scale: 1.02,
    transition: { duration: timing.fast, ease: easing.outBack }
};

export const scaleOnTap = {
    scale: 0.98,
    transition: { duration: timing.fast }
};

// Celebration effect for success states
export const celebrate: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: [0, 1.2, 0.9, 1.1, 1],
        rotate: [0, -5, 5, -3, 0],
        transition: {
            duration: timing.slow,
            ease: easing.outBack,
        }
    }
};

// Subtle pulse for attention
export const pulse: Variants = {
    visible: {
        scale: [1, 1.02, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// Shimmer effect for loading/badges
export const shimmer: Variants = {
    visible: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
        }
    }
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: { duration: timing.fast }
    }
};

export const wizardStepTransition: Variants = {
    enter: { opacity: 0, x: 50 },
    center: {
        opacity: 1,
        x: 0,
        transition: { duration: timing.normal, ease: easing.outExpo }
    },
    exit: {
        opacity: 0,
        x: -50,
        transition: { duration: timing.fast }
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a staggered delay for items in a list
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
    return index * baseDelay;
};

/**
 * Create custom fade-in-up with delay
 */
export const fadeInUpWithDelay = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: timing.normal, ease: easing.outExpo, delay }
    }
});

// ============================================================================
// PRESETS FOR COMMON USE CASES
// ============================================================================

export const presets = {
    // Cards and tiles
    card: {
        initial: fadeInUp.hidden,
        animate: fadeInUp.visible,
        whileHover: scaleOnHover,
        whileTap: scaleOnTap,
    },

    // Buttons
    button: {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
    },

    // Modal/Dialog
    modal: {
        initial: fadeInScale.hidden,
        animate: fadeInScale.visible,
        exit: fadeInScale.exit,
    },

    // Toast notifications
    toast: {
        initial: { opacity: 0, y: -20, x: 20 },
        animate: { opacity: 1, y: 0, x: 0 },
        exit: { opacity: 0, x: 100 },
    },

    // Page content
    page: pageTransition,
};
