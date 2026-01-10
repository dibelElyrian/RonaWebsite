'use client'

import { CartProvider } from '@/lib/CartContext'

export default function ShopContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
