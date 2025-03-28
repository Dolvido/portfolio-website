import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost'
}

export function Button({
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        variant === 'default' && "bg-blue-600 text-white hover:bg-blue-700",
        variant === 'secondary' && "bg-gray-800 text-gray-100 hover:bg-gray-700",
        variant === 'ghost' && "hover:bg-gray-800 text-gray-400 hover:text-gray-100",
        className
      )}
      {...props}
    />
  )
} 