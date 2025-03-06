/** @jsx h */
import { h, ComponentChildren } from 'preact';
import { JSX } from 'preact';

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  children: ComponentChildren;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center transition-colors font-medium';

  const sizeClasses = {
    small: 'px-2 text-xs rounded-md h-7',
    medium: 'px-3 text-xs rounded-md h-8',
    large: 'px-4 text-sm rounded-lg h-9',
  };

  // Map 'info' variant to 'secondary'
  const mappedVariant = variant === 'info' ? 'secondary' : variant;

  // Base variant classes without hover effects
  const baseVariantClasses = {
    primary: 'bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)]',
    secondary:
      'bg-[var(--figma-color-bg)] text-[var(--figma-color-text)] border border-[var(--figma-color-border)]',
    danger: 'bg-[var(--figma-color-bg-danger)] text-[var(--figma-color-text-onbrand)]',
    warning: 'bg-[var(--figma-color-bg-warning)] text-[var(--figma-color-text-onbrand)]',
    success: 'bg-[var(--figma-color-bg-success)] text-[var(--figma-color-text-onbrand)]',
  };

  // Hover effects to apply only when not disabled
  const hoverClasses = {
    primary: 'hover:bg-[var(--figma-color-bg-brand-hover)]',
    secondary: 'hover:bg-[var(--figma-color-bg-hover)]',
    danger: 'hover:bg-[var(--figma-color-bg-danger-hover)]',
    warning: 'hover:bg-[var(--figma-color-bg-warning-hover)]',
    success: 'hover:bg-[var(--figma-color-bg-success-hover)]',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Apply hover classes only when not disabled
  const variantClass = baseVariantClasses[mappedVariant];
  const hoverClass = !disabled ? hoverClasses[mappedVariant] : '';

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClass,
    hoverClass,
    widthClass,
    disabledClass,
    className,
  ].join(' ');

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
