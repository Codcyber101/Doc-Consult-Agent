import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: 'default' | 'flat' | 'bordered' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    
    const baseStyles = "rounded-[2rem] overflow-hidden transition-all duration-300";
    
    const variants = {
      default: "bg-white shadow-lg-soft border border-slate-100",
      flat: "bg-slate-50",
      bordered: "bg-white border-2 border-slate-100",
      glass: "bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
