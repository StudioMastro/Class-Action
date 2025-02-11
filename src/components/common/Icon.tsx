/** @jsx h */
import { h } from 'preact'
import { LucideIcon, LucideProps } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export function Icon({ 
  icon: LucideIcon, 
  size = 'md',
  className,
  ...props 
}: IconProps) {
  const iconSize = typeof size === 'string' ? sizeMap[size] : size
  
  return (
    <LucideIcon
      size={iconSize}
      className={twMerge(
        clsx(
          'inline-block flex-shrink-0',
          'text-[var(--figma-color-text)]',
          'transition-colors duration-200',
          className
        )
      )}
      {...props}
    />
  )
} 