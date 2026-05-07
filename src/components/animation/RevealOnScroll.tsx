import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  y?: number
}

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  y = 24,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setVisible(true)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={['reveal-on-scroll', visible ? 'is-visible' : '', className ?? ''].join(' ')}
      style={
        {
          '--reveal-delay': `${delayMs}ms`,
          '--reveal-y': `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

