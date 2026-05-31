import { Icon } from '../ui/Icon'
import { whatsappNumber } from '../../data/site'
import { RevealOnScroll } from '../animation/RevealOnScroll'

export function SacrificeBooking() {
  const features = [
    {
      icon: 'fitness_center' as const,
      title: 'عجول بلدي عالية الجودة',
      description: 'أوزان من 400 لـ 600 كيلو',
    },
    {
      icon: 'check_circle' as const,
      title: 'تصافي لحم يصل إلى 60%',
      description: 'لحوم مميزة وطعم مختلف',
    },
    {
      icon: 'share' as const,
      title: 'اشترك حسب احتياجك',
      description: 'سهم أو أكثر بمرونة تامة',
    },
    {
      icon: 'schedule' as const,
      title: 'احجز بدري واستلم بدري',
      description: 'الذبح بأولوية الحجز بدون تأخير',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="text-right order-1 lg:order-2">
          <RevealOnScroll delayMs={0}>
            <span className="mb-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <Icon name="celebration" className="inline-block mr-1 text-sm" filled />
              عرض خاص
            </span>
          </RevealOnScroll>

          <RevealOnScroll delayMs={50}>
            <h2 className="mb-2 text-3xl font-black text-zinc-900 md:text-4xl">
              حجز الأضحية بدأ رسميًا
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delayMs={100}>
            <p className="mb-1 text-lg font-semibold text-primary">مع ماتشيلو</p>
            <p className="mb-6 leading-8 text-zinc-600">
              لو ناوي تضحّي السنة دي… إحنا وفرنالك أفضل اختيار يليق بيك
            </p>
          </RevealOnScroll>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <RevealOnScroll key={feature.title} delayMs={150 + index * 50}>
                <div className="group rounded-xl border border-green-100 bg-green-50/40 p-4 text-right transition-all duration-300 hover:border-primary hover:bg-primary/5">
                  <div className="mb-2 flex items-center justify-end gap-2">
                    <h3 className="text-sm font-bold text-zinc-900">
                      {feature.title}
                    </h3>
                    <Icon
                      name={feature.icon}
                      className="text-primary group-hover:scale-110 transition-transform"
                      filled
                    />
                  </div>
                  <p className="text-xs text-zinc-600">{feature.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* <RevealOnScroll delayMs={400}>
            <div className="mb-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 text-right">
              <p className="mb-2 text-xs font-semibold text-zinc-500">رقم التواصل</p>
              <p className="text-2xl font-black text-primary">01122997992</p>
            </div>
          </RevealOnScroll> */}

          <RevealOnScroll delayMs={450}>
            <a
              href={`https://wa.me/${whatsappNumber}?text=أريد حجز الأضحية للعيد`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/40 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-green-600/60"
            >
              <Icon name="chat" filled />
              تواصل عبر واتساب
            </a>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={100} className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-green-500/10 to-transparent blur-xl" />
            <img
              src="/img/Eid.jpg"
              alt="عجول أضحية"
              loading="lazy"
              decoding="async"
              className="relative h-[400px] w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/60 backdrop-blur px-4 py-3 text-white text-center">
              <p className="text-sm font-bold">عجول بلدي فاخرة</p>
              <p className="text-xs text-green-300">
                جودة عالية و أسعار عادلة
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
