import { Link } from 'react-router-dom'
import {
  facebookHref,
  locationHref,
  locationLabel,
  phoneDisplay,
  phoneHref,
  whatsappDisplay,
  whatsappHref,
} from '../../data/site'

export function Footer() {
  return (
    <footer id="contact-us" className="mt-20 scroll-mt-24 border-t border-red-900/40 bg-gradient-to-b from-[#7a0f19] via-[#5f0d15] to-[#3f0a10] text-right text-red-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3 md:px-8">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <img
              src="/img/logo_-_white-removebg-preview.png"
              alt="ماتشيللو"
              className="h-30 w-100 max-w-[300px] object-cover drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
              width={300}
              height={100}
            />
            <div className="flex items-center gap-2">
              <a
                href={facebookHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/15 p-1.5 opacity-90 transition hover:bg-white/25 hover:opacity-100"
                aria-label="فيسبوك"
              >
                <img src="/img/icons/Facebook.svg" alt="" className="h-9 w-9" width={36} height={36} />
              </a>
            </div>
          </div>
          <p className="text-sm leading-relaxed font-light text-red-100/90">
            جزارة عصرية فاخرة تقدم أجود أنواع اللحوم البلدي في مصر مع ضمان
            الجودة والنظافة في كل قطعة.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
            روابط سريعة
          </h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-sm font-light text-red-100/90 transition hover:text-white hover:underline">
                سياسة التوصيل
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-red-100/90 transition hover:text-white hover:underline">
                الشروط والأحكام
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-red-100/90 transition hover:text-white hover:underline">
                الأسئلة الشائعة
              </a>
            </li>
            <li>
              <Link to="/products" className="text-sm font-light text-red-100/90 transition hover:text-white hover:underline">
                تصفح المنتجات
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
            تواصل معنا
          </h4>
          <div className="space-y-3 text-sm text-red-50">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur transition hover:bg-white/20"
            >
              <span className="font-semibold text-white">واتساب</span>
              <span dir="ltr" className="font-medium tracking-wide text-red-50">{whatsappDisplay}</span>
            </a>
            <a
              href={phoneHref}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur transition hover:bg-white/20"
            >
              <span className="font-semibold text-white">هاتف</span>
              <span dir="ltr" className="font-medium tracking-wide text-red-50">{phoneDisplay}</span>
            </a>
            <a
              href={locationHref}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-right backdrop-blur transition hover:bg-white/20"
            >
              <span className="mb-1 block font-semibold text-white">اللوكيشن</span>
              <span className="text-xs text-red-100/90">{locationLabel}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 bg-black/10 py-6">
        <div className="mx-auto max-w-7xl px-8 text-center text-sm font-light text-red-100">
          © ٢٠٢٤ ماتشيللو - جزارة عصرية فاخرة. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
