import { useMemo, useState } from 'react'
import { catalogProducts } from '../data/products'
import { Icon } from '../components/ui/Icon'
import { useCart } from '../context/CartContext'
import { ProductCard } from '../components/products/ProductCard'

export function ProductsPage() {
  const { addToCart } = useCart()
  const [tab, setTab] = useState<'all' | 'meat' | 'poultry'>(() => 'all')
  const [selectedWeight, setSelectedWeight] = useState<Record<string, number>>(
    () => Object.fromEntries(catalogProducts.map((p) => [p.id, 0.5])),
  )

  const filteredProducts = useMemo(() => {
    if (tab === 'poultry') return catalogProducts.filter((p) => p.category === 'poultry')
    if (tab === 'meat') return catalogProducts.filter((p) => p.category !== 'poultry')
    return catalogProducts
  }, [tab])

  const trust = useMemo(
    () => [
      { icon: 'restaurant' as const, t: 'ذبح يومي', d: 'نضمن لك طزاجة اللحوم يومياً من مزارعنا الخاصة' },
      { icon: 'moped' as const, t: 'توصيل سريع', d: 'توصيل مبرد وآمن لباب منزلك خلال ٦٠ دقيقة' },
      { icon: 'verified' as const, t: 'جودة معتمدة', d: 'رقابة صحية صارمة على كافة مراحل التجهيز' },
    ],
    [],
  )

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-l from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-right text-white md:p-12">
          <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative z-10">
            <h1 className="mb-4 text-3xl font-black md:text-4xl">قائمة المنتجات</h1>
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

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setTab('all')}
              className={[
                'rounded-2xl px-4 py-2 text-sm font-bold transition',
                tab === 'all' ? 'bg-primary text-white' : 'text-zinc-600 hover:text-zinc-900',
              ].join(' ')}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setTab('meat')}
              className={[
                'rounded-2xl px-4 py-2 text-sm font-bold transition',
                tab === 'meat'
                  ? 'bg-primary text-white'
                  : 'text-zinc-600 hover:text-zinc-900',
              ].join(' ')}
            >
              اللحوم
            </button>
            <button
              type="button"
              onClick={() => setTab('poultry')}
              className={[
                'rounded-2xl px-4 py-2 text-sm font-bold transition',
                tab === 'poultry'
                  ? 'bg-primary text-white'
                  : 'text-zinc-600 hover:text-zinc-900',
              ].join(' ')}
            >
              الدواجن
            </button>
          </div>
          <div className="text-sm text-zinc-500">
            عدد المنتجات: <span className="font-bold text-zinc-900">{filteredProducts.length}</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => {
              const kg = selectedWeight[p.id] ?? 0.5
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  kg={kg}
                  onKgChange={(w) =>
                    setSelectedWeight((prev) => ({ ...prev, [p.id]: w }))
                  }
                  onAdd={() =>
                    addToCart({
                      productId: p.id,
                      name: p.name,
                      image: p.image,
                      imageAlt: p.imageAlt,
                      weightKg: kg,
                      pricePerKg: p.pricePerKg,
                    })
                  }
                  className="p-3 sm:p-3"
                />
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

