/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const CART_STORAGE_KEY = 'machella_cart_v1'

export type CartItem = {
  id: string
  productId: string
  name: string
  image: string
  imageAlt: string
  weightKg: number
  quantity: number
  unitPriceEgp: number
}

type AddToCartInput = {
  productId: string
  name: string
  image: string
  imageAlt: string
  weightKg: number
  pricePerKg: number
}

type CartContextValue = {
  items: CartItem[]
  cartCount: number
  subtotalEgp: number
  isCartOpen: boolean
  toastMessage: string | null
  openCart: () => void
  closeCart: () => void
  addToCart: (input: AddToCartInput) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function lineUnitPrice(weightKg: number, pricePerKg: number) {
  return Math.round(weightKg * pricePerKg)
}

function itemKey(input: AddToCartInput) {
  return `${input.productId}-${input.weightKg}`
}

function toPositiveNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback
}

function normalizeStoredItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return []

  return raw
    .map((entry): CartItem | null => {
      if (!entry || typeof entry !== 'object') return null

      const candidate = entry as Partial<CartItem> & { priceEgp?: number }
      const productId = typeof candidate.productId === 'string' ? candidate.productId : ''
      const name = typeof candidate.name === 'string' ? candidate.name : ''
      const image = typeof candidate.image === 'string' ? candidate.image : ''

      if (!productId || !name || !image) return null

      const weightKg = toPositiveNumber(candidate.weightKg, 0.5)
      const quantity = Math.max(1, Math.round(toPositiveNumber(candidate.quantity, 1)))
      const unitPriceEgp = Math.round(
        toPositiveNumber(candidate.unitPriceEgp, toPositiveNumber(candidate.priceEgp, 0)),
      )

      return {
        id:
          typeof candidate.id === 'string' && candidate.id
            ? candidate.id
            : `${productId}-${weightKg}`,
        productId,
        name,
        image,
        imageAlt:
          typeof candidate.imageAlt === 'string' && candidate.imageAlt
            ? candidate.imageAlt
            : name,
        weightKg,
        quantity,
        unitPriceEgp,
      }
    })
    .filter((item): item is CartItem => Boolean(item && item.unitPriceEgp > 0))
}

function readStoredItems() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return normalizeStoredItems(JSON.parse(raw) as unknown)
  } catch {
    window.localStorage.removeItem(CART_STORAGE_KEY)
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredItems)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage write failures so cart interactions still work in-memory.
    }
  }, [items])

  useEffect(() => {
    if (!toastMessage) return
    const timer = window.setTimeout(() => setToastMessage(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addToCart = useCallback((input: AddToCartInput) => {
    const id = itemKey(input)
    const unitPriceEgp = lineUnitPrice(input.weightKg, input.pricePerKg)

    setItems((prev) => {
      const found = prev.find((item) => item.id === id)
      if (found) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [
        ...prev,
        {
          id,
          productId: input.productId,
          name: input.name,
          image: input.image,
          imageAlt: input.imageAlt,
          weightKg: input.weightKg,
          quantity: 1,
          unitPriceEgp,
        },
      ]
    })
    setToastMessage(`تمت إضافة ${input.name} إلى السلة`)
  }, [])

  const increaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }, [])

  const decreaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const subtotalEgp = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPriceEgp * item.quantity, 0),
    [items],
  )

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotalEgp,
      isCartOpen,
      toastMessage,
      openCart,
      closeCart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
    }),
    [
      items,
      cartCount,
      subtotalEgp,
      isCartOpen,
      toastMessage,
      openCart,
      closeCart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
