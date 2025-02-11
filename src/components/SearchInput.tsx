/** @jsx h */
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { inputBaseStyles } from './common/styles'
import { Search, Close } from './common/icons'

interface SearchInputProps {
  value: string
  onValueInput: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  onKeyDown?: (event: KeyboardEvent) => void
  icon?: boolean
  iconPosition?: 'left' | 'right'
  showClearButton?: boolean
  onClear?: () => void
}

export function SearchInput({
  value,
  onValueInput,
  placeholder = 'Search...',
  disabled = false,
  className = '',
  autoFocus = false,
  onKeyDown,
  icon = true,
  iconPosition = 'left',
  showClearButton = true,
  onClear
}: SearchInputProps) {
  const handleClear = useCallback(() => {
    onValueInput('')
    onClear?.()
  }, [onValueInput, onClear])

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && iconPosition === 'left' && (
        <div className="absolute left-2 text-[var(--figma-color-text-tertiary)]">
          <Search size={16} />
        </div>
      )}
      
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
          ${icon && iconPosition === 'left' ? 'pl-8' : ''}
          ${(showClearButton && value) || (icon && iconPosition === 'right') ? 'pr-8' : ''}
        `}
      />

      {icon && iconPosition === 'right' && (
        <div className="absolute right-2 text-[var(--figma-color-text-tertiary)]">
          <Search size={16} />
        </div>
      )}

      {showClearButton && value && (
        <button
          onClick={handleClear}
          className={`
            absolute
            ${iconPosition === 'right' ? 'right-8' : 'right-2'}
            p-0.5
            text-[var(--figma-color-text-tertiary)]
            hover:text-[var(--figma-color-text)]
            focus:outline-none
            transition-colors
          `}
          type="button"
        >
          <Close size={16} />
        </button>
      )}
    </div>
  )
} 