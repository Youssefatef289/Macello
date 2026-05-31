import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../ui/Icon'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { formatEgp } from '../../data/products'
import { whatsappHref } from '../../data/site'
import { useCart } from '../../context/CartContext'

function weightLabel(kg: number) {
  const value = kg.toLocaleString('ar-EG', {
    minimumFractionDigits: kg % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
  return `${value} كجم`
}

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    subtotalEgp,
    closeCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    cartCount,
    orderNotes,
    setOrderNotes,
  } = useCart()

  useEffect(() => {
    if (!isCartOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onEsc)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onEsc)
    }
  }, [isCartOpen, closeCart])

  const whatsappText = [
    'مرحباً، أريد طلب المنتجات التالية:',
    '',
    ...items.map(
      (item) =>
        `* ${item.name} (${weightLabel(item.weightKg)}) × ${item.quantity} = ${item.unitPriceEgp * item.quantity} EGP`,
    ),
    '',
    `إجمالي الطلب: ${subtotalEgp} EGP`,
    ...(orderNotes ? ['', 'ملاحظات الطلب:', orderNotes] : []),
  ].join('\n')

  const whatsappOrderLink = `${whatsappHref}?text=${encodeURIComponent(whatsappText)}`

  if (typeof document === 'undefined' || !isCartOpen) return null

  return createPortal(
    <div
      className={[
        'fixed inset-0 transition',
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      style={{ zIndex: 9999 }}
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        onClick={closeCart}
        className={[
          'absolute inset-0 z-0 bg-zinc-950/45 backdrop-blur-[2px] animate-[fadeIn_.28s_ease-out_forwards]',
        ].join(' ')}
        aria-label="إغلاق السلة"
        tabIndex={isCartOpen ? 0 : -1}
      />

      <aside
        className={[
          'absolute inset-y-0 left-0 z-10 flex h-dvh w-[min(100vw,28rem)] max-w-none flex-col overflow-hidden border-r border-white/40 bg-white/95 shadow-2xl shadow-black/30 backdrop-blur-xl',
          'animate-[slideInFromLeft_.34s_cubic-bezier(.22,1,.36,1)_forwards]',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200/70 bg-gradient-to-l from-zinc-50 to-white px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeCart}
              className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
              aria-label="إغلاق"
            >
              <Icon name="close" />
            </button>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-50"
              >
                افراغ السلة
              </button>
            ) : null}
          </div>
          <div className="text-right">
            <h2 id="cart-title" className="text-lg font-bold text-zinc-900">
              سلة المشتريات
            </h2>
            <p className="text-xs text-zinc-500">{cartCount} منتج</p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 [scrollbar-width:thin] sm:p-5">
          {items.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/90 p-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-600">
                <Icon name="shopping_cart" />
              </div>
              <p className="mb-1 font-semibold text-zinc-800">السلة فارغة</p>
              <p className="text-sm text-zinc-500">
                اختر منتجاتك وسيتم عرضها هنا بشكل منظم.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={[
                    'rounded-xl border border-zinc-200/90 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
                    isCartOpen ? 'animate-[cartItemIn_.35s_ease-out_forwards]' : '',
                  ].join(' ')}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1 text-right">
                      <p className="truncate font-semibold text-zinc-900">{item.name}</p>
                      <p className="text-xs text-zinc-500">{weightLabel(item.weightKg)}</p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        {formatEgp(item.unitPriceEgp)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        إجمالي المنتج: {formatEgp(item.unitPriceEgp * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-700 hover:underline"
                    >
                      حذف
                    </button>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-zinc-100"
                        aria-label="زيادة"
                      >
                        <Icon name="add" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-zinc-100"
                        aria-label="نقصان"
                      >
                        <Icon name="remove" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200/80 bg-white/95 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-zinc-600">الإجمالي</span>
            <span className="text-xl font-black text-primary">{formatEgp(subtotalEgp)}</span>
          </div>

          {items.length > 0 && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                ملاحظاتك على الطلب (اختياري)
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="مثال: بدون توابل، تقطيع ناعم، إلخ..."
                className="w-full rounded-lg border border-zinc-200 bg-white/50 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
              />
            </div>
          )}

          <a
            href={items.length > 0 ? whatsappOrderLink : undefined}
            target="_blank"
            rel="noreferrer"
            className={[
              'flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition',
              items.length > 0
                ? 'bg-green-600 hover:bg-green-700'
                : 'cursor-not-allowed bg-zinc-300',
            ].join(' ')}
            onClick={(event) => {
              if (items.length === 0) event.preventDefault()
            }}
            aria-disabled={items.length === 0}
          >
            <WhatsAppIcon className="h-5 w-5" />
            اطلب عبر واتساب
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  )
}
