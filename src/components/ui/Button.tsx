import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider transition-transform active:translate-y-1 active:shadow-none border-2 border-[var(--goa-ink)]"
    
    const variants = {
      primary: "bg-[var(--goa-yellow)] text-[var(--goa-ink)] shadow-[4px_4px_0px_var(--goa-ink)] hover:bg-[var(--goa-yellow-bright)]",
      secondary: "bg-[var(--goa-green)] text-[var(--goa-cream)] shadow-[4px_4px_0px_var(--goa-ink)] hover:bg-[var(--goa-green-light)]",
      accent: "bg-[var(--goa-pink)] text-white shadow-[4px_4px_0px_var(--goa-ink)] hover:bg-[#ff3399]",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], "px-6 py-3 text-lg md:text-xl", className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
