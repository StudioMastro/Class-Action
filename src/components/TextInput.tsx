/** @jsx h */
import { h } from 'preact'
import { inputBaseStyles } from './common/styles'

interface TextInputProps {
  value: string
  onValueInput: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  onKeyDown?: (event: KeyboardEvent) => void
  variant?: 'default' | 'border'
}

export function TextInput({
  value,
  onValueInput,
  placeholder = '',
  disabled = false,
  className = '',
  autoFocus = false,
  onKeyDown,
  variant = 'default'
}: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onInput={(e) => onValueInput((e.target as HTMLInputElement).value)}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      className={`
        ${inputBaseStyles}
        ${variant === 'border' ? '' : 'border-none'}
        ${className}
      `}
    />
  )
} 