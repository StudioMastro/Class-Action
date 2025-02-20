/** @jsx h */
import { h } from 'preact'
import type { JSX } from 'preact'
import { inputBaseStyles } from './common/styles'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (event: KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  type?: string
}

export function TextInput({
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  disabled = false,
  className = '',
  autoFocus = false,
  type = 'text'
}: TextInputProps) {
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      className={`
        ${inputBaseStyles}
        ${className}
      `}
    />
  )
} 