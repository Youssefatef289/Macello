import { Link } from 'react-router-dom'
import {
  facebookHref,
  locationHref,
  locationLabel,
  phoneDisplay,
  phoneHref,
  whatsappHref,
} from '../../data/site'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 py-12 text-right md:grid-cols-3">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <img
              src="/img/logo-black.png"
              alt="ماتشيللو"
              className="h-20 w-100 max-w-[300px] object-cover "
              width={300}
              height={100}
            />
            <div className="flex items-center gap-2">
              <a
                href={facebookHref}
                target="_blank"
                rel="noreferrer"
                className="opacity-80 transition-opacity hover:opacity-100"
                aria-label="فيسبوك"
              >
                <img src="/img/icons/Facebook.svg" alt="" className="h-9 w-9" width={36} height={36} />
              </a>
            </div>
          </div>
          <p className="text-sm leading-relaxed font-light text-zinc-500">
            جزارة عصرية فاخرة تقدم أجود أنواع اللحوم البلدي في مصر مع ضمان
            الجودة والنظافة في كل قطعة.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-semibold tracking-wider text-zinc-900 uppercase">
            روابط سريعة
          </h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-sm font-light text-zinc-500 hover:underline">
                سياسة التوصيل
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-zinc-500 hover:underline">
                الشروط والأحكام
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-zinc-500 hover:underline">
                الأسئلة الشائعة
              </a>
            </li>
            <li>
              <Link to="/products" className="text-sm font-light text-zinc-500 hover:underline">
                تصفح المنتجات
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-semibold tracking-wider text-zinc-900 uppercase">
            تواصل معنا
          </h4>
          <div className="space-y-3 text-sm text-zinc-600">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-end gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-primary"
            >
              <span>{phoneDisplay}</span>
              <span className="font-semibold text-primary">واتساب</span>
            </a>
            <a
              href={phoneHref}
              className="flex items-center justify-end gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-primary"
            >
              <span>{phoneDisplay}</span>
              <span className="font-semibold text-primary">هاتف</span>
            </a>
            <a
              href={locationHref}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-right transition-colors hover:border-primary"
            >
              <span className="mb-1 block font-semibold text-primary">اللوكيشن</span>
              <span className="text-xs text-zinc-500">{locationLabel}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 bg-zinc-100 py-6">
        <div className="mx-auto max-w-7xl px-8 text-center text-sm font-light text-zinc-500">
          © ٢٠٢٤ ماتشيللو - جزارة عصرية فاخرة. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
