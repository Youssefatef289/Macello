/* eslint-disable react-refresh/only-export-components -- context + hook + types */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CartLine = {
  id: string
  productId: string
  name: string
  image: string
  imageAlt: string
  weightKg: number
  cutNote?: string
  priceEgp: number
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  cartCount: number
  subtotalEgp: number
  addProduct: (input: {
    productId: string
    name: string
    image: string
    imageAlt: string
    weightKg: number
    pricePerKg: number
    cutNote?: string
  }) => void
  setQuantity: (lineId: string, quantity: number) => void
  removeLine: (lineId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function linePrice(weightKg: number, pricePerKg: number) {
  return Math.round(weightKg * pricePerKg)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const addProduct = useCallback(
    (input: {
      productId: string
      name: string
      image: string
      imageAlt: string
      weightKg: number
      pricePerKg: number
      cutNote?: string
    }) => {
      const priceEgp = linePrice(input.weightKg, input.pricePerKg)
      const id = `${input.productId}-${input.weightKg}-${Date.now()}`
      setLines((prev) => [
        ...prev,
        {
          id,
          productId: input.productId,
          name: input.name,
          image: input.image,
          imageAlt: input.imageAlt,
          weightKg: input.weightKg,
          cutNote: input.cutNote,
          priceEgp,
          quantity: 1,
        },
      ])
    },
    [],
  )

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.id === lineId ? { ...l, quantity: Math.max(1, quantity) } : l,
        )
        .filter((l) => l.quantity > 0),
    )
  }, [])

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const subtotalEgp = useMemo(
    () => lines.reduce((sum, l) => sum + l.priceEgp * l.quantity, 0),
    [lines],
  )

  const cartCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      cartCount,
      subtotalEgp,
      addProduct,
      setQuantity,
      removeLine,
      clear,
    }),
    [lines, cartCount, subtotalEgp, addProduct, setQuantity, removeLine, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
