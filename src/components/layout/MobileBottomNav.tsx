import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { whatsappHref } from '../../data/site'
import { Icon } from '../ui/Icon'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

export function MobileBottomNav() {
  const { cartCount, openCart } = useCart()
  const location = useLocation()

  const itemClass = (active: boolean) =>
    [
      'flex min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-semibold transition-colors',
      active ? 'bg-primary/10 text-primary' : 'text-zinc-600',
    ].join(' ')

  return (
    <nav className="fixed inset-x-4 bottom-2 z-[90] rounded-xl border border-zinc-200 bg-white/95 p-1.5 shadow-xl backdrop-blur md:hidden">
      <div className="grid grid-cols-3 items-center gap-1 text-center">
        <Link to="/products" className={itemClass(location.pathname === '/products')}>
          <Icon name="storefront" className="text-[19px]" />
          <span>المنتجات</span>
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={itemClass(false)}
          aria-label="واتساب"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          <span>واتساب</span>
        </a>

        <button
          type="button"
          onClick={openCart}
          className={itemClass(false)}
          aria-label="السلة"
        >
          <span className="relative">
            <Icon name="shopping_cart" className="text-[19px]" />
            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">
              {cartCount}
            </span>
          </span>
          <span>السلة</span>
        </button>
      </div>
    </nav>
  )
}

