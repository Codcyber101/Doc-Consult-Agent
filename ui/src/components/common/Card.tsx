'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: 'default' | 'flat' | 'bordered' | 'glass' | 'elevated' | 'gradient';
  /** Add hover lift effect */
  hoverable?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Add grain texture overlay */
  grain?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    hoverable = false,
    padding = 'lg',
    grain = false,
    children,
    ...props
  }, ref) => {

    const baseStyles = cn(
      "rounded-[2rem] overflow-hidden",
      "transition-all duration-300 ease-out"
    );

    const variants = {
      // Standard white card with subtle shadow
      default: cn(
        "bg-white dark:bg-slate-900 shadow-lg-soft dark:shadow-none border border-slate-100 dark:border-white/5",
        "hover:shadow-xl-soft dark:hover:border-white/10"
      ),

      // Flat, no shadow
      flat: "bg-slate-50 dark:bg-slate-800",

      // Outlined card
      bordered: cn(
        "bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800",
        "hover:border-slate-200 dark:hover:border-slate-700"
      ),

      // Glass-morphism effect
      glass: cn(
        "bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl",
        "border border-white/30 dark:border-white/5",
        "shadow-xl shadow-slate-200/20 dark:shadow-none"
      ),

      // Elevated with stronger shadow
      elevated: cn(
        "bg-white dark:bg-slate-900",
        "shadow-xl shadow-slate-200/50 dark:shadow-black/20",
        "border border-slate-50 dark:border-white/5"
      ),

      // Gradient border effect
      gradient: cn(
        "bg-white",
        "border-2 border-transparent",
        "bg-clip-padding",
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#006B3F,#10b981,#FDB813)_border-box]"
      ),
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    // Hover lift animation
    const hoverAnimation = hoverable ? {
      whileHover: {
        y: -4,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
      },
      whileTap: {
        scale: 0.99,
        transition: { duration: 0.1 }
      }
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddingStyles[padding],
          grain && "grain",
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

Card.displayName = 'Card';

// ============================================================================
// CARD HEADER / BODY / FOOTER SUBCOMPONENTS
// ============================================================================

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardHeader = ({ className, children, ...props }: CardSectionProps) => (
  <div
    className={cn("mb-6", className)}
    {...props}
  >
    {children}
  </div>
);

export const CardBody = ({ className, children, ...props }: CardSectionProps) => (
  <div
    className={cn("", className)}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: CardSectionProps) => (
  <div
    className={cn(
      "mt-6 pt-6 border-t border-slate-100",
      "flex items-center justify-end gap-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// EXPORTS
// ============================================================================

export const cardVariants = [
  'default',
  'flat',
  'bordered',
  'glass',
  'elevated',
  'gradient'
] as const;
