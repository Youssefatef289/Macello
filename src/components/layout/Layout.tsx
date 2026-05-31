import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFab } from './WhatsAppFab'
import { CartDrawer } from '../cart/CartDrawer'
import { CartToast } from '../cart/CartToast'
import { FixedContactButtons } from './FixedContactButtons'
import { MobileBottomNav } from './MobileBottomNav'
import { ScrollToTopFab } from './ScrollToTopFab'

export function Layout() {
  return (
    <div className="relative min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CartToast />
      <WhatsAppFab />
      <FixedContactButtons />
      <ScrollToTopFab />
      <MobileBottomNav />
    </div>
  )
}
