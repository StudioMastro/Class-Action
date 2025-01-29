/** @jsx h */
import { h } from 'preact'
import { JSX } from 'preact'
import { Button, ButtonProps } from './Button'

export interface DropdownItemProps extends ButtonProps {
  icon?: JSX.Element
}

export function DropdownItem({ 
  icon,
  children,
  className = '',
  ...props
}: DropdownItemProps) {
  return (
    <div className="w-full">
      <Button 
        className={`w-full flex items-center justify-start gap-2 h-7 leading-none ${className}`}
        size="small"
        {...props}
      >
        <div className="flex items-center gap-2 flex-1">
          {icon && (
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <span className="text-left">{children}</span>
        </div>
      </Button>
    </div>
  )
} 