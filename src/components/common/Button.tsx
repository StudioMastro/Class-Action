/** @jsx h */
import { h } from 'preact'
import { JSX } from 'preact'

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  children: JSX.Element | JSX.Element[] | string
}

export function Button({ 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center transition-colors font-medium'
  
  const sizeClasses = {
    small: 'px-2 text-xs rounded-md h-7',
    medium: 'px-3 text-xs rounded-md h-8',
    large: 'px-4 text-sm rounded-lg h-9'
  }

  // Map 'info' variant to 'secondary'
  const mappedVariant = variant === 'info' ? 'secondary' : variant

  const variantClasses = {
    primary: 'bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-brand-hover)]',
    secondary: 'bg-[var(--figma-color-bg)] text-[var(--figma-color-text)] border border-[var(--figma-color-border)] hover:bg-[var(--figma-color-bg-hover)]',
    danger: 'bg-[var(--figma-color-bg-danger)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-danger-hover)]',
    warning: 'bg-[var(--figma-color-bg-warning)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-warning-hover)]',
    success: 'bg-[var(--figma-color-bg-success)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-success-hover)]'
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[mappedVariant],
    widthClass,
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