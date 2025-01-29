/** @jsx h */
import { h } from 'preact'
import { JSX } from 'preact'

export interface IconButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children: JSX.Element | JSX.Element[]
}

export function IconButton({ 
  size = 'medium',
  variant = 'secondary',
  disabled = false,
  children,
  className = '',
  ...props
}: IconButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center transition-colors rounded-md h-[32px] w-[32px]'
  
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-xs',
    large: 'text-sm'
  }

  const variantClasses = {
    primary: 'text-[var(--figma-color-text-onbrand)] bg-[var(--figma-color-bg-brand)] hover:bg-[var(--figma-color-bg-brand-hover)]',
    secondary: 'text-[var(--figma-color-text)] hover:bg-[var(--figma-color-bg-hover)]'
  }

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabledClass,
    className
  ].join(' ')

  return (
    <button 
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
} 