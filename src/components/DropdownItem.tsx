/** @jsx h */
import { h, VNode } from 'preact';

export interface DropdownItemProps {
  children: VNode | string | (string | false)[];
  onClick: () => void;
  icon?: VNode;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

export function DropdownItem({
  children,
  onClick,
  icon,
  disabled,
  variant = 'default',
}: DropdownItemProps) {
  const baseClasses =
    'flex items-center gap-2 px-2 py-1.5 w-full text-sm rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    default: 'hover:bg-[var(--figma-color-bg-hover)]',
    danger:
      'text-[var(--figma-color-text-danger)] hover:bg-[var(--figma-color-bg-danger)] hover:text-[var(--figma-color-text-onbrand)]',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}
