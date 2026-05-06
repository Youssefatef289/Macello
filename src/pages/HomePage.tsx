import { Link } from 'react-router-dom'
import { featuredProducts, formatEgp, heroImage, weightOptionsKg } from '../data/products'
import { useCart } from '../context/CartContext'
import { Icon } from '../components/ui/Icon'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { useState } from 'react'
import { locationHref, phoneDisplay, phoneHref, whatsappHref } from '../data/site'

function weightLabel(kg: number) {
  if (kg === 0.25) return '١/٤ كجم'
  if (kg === 0.5) return '١/٢ كجم'
  return '١ كجم'
}

export function HomePage() {
  const { addProduct } = useCart()
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(featuredProducts.map((p) => [p.id, 0.5])),
  )

  return (
    <>
      <section className="relative isolate min-h-dvh overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover "
            poster={heroImage}
          >
            <source src="/img/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-dvh max-w-5xl items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs text-white backdrop-blur md:text-sm">
              <Icon name="verified" className="text-base text-emerald-300" filled />
              ذبح يومي - توصيل مبرد - جودة مضمونة
            </div>
            <h1 className="mb-5 text-4xl leading-[1.25] font-black text-white md:mb-6 md:text-6xl">
              لحوم بلدي فاخرة
              <br />
              طازجة يوميًا من ماتشيللو
            </h1>
            <p className="mx-auto mb-9 max-w-2xl text-base leading-8 text-zinc-100 md:mb-10 md:text-xl">
              اختر قطعتك، حدد الوزن، واطلب في دقائق.
              <br className="hidden md:block" />
              نوصل لك الجودة بأسرع وقت وبأفضل تغليف.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to="/products"
                className="rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-800/40 transition-transform hover:-translate-y-1 md:px-8 md:py-4 md:text-base"
              >
                ابدأ الطلب الآن
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 md:px-8 md:py-4 md:text-base"
              >
                تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: 'schedule' as const,
                title: 'استجابة سريعة',
                text: 'تأكيد الطلب والرد خلال دقائق',
                fill: true,
              },
              {
                icon: 'health_and_safety' as const,
                title: 'تغليف آمن',
                text: 'تعبئة صحية تحفظ الطزاجة',
                fill: true,
              },
              {
                icon: 'local_shipping' as const,
                title: 'توصيل مبرد',
                text: 'سيارات مجهزة للحفاظ على الجودة',
                fill: true,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
                  <Icon name={f.icon} filled={f.fill} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-zinc-900">{f.title}</h3>
                <p className="text-zinc-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-4 text-right">
          <div>
            <h2 className="mb-2 text-3xl font-black text-zinc-900">أفضل المنتجات اليوم</h2>
            <p className="text-zinc-500">منتجات مختارة مع تسعير واضح حسب الوزن</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4"
          >
            عرض كل المنتجات
            <Icon name="chevron_left" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => {
            const w = weights[p.id] ?? 0.5
            const linePrice = Math.round(w * p.pricePerKg)
            return (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-5 text-center">
                  <h4 className="mb-3 text-xl font-bold text-zinc-900">{p.name}</h4>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {weightOptionsKg.map((kg) => (
                      <button
                        key={kg}
                        type="button"
                        onClick={() => setWeights((prev) => ({ ...prev, [p.id]: kg }))}
                        className={
                          w === kg
                            ? 'rounded-full bg-primary px-3 py-1 text-xs font-bold text-white'
                            : 'rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold transition-colors hover:border-primary'
                        }
                      >
                        {weightLabel(kg)}
                      </button>
                    ))}
                  </div>
                  <div className="mb-4 text-2xl font-black text-primary">{formatEgp(linePrice)}</div>
                  <div className="flex items-center justify-center gap-3">
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
                      onClick={() =>
                        addProduct({
                          productId: p.id,
                          name: p.name,
                          image: p.image,
                          imageAlt: p.imageAlt,
                          weightKg: w,
                          pricePerKg: p.pricePerKg,
                        })
                      }
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
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-black text-zinc-900">من مطبخ ماتشيللو</h2>
          <p className="text-zinc-500">صور مختارة من منتجاتنا وتجهيزاتنا اليومية</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <img
            src="/img/home/home-1.jpeg"
            alt="تجهيز لحوم ماتشيللو"
            className="h-72 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
          <img
            src="/img/home/home-2.jpeg"
            alt="منتجات ماتشيللو"
            className="h-72 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
          <img
            src="/img/home/home-3.jpeg"
            alt="تشكيلة لحوم طازجة"
            className="h-72 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="bg-zinc-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'خبرة تقطيع احترافية',
                text: 'فريق متخصص يجهز كل قطعة حسب طلبك بدقة عالية.',
              },
              {
                title: 'رقابة بيطرية مستمرة',
                text: 'فحص يومي لكل الذبائح لضمان السلامة والجودة.',
              },
              {
                title: 'خدمة عملاء سريعة',
                text: 'متواجدون دائمًا للرد على الاستفسارات وتعديل الطلبات.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-right transition-colors hover:bg-white/10"
              >
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-zinc-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="rounded-3xl bg-gradient-to-l from-zinc-900 via-zinc-800 to-zinc-900 p-10 text-white shadow-2xl">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">جاهز للطلب الآن؟</h2>
            <p className="mb-8 text-zinc-300">
              تواصل معنا مباشرة عبر واتساب أو اتصال هاتفي، أو افتح اللوكيشن للوصول إلينا.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-bold text-white transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
                اطلب عبر واتساب
              </a>
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-zinc-900 transition-transform hover:scale-105"
              >
                <Icon name="call" />
                {phoneDisplay}
              </a>
              <a
                href={locationHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                <Icon name="location_on" />
                اللوكيشن
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

