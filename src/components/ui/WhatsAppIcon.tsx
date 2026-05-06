type WhatsAppIconProps = {
  className?: string
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: WhatsAppIconProps) {
  return (
    <img
      src="/img/icons/WhatsApp.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={20}
      height={20}
    />
  )
}
