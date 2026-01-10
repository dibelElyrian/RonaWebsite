'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// We'll use a simple alert/toast system if hot-toast isn't installed, 
// but for cleaner code assuming simple alerts for now or I can add a toast provider later.

interface CartItem {
  id: number
  title: string
  price: number
  image: string | null
  size: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => boolean
  removeItem: (id: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('rona-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart')
      }
    }
  }, [])

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('rona-cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    // Check if item exists
    if (items.find(item => item.id === newItem.id)) {
      return false
    }
    
    setItems((currentItems) => [...currentItems, newItem])
    return true
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => total + item.price, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
