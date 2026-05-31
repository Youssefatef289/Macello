import { Link } from 'react-router-dom'
import { featuredProducts, heroImage, poultryProducts } from '../data/products'
import { Icon } from '../components/ui/Icon'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { whatsappHref } from '../data/site'
import { useCart } from '../context/CartContext'
import { ProductCard } from '../components/products/ProductCard'
import { RevealOnScroll } from '../components/animation/RevealOnScroll'

function MobileAutoSlider<T>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
}) {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const advance = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 4
      const nextScrollLeft =
        track.scrollLeft >= maxScrollLeft
          ? 0
          : Math.min(track.scrollLeft + track.clientWidth * 0.92, maxScrollLeft)

      track.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
    }

    const intervalId = window.setInterval(advance, 2800)
    return () => window.clearInterval(intervalId)
  }, [items.length])

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div key={index} className="w-[86%] shrink-0 snap-center">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  const { addToCart } = useCart()
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(featuredProducts.map((p) => [p.id, 0.5])),
  )
  const poultry = poultryProducts.slice(0, 4)
  const [poultryWeights, setPoultryWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(poultry.map((p) => [p.id, 0.5])),
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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
            ].map((f, index) => (
              <RevealOnScroll key={f.title} delayMs={index * 90}>
                <div className="group rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 text-right transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
                    <Icon name={f.icon} filled={f.fill} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-zinc-900">{f.title}</h3>
                  <p className="text-zinc-600">{f.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 text-right lg:order-1">
            <span className="mb-3 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-primary">
              من نحن
            </span>
            <h2 className="mb-4 text-3xl font-black text-zinc-900 md:text-4xl">
              خبرة وجودة في كل قطعة لحم
            </h2>
            <p className="mb-6 leading-8 text-zinc-600">
              ماتشيللو جزارة عصرية تجمع بين الخبرة التقليدية والتجهيز الحديث.
              نختار أفضل اللحوم يوميًا ونوفرها بتقطيع احترافي وتغليف آمن مع سرعة
              توصيل عالية لخدمة الأسر والمطاعم.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: 'verified', text: 'جودة مضمونة برقابة مستمرة' },
                { icon: 'bolt', text: 'تنفيذ الطلبات بسرعة وكفاءة' },
                { icon: 'support_agent', text: 'فريق دعم متاح للمتابعة' },
                { icon: 'sell', text: 'أسعار عادلة وخيارات متعددة' },
              ].map((item) => (
                <div key={item.text} className="flex items-center justify-end gap-2 rounded-xl border border-zinc-200 p-3 text-sm">
                  <span>{item.text}</span>
                  <Icon name={item.icon} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="/img/home/home-1.jpeg"
              alt="من نحن"
              loading="lazy"
              decoding="async"
              className="h-[360px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-4 text-right">
          <div>
            <h2 className="mb-2 text-3xl font-black text-zinc-900">اللحوم الطازجة</h2>
            <p className="text-zinc-500">اختيارات يومية من اللحوم مع تسعير واضح حسب الوزن</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4"
          >
            عرض كل المنتجات
            <Icon name="chevron_left" />
          </Link>
        </div>

        <div className="min-w-0">
          <MobileAutoSlider
            items={featuredProducts}
            renderItem={(p) => {
              const w = weights[p.id] ?? 0.5
              return (
                <ProductCard
                  product={p}
                  kg={w}
                  compactOnMobile
                  onKgChange={(kg) => setWeights((prev) => ({ ...prev, [p.id]: kg }))}
                  onAdd={() => {
                    addToCart({
                      productId: p.id,
                      name: p.name,
                      image: p.image,
                      imageAlt: p.imageAlt,
                      weightKg: w,
                      pricePerKg: p.pricePerKg,
                    })
                  }}
                />
              )
            }}
          />

          <div className="hidden grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid lg:grid-cols-4 lg:gap-6">
            {featuredProducts.map((p, index) => {
              const w = weights[p.id] ?? 0.5
              return (
                <RevealOnScroll key={p.id} delayMs={Math.min(index * 70, 250)}>
                  <ProductCard
                    product={p}
                    kg={w}
                    compactOnMobile
                    onKgChange={(kg) => setWeights((prev) => ({ ...prev, [p.id]: kg }))}
                    onAdd={() => {
                      addToCart({
                        productId: p.id,
                        name: p.name,
                        image: p.image,
                        imageAlt: p.imageAlt,
                        weightKg: w,
                        pricePerKg: p.pricePerKg,
                      })
                    }}
                  />
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-10 flex items-end justify-between gap-4 text-right">
          <div>
            <h2 className="mb-2 text-3xl font-black text-zinc-900">الدواجن الطازجة</h2>
            <p className="text-zinc-500">اختيارات يومية من الدواجن مع تسعير واضح حسب الوزن</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4"
          >
            عرض المزيد
            <Icon name="chevron_left" />
          </Link>
        </div>

        <div className="min-w-0">
          <MobileAutoSlider
            items={poultry}
            renderItem={(p) => {
              const w = poultryWeights[p.id] ?? 0.5
              return (
                <ProductCard
                  product={p}
                  kg={w}
                  compactOnMobile
                  onKgChange={(kg) =>
                    setPoultryWeights((prev) => ({ ...prev, [p.id]: kg }))
                  }
                  onAdd={() => {
                    addToCart({
                      productId: p.id,
                      name: p.name,
                      image: p.image,
                      imageAlt: p.imageAlt,
                      weightKg: w,
                      pricePerKg: p.pricePerKg,
                    })
                  }}
                />
              )
            }}
          />

          <div className="hidden grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid lg:grid-cols-4 lg:gap-6">
            {poultry.map((p, index) => {
              const w = poultryWeights[p.id] ?? 0.5
              return (
                <RevealOnScroll key={p.id} delayMs={Math.min(index * 70, 250)}>
                  <ProductCard
                    product={p}
                    kg={w}
                    compactOnMobile
                    onKgChange={(kg) =>
                      setPoultryWeights((prev) => ({ ...prev, [p.id]: kg }))
                    }
                    onAdd={() => {
                      addToCart({
                        productId: p.id,
                        name: p.name,
                        image: p.image,
                        imageAlt: p.imageAlt,
                        weightKg: w,
                        pricePerKg: p.pricePerKg,
                      })
                    }}
                  />
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-black text-zinc-900">من مطبخ ماتشيللو</h2>
          <p className="text-zinc-500">صور مختارة من منتجاتنا وتجهيزاتنا اليومية</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { src: '/img/home/home-1.jpeg', alt: 'تجهيز لحوم ماتشيللو' },
            { src: '/img/home/home-2.jpeg', alt: 'منتجات ماتشيللو' },
            { src: '/img/home/home-3.jpeg', alt: 'تشكيلة لحوم طازجة' },
          ].map((img, index) => (
            <RevealOnScroll key={img.src} delayMs={index * 90} y={20}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-72 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-black text-zinc-900">لماذا تختارنا</h2>
            <p className="text-zinc-500">مزايا حقيقية تجعل تجربة الشراء أسهل وأضمن</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'خبرة تقطيع احترافية',
                text: 'فريق متخصص يجهز كل قطعة حسب طلبك بدقة عالية.',
                icon: 'content_cut',
              },
              {
                title: 'رقابة بيطرية مستمرة',
                text: 'فحص يومي لكل الذبائح لضمان السلامة والجودة.',
                icon: 'health_and_safety',
              },
              {
                title: 'خدمة عملاء سريعة',
                text: 'متواجدون دائمًا للرد على الاستفسارات وتعديل الطلبات.',
                icon: 'headset_mic',
              },
              {
                title: 'أسعار مناسبة',
                text: 'تسعير واضح وتنوع يناسب كل الاحتياجات.',
                icon: 'savings',
              },
            ].map((item, index) => (
              <RevealOnScroll key={item.title} delayMs={index * 80} y={20}>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-right transition-colors hover:border-primary/40">
                  <Icon name={item.icon} className="mb-3 text-3xl text-primary" />
                  <h3 className="mb-2 text-xl font-bold text-zinc-900">{item.title}</h3>
                  <p className="text-sm text-zinc-600">{item.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-black text-zinc-900">آراء العملاء</h2>
            <p className="text-zinc-500">تقييمات حقيقية من عملائنا عن الجودة والخدمة</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                name: 'أحمد خالد',
                review:
                  'الجودة ممتازة واللحمة طازجة جدًا، والتوصيل كان سريع وفي معاده بالضبط.',
              },
              {
                name: 'سارة محمد',
                review:
                  'تغليف نظيف جدًا وتعامل محترم، وطلبت أكثر من مرة وكل مرة نفس المستوى.',
              },
              {
                name: 'محمود علي',
                review:
                  'أفضل جزارة جربتها في بني سويف، الأسعار واضحة والخدمة ممتازة.',
              },
            ].map((item, index) => (
              <RevealOnScroll key={item.name} delayMs={index * 90} y={18}>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 flex items-center justify-end gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Icon key={`${item.name}-${starIndex}`} name="star" filled />
                    ))}
                  </div>
                  <p className="mb-4 leading-7 text-zinc-600">{item.review}</p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold text-zinc-900">{item.name}</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon name="person" />
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

