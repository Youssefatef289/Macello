import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { useCart } from '../../context/CartContext'
import { Icon } from '../ui/Icon'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { whatsappHref } from '../../data/site'

export function Header() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isHomeTransparent = isHome && !isScrolled
  const logoSrc = `${import.meta.env.BASE_URL}img/${isHomeTransparent ? 'logo-white.png' : 'logo-black.png'}`
  const logoFallback = `${import.meta.env.BASE_URL}img/logo.png`

  useEffect(() => {
    if (!isHome) {
      return
    }

    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header
      className={
        isHomeTransparent
          ? 'absolute inset-x-0 top-0 z-50 border-b-0 bg-transparent'
          : 'sticky top-0 z-40 border-b border-zinc-200 bg-white'
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="ماتشيللو — الصفحة الرئيسية"
        >
          <img
            src={logoSrc}
            alt="ماتشيللو"
            className="h-20 w-60 max-w-[300px] object-cover"
            width={200}
            height={100}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = logoFallback
            }}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.to.startsWith('#') ? (
              <a
                key={item.label}
                href={item.to}
                className={[
                  'text-right text-base transition-colors',
                  isHomeTransparent
                    ? 'text-white/85 hover:text-white'
                    : 'text-zinc-600 hover:text-red-700',
                ].join(' ')}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'text-right text-base transition-colors',
                    isActive
                      ? isHomeTransparent
                        ? 'border-b-2 border-red-300 pb-1 font-bold text-white'
                        : 'border-b-2 border-red-800 pb-1 font-bold text-red-800'
                      : isHomeTransparent
                        ? 'text-white/85 hover:text-white'
                        : 'text-zinc-600 hover:text-red-700',
                  ].join(' ')
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
           
          
          </div>
          <Link
            to="/cart"
            className={[
              'relative p-2 transition-colors',
              isHomeTransparent ? 'text-white/90 hover:text-white' : 'text-zinc-700 hover:text-primary',
            ].join(' ')}
            aria-label="سلة المشتريات"
          >
            <Icon name="shopping_cart" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-on-primary">
              {cartCount}
            </span>
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="md:hidden rounded-full bg-green-600 p-2 text-white"
            aria-label="واتساب"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label="القائمة"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className={[
            'border-t px-6 py-4 md:hidden',
            isHomeTransparent ? 'border-white/10' : 'border-zinc-100',
          ].join(' ')}
        >
          <div className="flex flex-col gap-3 text-right">
            {navItems.map((item) =>
              item.to.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.to}
                  className={isHomeTransparent ? 'text-white/85' : 'text-zinc-600'}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? isHomeTransparent
                        ? 'font-bold text-white'
                        : 'font-bold text-red-800'
                      : isHomeTransparent
                        ? 'text-white/85'
                        : 'text-zinc-600'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

