/** @jsx h */
import { h } from 'preact'
import { ComponentChildren } from 'preact'
import { cn } from '../../lib/utils'

export interface TextProps {
  children: ComponentChildren
  align?: 'left' | 'center' | 'right'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'bold'
  variant?: 'default' | 'muted' | 'primary' | 'error'
  numeric?: boolean
  className?: string
}

export function Text({
  children,
  align = 'left',
  size = 'base',
  weight = 'normal',
  variant = 'default',
  numeric = false,
  className,
  ...props
}: TextProps) {
  return (
    <span
      className={cn(
        // Base styles
        'block font-sans',
        // Text alignment
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        // Font size
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'base' && 'text-base',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
        // Font weight
        weight === 'normal' && 'font-normal',
        weight === 'medium' && 'font-medium',
        weight === 'bold' && 'font-bold',
        // Variants
        variant === 'default' && 'text-[var(--figma-color-text)]',
        variant === 'muted' && 'text-[var(--figma-color-text-secondary)]',
        variant === 'primary' && 'text-[var(--figma-color-text-brand)]',
        variant === 'error' && 'text-[var(--figma-color-text-danger)]',
        // Numeric
        numeric && 'tabular-nums',
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
} 