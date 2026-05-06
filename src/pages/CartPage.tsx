import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Icon } from '../components/ui/Icon'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { formatEgp } from '../data/products'

import { whatsappHref } from '../data/site'

function weightAr(kg: number) {
  const n = kg.toLocaleString('ar-EG', { minimumFractionDigits: kg % 1 ? 1 : 0 })
  return `${n} كجم`
}

export function CartPage() {
  const { lines, subtotalEgp, setQuantity, removeLine, clear } = useCart()
  const navigate = useNavigate()
  const delivery = subtotalEgp > 0 ? 0 : 0

  return (
    <div className="mx-auto max-w-7xl px-6 py-xl">
      <div className="mb-lg text-right">
        <h1 className="mb-1 text-3xl font-bold text-primary">سلة المشتريات</h1>
        <p className="text-base text-secondary">
          راجع طلباتك قبل إتمام عملية الشراء عبر واتساب
        </p>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
          <p className="mb-6 text-lg text-zinc-600">السلة فارغة حالياً</p>
          <Link
            to="/products"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-on-primary"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
          <div className="space-y-md lg:col-span-2">
            {lines.map((line) => (
              <div
                key={line.id}
                className="group flex flex-col items-center gap-md rounded-xl border border-outline-variant bg-surface p-md transition-all hover:shadow-lg md:flex-row md:items-start"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-surface-container-highest md:w-32">
                  <img
                    src={line.image}
                    alt={line.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="w-full flex-1 space-y-1 text-right">
                  <h3 className="text-xl font-semibold text-on-surface">{line.name}</h3>
                  <p className="text-base text-secondary">منتج طازج من ماتشيللو</p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    <span className="rounded-full bg-primary-container px-2 py-1 text-xs font-medium text-on-primary-container">
                      الوزن: {weightAr(line.weightKg)}
                    </span>
                    {line.cutNote ? (
                      <span className="rounded-full bg-surface-container-high px-2 py-1 text-xs text-on-surface">
                        {line.cutNote}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-700 underline"
                    onClick={() => removeLine(line.id)}
                  >
                    حذف من السلة
                  </button>
                </div>
                <div className="flex w-full shrink-0 flex-col items-end gap-md md:w-auto">
                  <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white p-1">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-surface-container"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                      aria-label="زيادة"
                    >
                      <Icon name="add" />
                    </button>
                    <span className="w-8 text-center text-xl font-semibold">
                      {line.quantity.toLocaleString('ar-EG')}
                    </span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-surface-container"
                      onClick={() =>
                        line.quantity <= 1
                          ? removeLine(line.id)
                          : setQuantity(line.id, line.quantity - 1)
                      }
                      aria-label="تقليل"
                    >
                      <Icon name="remove" />
                    </button>
                  </div>
                  <p className="text-xl font-semibold text-primary">
                    {formatEgp(line.priceEgp * line.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 gap-md pt-lg md:grid-cols-2">
              <div className="flex items-center gap-md rounded-xl bg-secondary-container p-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Icon name="restaurant" />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-semibold text-on-surface">ذبح يومي طازج</h4>
                  <p className="text-xs text-secondary">نضمن لك أعلى جودة وأفضل طعم</p>
                </div>
              </div>
              <div className="flex items-center gap-md rounded-xl bg-secondary-container p-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Icon name="inventory_2" />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-semibold text-on-surface">تغليف آمن ومعزول</h4>
                  <p className="text-xs text-secondary">يصلك الطلب مبردًا ومغلفًا بعناية</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-xl border border-outline-variant bg-white p-md">
              <h3 className="mb-md border-b border-surface-container pb-sm text-right text-xl font-semibold">
                ملخص الطلب
              </h3>
              <div className="mb-lg space-y-2">
                <div className="flex items-center justify-between text-right">
                  <span className="text-base text-secondary">إجمالي المنتجات</span>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatEgp(subtotalEgp)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-right">
                  <span className="text-base text-secondary">رسوم التوصيل</span>
                  <span className="text-sm font-semibold text-green-700">
                    {delivery === 0 ? 'مجانًا' : formatEgp(delivery)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-surface-container pt-2 text-right">
                  <span className="text-xl font-semibold text-on-surface">الإجمالي النهائي</span>
                  <span className="text-xl font-semibold text-primary">
                    {formatEgp(subtotalEgp + delivery)}
                  </span>
                </div>
              </div>
              <div className="space-y-md">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-4 text-lg font-semibold text-white shadow-lg transition-transform active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  اطلب الآن عبر واتساب
                </a>
                <button
                  type="button"
                  onClick={() => {
                    clear()
                    navigate('/order-confirmed')
                  }}
                  className="w-full rounded-lg border border-zinc-200 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
                >
                  إتمام الطلب (تجربة)
                </button>
                <p className="text-center text-xs leading-relaxed text-secondary">
                  بالضغط على الطلب، سيتم توجيهك للمحادثة المباشرة لتأكيد العنوان وموعد
                  التوصيل.
                </p>
              </div>
              <div className="mt-lg space-y-3 border-t border-surface-container pt-md">
                <div className="flex items-center justify-end gap-2 text-secondary">
                  <span className="text-xs">دفع عند الاستلام</span>
                  <Icon name="payments" className="text-[20px]" />
                </div>
                <div className="flex items-center justify-end gap-2 text-secondary">
                  <span className="text-xs">توصيل سريع خلال ساعتين</span>
                  <Icon name="moped" className="text-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

