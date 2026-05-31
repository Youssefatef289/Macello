import { useEffect, useState } from 'react'
import { Icon } from '../ui/Icon'

export function ScrollToTopFab() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <div
      className={[
        'fixed right-4 bottom-20 z-[95] transition-all duration-300 md:right-6 md:bottom-8',
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-black/20 transition-transform hover:scale-110 md:h-14 md:w-14"
        aria-label="العودة إلى الأعلى"
        title="العودة إلى الأعلى"
      >
        <Icon name="arrow_upward" className="text-[22px] md:text-[24px]" />
      </button>
    </div>
  )
}
