import { useCallback, useRef } from 'react'
import type { CatalogProduct } from '../../data/products'
import { formatEgp, weightOptionsKg } from '../../data/products'
import { Icon } from '../ui/Icon'

function weightLabel(kg: number) {
  if (kg === 0.25) return '¼ كيلو'
  if (kg === 0.5) return '½ كيلو'
  return '1 كيلو'
}

function findCartTarget() {
  if (typeof document === 'undefined') return null

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-cart-target="true"]'),
  )

  return (
    targets.find((element) => {
      const rect = element.getBoundingClientRect()
      const styles = window.getComputedStyle(element)
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        styles.display !== 'none' &&
        styles.visibility !== 'hidden'
      )
    }) ?? null
  )
}

function animateImageToCart(sourceImage: HTMLImageElement) {
  const target = findCartTarget()
  if (!target || typeof document === 'undefined') return

  const sourceRect = sourceImage.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()

  if (
    !sourceRect.width ||
    !sourceRect.height ||
    !targetRect.width ||
    !targetRect.height
  ) {
    return
  }

  const clone = sourceImage.cloneNode(true) as HTMLImageElement
  const startCenterX = sourceRect.left + sourceRect.width / 2
  const startCenterY = sourceRect.top + sourceRect.height / 2
  const endCenterX = targetRect.left + targetRect.width / 2
  const endCenterY = targetRect.top + targetRect.height / 2
  const deltaX = endCenterX - startCenterX
  const deltaY = endCenterY - startCenterY
  const endScale = Math.max(
    0.12,
    Math.min(targetRect.width / sourceRect.width, targetRect.height / sourceRect.height, 0.35),
  )

  Object.assign(clone.style, {
    position: 'fixed',
    left: `${sourceRect.left}px`,
    top: `${sourceRect.top}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    objectFit: 'cover',
    borderRadius: '1.25rem',
    pointerEvents: 'none',
    zIndex: '9999',
    margin: '0',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
    transformOrigin: 'center center',
    willChange: 'transform, opacity',
  })

  document.body.appendChild(clone)

  const animation = clone.animate(
    [
      {
        transform: 'translate3d(0, 0, 0) scale(1)',
        opacity: '1',
      },
      {
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${endScale})`,
        opacity: '0.15',
      },
    ],
    {
      duration: 750,
      easing: 'cubic-bezier(0.2, 0.85, 0.2, 1)',
      fill: 'forwards',
    },
  )

  animation.onfinish = () => clone.remove()
  animation.oncancel = () => clone.remove()
}

type Props = {
  product: CatalogProduct
  kg: number
  onKgChange: (kg: number) => void
  onAdd: () => void
  className?: string
  compactOnMobile?: boolean
}

export function ProductCard({
  product,
  kg,
  onKgChange,
  onAdd,
  className,
  compactOnMobile = false,
}: Props) {
  const imageRef = useRef<HTMLDivElement | null>(null)
  const linePrice = Math.round(product.pricePerKg * kg)

  const handleAdd = useCallback(() => {
    const imageElement = imageRef.current?.querySelector('img')
    if (imageElement instanceof HTMLImageElement) {
      animateImageToCart(imageElement)
    }
    onAdd()
  }, [onAdd])

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg',
        className ?? '',
      ].join(' ')}
    >
      {product.badge ? (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-black/10">
          {product.badge}
        </span>
      ) : null}

      <div ref={imageRef} className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div
        className={[
          'flex flex-1 flex-col text-right',
          compactOnMobile ? 'p-3 sm:p-4' : 'p-4 sm:p-5',
        ].join(' ')}
      >
        <h3
          className={[
            'mb-2 line-clamp-2 font-bold leading-7 text-zinc-900',
            compactOnMobile ? 'text-sm sm:text-base' : 'text-base',
          ].join(' ')}
        >
          {product.name}
        </h3>
        <p
          className={[
            'mb-4 min-h-[2.5rem] leading-6 text-secondary',
            compactOnMobile ? 'text-[11px] sm:text-xs' : 'text-xs',
          ].join(' ')}
        >
          {product.description}
        </p>

        <div className="mt-auto">
          <div
            className={[
              'mb-3 rounded-2xl bg-zinc-50 px-3 py-2.5 text-right',
              compactOnMobile ? 'sm:px-4' : '',
            ].join(' ')}
          >
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              السعر التقديري
            </p>
            <div
              className={[
                'font-black text-primary',
                compactOnMobile ? 'text-lg sm:text-xl' : 'text-xl',
              ].join(' ')}
            >
              {formatEgp(linePrice)}
              <span className="mr-2 text-sm font-normal text-on-background">/ تقدير</span>
            </div>
          </div>

          <div
            className={[
              'mb-4 flex flex-wrap items-center justify-end gap-2',
              compactOnMobile ? 'gap-1.5 sm:gap-2' : '',
            ].join(' ')}
          >
            {weightOptionsKg.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onKgChange(w)}
                className={[
                  'rounded-full border font-semibold transition',
                  compactOnMobile
                    ? 'px-2.5 py-1 text-[10px] sm:px-3 sm:text-[11px]'
                    : 'px-3 py-1 text-[11px]',
                  kg === w
                    ? 'border-primary bg-primary text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                {weightLabel(w)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:bg-primary-container"
          >
            <Icon name="shopping_cart" className="text-[20px]" />
            أضف إلى السلة
          </button>
        </div>
      </div>
    </article>
  )
}
