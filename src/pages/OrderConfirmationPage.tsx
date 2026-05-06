import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { whatsappHref } from '../data/site'

export function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-tertiary-fixed text-tertiary shadow-sm">
          <Icon name="check_circle" className="text-5xl" filled />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          شكراً لثقتك في ماتشيللو!
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-secondary">
          تم استلام طلبك بنجاح. نحن الآن نقوم بتجهيز أجود قطع اللحم البلدي المختارة
          بعناية لتصلك طازجة.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50/50 p-8 md:flex-row">
          <div className="text-center md:text-right">
            <p className="mb-1 text-xs tracking-wider text-secondary uppercase">رقم الطلب</p>
            <p className="text-xl font-semibold text-on-surface">#MST-882910</p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-tertiary-fixed-dim" />
            <span className="text-sm font-semibold text-on-tertiary-fixed-variant">
              جاري المراجعة والتجهيز
            </span>
          </div>
        </div>

        <div className="p-8">
          <h2 className="mb-6 text-right text-xl font-semibold text-on-surface">ملخص الطلب</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {[
                {
                  title: 'موزة بقري بلدي',
                  sub: 'الوزن: ١ كجم',
                  price: '٤٥٠ ج.م',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQEbyxrHhMsQYx4UPww1UnJQuztPZ-Abg9UY2zIAEIa_e_jAtgl9izIC0groX8fOqWUBD2lorbpWTxRIxvWgDfE74ElTtgZGbLLpZPQwQsS9ne_nYq72QBEUbuwYQ3D44i928GB9TdAyQoYPeD4cmBy88_u8Pz7gi0BIEwuTD7tooJ9vf0rfyYaFjjG7C8mYhXmrkHi_hRbxPlPbYp9k30f5BxwIABYcEkv3250gk2QR1mBIJ7GMVCkf7zVOQsQHM8VnMYTJsnNad',
                },
                {
                  title: 'لحم مفروم قليل الدسم',
                  sub: 'الوزن: ٠.٥ كجم',
                  price: '٢١٠ ج.م',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoJI5Y3aATqwVQspEt9JBFx-LG9Bd8fS7mEdTxCsc1KJ5vPfzgN2twB131QgtvhXgDTtN9VJJd2e1Vl-Msehq1S9-XEXvYkRCQEpdqiTRkpUvXhNxe2qAG9mqagiDIwYONpfLVCJiyJSWFx21uSZJE82pcuSnqpdNLZlAvwcemqyxvhoAXmkLvb0dHBUeh-UziXl3jBdtNNUp_lUsWY8w0H_5XaGFdE-2XlzeC2cKf09dQQFUB_B8LOp45Vmih7Q1nbNV0OkCI3bi-',
                },
              ].map((row) => (
                <div
                  key={row.title}
                  className="flex items-center gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-zinc-100 hover:bg-zinc-50"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <img src={row.img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <p className="text-sm font-semibold text-on-surface">{row.title}</p>
                    <p className="text-xs text-secondary">{row.sub}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-primary">{row.price}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-zinc-100 bg-surface-container-low p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-secondary">المجموع الفرعي</span>
                  <span className="text-on-surface">٦٦٠ ج.م</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-secondary">خدمة التوصيل</span>
                  <span className="text-on-surface">٤٠ ج.م</span>
                </div>
                <div className="my-4 flex items-center justify-between border-t border-zinc-200 pt-4">
                  <span className="text-xl font-semibold text-on-surface">الإجمالي</span>
                  <span className="text-xl font-semibold text-primary">٧٠٠ ج.م</span>
                </div>
                <p className="mt-4 text-center text-xs text-secondary italic">
                  الدفع نقداً عند الاستلام
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-xl bg-tertiary-container p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row">
          <div className="rounded-full bg-white/10 p-4">
            <WhatsAppIcon className="h-8 w-8 text-tertiary-fixed" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h3 className="mb-2 text-xl font-semibold">تأكيد موعد التوصيل عبر واتساب</h3>
            <p className="text-base opacity-90">
              سيقوم أحد ممثلي خدمة العملاء بالتواصل معك خلال ١٥ دقيقة لتأكيد تفاصيل
              العنوان وموعد وصول مندوبنا.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-tertiary-fixed px-8 py-4 font-bold text-tertiary shadow-md transition-transform hover:scale-105"
          >
            <span>تواصل معنا الآن</span>
            <Icon name="arrow_back" />
          </a>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            icon: 'location_on' as const,
            t: 'عنوان التوصيل',
            d: 'القاهرة، المعادي، شارع النصر، مبنى رقم ١٢، الطابق الثالث',
          },
          {
            icon: 'restaurant' as const,
            t: 'ذبح يومي طازج',
            d: 'نضمن لك أعلى معايير النظافة والجودة من المزرعة إليك مباشرة',
          },
          {
            icon: 'call' as const,
            t: 'للمساعدة الفورية',
            d: 'اتصل بنا على: ١٩٩٨٨',
          },
        ].map((c) => (
          <div
            key={c.t}
            className="flex flex-col items-center rounded-xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
          >
            <Icon name={c.icon} className="mb-4 text-3xl text-primary" />
            <h4 className="mb-2 text-sm font-semibold">{c.t}</h4>
            <p className="text-xs text-secondary">{c.d}</p>
          </div>
        ))}
      </div>

      <p className="text-center">
        <Link to="/" className="font-semibold text-primary hover:underline">
          العودة للرئيسية
        </Link>
      </p>
    </div>
  )
}

