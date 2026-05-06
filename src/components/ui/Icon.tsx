type IconProps = {
  name: string
  className?: string
  filled?: boolean
}

export function Icon({ name, className = '', filled }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`.trim()}
    >
      {name}
    </span>
  )
}
