import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { Icon } from '../ui/Icon'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { whatsappHref } from '../../data/site'
import { useCart } from '../../context/CartContext'

export function Header() {
  const { cartCount, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
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

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return
    const sectionId = location.hash.replace('#', '')
    const target = document.getElementById(sectionId)
    if (!target) return
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  const goToSection = (sectionHash: string) => {
    setMenuOpen(false)
    const sectionId = sectionHash.replace('#', '')
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId)
      if (!target) return
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(`/${sectionHash}`)
  }

  return (
    <header
      className={
        isHomeTransparent
          ? 'absolute inset-x-0 top-0 z-50 border-b-0 bg-transparent'
          : 'sticky top-0 z-40 border-b border-zinc-200 bg-white'
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="ماتشيللو — الصفحة الرئيسية"
        >
          <img
            src={logoSrc}
            alt="ماتشيللو"
            className="h-14 w-44 max-w-[176px] object-cover sm:h-20 sm:w-60 sm:max-w-[300px]"
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
                onClick={(event) => {
                  event.preventDefault()
                  goToSection(item.to)
                }}
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

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-md shadow-black/20 transition-transform hover:scale-105"
              aria-label="واتساب"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={openCart}
              data-cart-target="true"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-black/20 transition-transform hover:scale-105"
              aria-label="سلة المشتريات"
            >
              <Icon name="shopping_cart" />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-primary">
                {cartCount}
              </span>
            </button>
          </div>
          <button
            type="button"
            className={[
              'p-2 md:hidden',
              isHomeTransparent ? 'text-white' : 'text-zinc-800',
            ].join(' ')}
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
                  onClick={(event) => {
                    event.preventDefault()
                    goToSection(item.to)
                  }}
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
