import { createPortal } from 'react-dom'
import { Icon } from '../ui/Icon'
import { useCart } from '../../context/CartContext'

export function CartToast() {
  const { toastMessage } = useCart()
  if (!toastMessage || typeof document === 'undefined') return null

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[210] flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
        <Icon name="check_circle" className="text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </div>,
    document.body,
  )
}
