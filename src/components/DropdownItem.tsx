/** @jsx h */
import { h, VNode } from 'preact'

export interface DropdownItemProps {
  children: VNode | string | (string | false)[]
  onClick: () => void
  icon?: VNode
  disabled?: boolean
}

export function DropdownItem({ children, onClick, icon, disabled }: DropdownItemProps) {
  return (
    <button
      className="flex items-center gap-2 px-2 py-1.5 w-full text-sm hover:bg-[var(--figma-color-bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  )
} 