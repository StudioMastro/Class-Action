/** @jsx h */
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { inputBaseStyles } from './common/styles'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667zM14 14l-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

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
          <SearchIcon />
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
          <SearchIcon />
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
          <ClearIcon />
        </button>
      )}
    </div>
  )
} 