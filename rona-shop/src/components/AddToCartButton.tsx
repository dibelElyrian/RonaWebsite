'use client'

import { useCart } from '@/lib/CartContext'
import { useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  images: string[] | null
  size: string | number
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [buttonState, setButtonState] = useState<'idle' | 'success' | 'existing'>('idle')

  const handleAddToCart = () => {
    const success = addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0] : null,
      size: String(product.size)
    })
    
    if (success) {
      setButtonState('success')
      setTimeout(() => setButtonState('idle'), 2000)
    } else {
      setButtonState('existing')
      setTimeout(() => setButtonState('idle'), 2000)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={buttonState !== 'idle'}
      className={`w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-300 transform overflow-hidden relative ${
        buttonState === 'success' 
          ? 'bg-green-600 focus:ring-green-500 scale-105' 
          : buttonState === 'existing'
            ? 'bg-gray-800'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
        <span className={`absolute transition-all duration-300 ${buttonState === 'idle' ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          Add to Cart
        </span>
        
        <span className={`absolute transition-all duration-300 flex items-center ${buttonState === 'success' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          Added to Cart
        </span>

        <span className={`absolute transition-all duration-300 ${buttonState === 'existing' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Item Already in Cart
        </span>

        {/* Spacer */}
        <span className="opacity-0">Add to Cart</span>
    </button>
  )
}
