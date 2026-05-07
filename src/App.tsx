import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { ProductsPage } from './pages/ProductsPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order-confirmed" element={<OrderConfirmationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
