import type { CatalogProduct } from '../../data/products'
import { formatEgp, weightOptionsKg } from '../../data/products'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { Icon } from '../ui/Icon'
import { whatsappHref } from '../../data/site'

function weightLabel(kg: number) {
  if (kg === 0.25) return '١/٤ كيلو'
  if (kg === 0.5) return '١/٢ كيلو'
  return '١ كيلو'
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
  const linePrice = Math.round(product.pricePerKg * kg)

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300',
        compactOnMobile ? 'p-2.5 sm:p-4' : 'p-3 sm:p-4',
        className ?? '',
      ].join(' ')}
    >
      {product.badge ? (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-white">
          {product.badge}
        </span>
      ) : null}

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-black/10 transition-transform hover:scale-105"
          aria-label="واتساب"
          title="واتساب"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black ring-1 ring-zinc-200 shadow-black/10 transition-transform hover:scale-105"
          aria-label="أضف للسلة"
          title="أضف للسلة"
        >
          <Icon name="shopping_cart" className="text-[22px]" />
        </button>
      </div>

      <div className="mt-5 text-right">
        <h3
          className={[
            'mb-1 truncate font-bold text-zinc-900',
            compactOnMobile ? 'text-sm sm:text-base' : 'text-base',
          ].join(' ')}
        >
          {product.name}
        </h3>
        <p
          className={[
            'mb-3 truncate text-secondary',
            compactOnMobile ? 'text-[11px] sm:text-xs' : 'text-xs',
          ].join(' ')}
        >
          {product.description}
        </p>

        <div
          className={[
            'mb-3 font-semibold text-primary',
            compactOnMobile ? 'text-lg sm:text-xl' : 'text-xl',
          ].join(' ')}
        >
          {formatEgp(linePrice)}{' '}
          <span className="text-sm font-normal text-on-background">/ تقدير</span>
        </div>

        <div
          className={[
            'mb-4 flex flex-wrap items-center justify-end',
            compactOnMobile ? 'gap-1.5 sm:gap-2' : 'gap-2',
          ].join(' ')}
        >
          {weightOptionsKg.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => onKgChange(w)}
              className={[
                'rounded-full border font-semibold transition',
                compactOnMobile ? 'px-2.5 py-1 text-[10px] sm:px-3 sm:text-[11px]' : 'px-3 py-1 text-[11px]',
                kg === w
                  ? 'border-primary bg-primary text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-primary hover:text-primary',
              ].join(' ')}
            >
              {weightLabel(w)}
            </button>
          ))}
        </div>

      </div>
    </article>
  )
}

