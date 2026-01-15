import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    
    const baseStyles = "rounded-xl overflow-hidden transition-all";
    
    const variants = {
      default: "bg-white shadow-md-soft border border-slate-100",
      flat: "bg-slate-50",
      bordered: "bg-white border border-slate-200",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
