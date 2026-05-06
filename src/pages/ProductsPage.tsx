import { useMemo, useState } from 'react'
import {
  catalogProducts,
  formatEgp,
  weightOptionsKg,
  type CatalogProduct,
} from '../data/products'
import { useCart } from '../context/CartContext'
import { Icon } from '../components/ui/Icon'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { whatsappHref } from '../data/site'

function weightLabel(kg: number) {
  if (kg === 0.25) return '١/٤ كيلو'
  if (kg === 0.5) return '١/٢ كيلو'
  return '١ كيلو'
}

export function ProductsPage() {
  const { addProduct } = useCart()
  const [selectedWeight, setSelectedWeight] = useState<Record<string, number>>(
    () => Object.fromEntries(catalogProducts.map((p) => [p.id, 0.5])),
  )

  const trust = useMemo(
    () => [
      { icon: 'restaurant' as const, t: 'ذبح يومي', d: 'نضمن لك طزاجة اللحوم يومياً من مزارعنا الخاصة' },
      { icon: 'moped' as const, t: 'توصيل سريع', d: 'توصيل مبرد وآمن لباب منزلك خلال ٦٠ دقيقة' },
      { icon: 'verified' as const, t: 'جودة معتمدة', d: 'رقابة صحية صارمة على كافة مراحل التجهيز' },
    ],
    [],
  )

  const add = (p: CatalogProduct) => {
    const kg = selectedWeight[p.id] ?? 0.5
    addProduct({
      productId: p.id,
      name: p.name,
      image: p.image,
      imageAlt: p.imageAlt,
      weightKg: kg,
      pricePerKg: p.pricePerKg,
    })
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-l from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-right text-white md:p-12">
          <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative z-10">
            <h1 className="mb-4 text-3xl font-black md:text-4xl">قائمة اللحوم الفاخرة</h1>
            <p className="max-w-2xl text-sm text-zinc-200 md:text-base">
              اختر من منتجات طازجة يوميًا، مع عرض حديث وسريع للطلبات بأفضل تجربة بصرية.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              {[
                { src: '/img/icons/Home.svg', t: 'طزاجة يومية' },
                { src: '/img/icons/Profile.svg', t: 'تقطيع حسب الطلب' },
                { src: '/img/icons/Cart.svg', t: 'طلب سريع' },
              ].map((item) => (
                <div
                  key={item.t}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur"
                >
                  <img src={item.src} alt="" className="h-4 w-4" />
                  {item.t}
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {catalogProducts.map((p) => {
              const kg = selectedWeight[p.id] ?? 0.5
              return (
                <article
                  key={p.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {p.badge ? (
                      <span className="absolute top-4 left-4 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-white">
                        {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5 text-center">
                    <h3 className="mb-1 text-lg font-bold text-on-background md:text-xl">{p.name}</h3>
                    <p className="mb-4 text-xs text-secondary md:text-sm">{p.description}</p>
                    <div className="mb-5 text-xl font-semibold text-primary">
                      {formatEgp(p.pricePerKg)}{' '}
                      <span className="text-sm font-normal text-on-background">/ كيلو</span>
                    </div>
                    <div className="mb-5 flex flex-wrap justify-center gap-2">
                      {weightOptionsKg.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() =>
                            setSelectedWeight((prev) => ({ ...prev, [p.id]: w }))
                          }
                          className={
                            kg === w
                              ? 'rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white'
                              : 'rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold transition-colors hover:border-primary'
                          }
                        >
                          {weightLabel(w)}
                        </button>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-center gap-3">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white transition-transform hover:scale-105"
                        aria-label="اطلب عبر واتساب"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => add(p)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105"
                        aria-label="أضف للسلة"
                      >
                        <Icon name="add_shopping_cart" />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <section className="border-y border-zinc-200 bg-zinc-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 text-center md:grid-cols-3">
          {trust.map((x) => (
            <div key={x.t} className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-on-background text-white">
                <Icon name={x.icon} />
              </div>
              <h4 className="mb-2 text-sm font-semibold text-on-background">{x.t}</h4>
              <p className="text-xs text-secondary">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

