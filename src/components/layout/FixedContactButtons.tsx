import { Icon } from '../ui/Icon'
import { facebookHref, phoneHref } from '../../data/site'

export function FixedContactButtons() {
  return (
    <div className="fixed right-4 bottom-6 z-[70] hidden flex-col gap-3 md:flex md:right-6 md:bottom-8">
      <a
        href={phoneHref}
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-black/25 transition-transform hover:scale-110"
        aria-label="اتصال هاتفي"
      >
        <Icon name="call" className="text-[22px]" />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg shadow-black/25 transition-transform hover:scale-110"
        aria-label="فيسبوك"
      >
        <img src="/img/icons/Facebook.svg" alt="" className="h-6 w-6" />
      </a>
    </div>
  )
}
