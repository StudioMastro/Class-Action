/** @jsx h */
import { h, ComponentChildren } from 'preact'

interface DropdownItemProps {
  onClick?: () => void
  icon?: ComponentChildren
  children: ComponentChildren
  className?: string
}

const DropdownItem = ({ onClick, icon, children, className = '' }: DropdownItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-left">{children}</span>
    </div>
  )
}

export default DropdownItem 