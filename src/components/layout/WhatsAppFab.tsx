import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { whatsappHref } from '../../data/site'

export function WhatsAppFab() {
  return (
    <div className="pointer-events-none fixed bottom-8 left-8 z-50 hidden md:block">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto flex items-center gap-3 rounded-full bg-green-600 p-4 text-center font-bold text-white shadow-xl transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <div className="hidden text-right md:block">
          <div className="text-xs font-normal">تواصل مباشر</div>
          <div className="text-sm">اطلب الآن عبر واتساب</div>
        </div>
      </a>
    </div>
  )
}

