import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-300",
        destructive:
          "bg-danger text-white hover:bg-red-600 shadow-sm",
        outline:
          "border border-border bg-surface hover:bg-surface-muted hover:text-slate-900 text-slate-700",
        secondary:
          "bg-accent text-slate-900 hover:bg-amber-300 shadow-sm",
        ghost: "hover:bg-surface-muted hover:text-slate-900 text-slate-600",
        link: "text-primary underline-offset-4 hover:underline",
        sovereign: "bg-primary text-white border border-primary/30 hover:bg-primary-dark hover:shadow-glow-gold transition-all duration-500",
      },
      size: {
        default: "h-11 px-6 py-2", // Large touch target by default
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
