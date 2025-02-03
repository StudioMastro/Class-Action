/** @jsx h */
import { h } from 'preact'
import type { ComponentChildren } from 'preact'

interface TextProps {
  children: ComponentChildren
  size?: 'xs' | 'sm' | 'base' | 'lg'
  weight?: 'normal' | 'medium' | 'bold'
  variant?: 'muted' | 'default'
  className?: string
  mono?: boolean
}

export function Text({ 
  children, 
  size = 'base', 
  weight = 'normal', 
  variant = 'default',
  className = '',
  mono = false
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold'
  }

  const variantClasses = {
    muted: 'text-[var(--figma-color-text-secondary)]',
    default: 'text-[var(--figma-color-text)]'
  }

  return (
    <span className={`
      ${sizeClasses[size]}
      ${weightClasses[weight]}
      ${variantClasses[variant]}
      ${mono ? 'font-mono' : 'font-sans'}
      ${className}
    `.trim()}>
      {children}
    </span>
  )
} 