import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { formatEgp } from '../data/products'
import { whatsappHref } from '../data/site'

function weightLabel(kg: number) {
  const value = kg.toLocaleString('ar-EG', {
    minimumFractionDigits: kg % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
  return `${value} كجم`
}

export function CartPage() {
  const {
    items,
    subtotalEgp,
    cartCount,
    orderNotes,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    setOrderNotes,
  } = useCart()
  const navigate = useNavigate()

  const whatsappText = [
    'مرحبًا، أريد طلب المنتجات التالية:',
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 text-right">
        <h1 className="mb-2 text-3xl font-black text-zinc-900 md:text-4xl">
          سلة المشتريات
        </h1>
        <p className="text-sm text-zinc-500 md:text-base">
          راجع المنتجات وعدّل الكميات قبل إتمام الطلب.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200 text-zinc-600">
            <Icon name="shopping_cart" />
          </div>
          <p className="mb-2 text-lg font-bold text-zinc-800">السلة فارغة حاليًا</p>
          <p className="mb-6 text-sm text-zinc-500">
            أضف منتجاتك أولًا وسيظهر ملخص الطلب هنا.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-95"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-28 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />

                  <div className="min-w-0 flex-1 text-right">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-sm font-medium text-red-700 transition hover:underline"
                      >
                        حذف
                      </button>
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-zinc-900">
                          {item.name}
                        </h2>
                        <p className="text-sm text-zinc-500">
                          الوزن: {weightLabel(item.weightKg)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 p-1">
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-zinc-100"
                          aria-label="زيادة الكمية"
                        >
                          <Icon name="add" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-zinc-100"
                          aria-label="تقليل الكمية"
                        >
                          <Icon name="remove" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-zinc-500">سعر الوحدة</p>
                        <p className="text-sm font-semibold text-zinc-800">
                          {formatEgp(item.unitPriceEgp)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-zinc-500">الإجمالي</p>
                        <p className="text-lg font-black text-primary">
                          {formatEgp(item.unitPriceEgp * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <div className="mb-5 border-b border-zinc-100 pb-4 text-right">
              <h2 className="text-xl font-bold text-zinc-900">ملخص الطلب</h2>
              <p className="text-sm text-zinc-500">{cartCount} منتج في السلة</p>
            </div>

            <div className="mb-6 space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">إجمالي المنتجات</span>
                <span className="font-semibold text-zinc-900">
                  {formatEgp(subtotalEgp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">التوصيل</span>
                <span className="font-semibold text-emerald-700">يحدد عند التأكيد</span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 pt-3">
                <span className="text-lg font-bold text-zinc-900">الإجمالي</span>
                <span className="text-2xl font-black text-primary">
                  {formatEgp(subtotalEgp)}
                </span>
              </div>
            </div>

            <div className="mb-6 text-right">
              <label
                htmlFor="order-notes"
                className="mb-2 block text-sm font-semibold text-zinc-700"
              >
                ملاحظاتك على الطلب
              </label>
              <textarea
                id="order-notes"
                value={orderNotes}
                onChange={(event) => setOrderNotes(event.target.value)}
                placeholder="مثال: بدون توابل، تقطيع ناعم، وقت تواصل مناسب، أو أي ملاحظة تحب نرسلها مع الطلب."
                className="min-h-28 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
              <p className="mt-2 text-xs text-zinc-500">
                سيتم إرسال هذه الملاحظات تلقائيًا في رسالة الواتساب مع تفاصيل الطلب.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappOrderLink}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                اطلب عبر واتساب
              </a>

              <button
                type="button"
                onClick={() => {
                  clearCart()
                  navigate('/order-confirmed')
                }}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                إتمام الطلب
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                إفراغ السلة
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
