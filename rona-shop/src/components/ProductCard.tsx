'use client'

import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { useState } from 'react'

interface Product {
  id: number
  title: string
  brand: string
  size: number | string
  price: number
  condition: string
  status: string
  images: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [buttonState, setButtonState] = useState<'idle' | 'success' | 'existing'>('idle')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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
    <div className="group relative flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block flex-1">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {product.status !== 'available' && (
            <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
              {product.status}
            </div>
          )}
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.brand}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{product.title}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500">Size {product.size}</p>
          <p className="text-lg font-bold text-indigo-600">₱{product.price.toLocaleString()}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">Condition: {product.condition}</p>
      </Link>
      <div className="mt-4">
        {product.status === 'available' ? (
          <button
            onClick={handleAddToCart}
            disabled={buttonState !== 'idle'}
            className={`w-full py-2 px-4 rounded-md transition-all duration-300 transform font-medium text-sm text-white flex justify-center items-center overflow-hidden relative ${
              buttonState === 'success' 
                ? 'bg-green-600 shadow-lg scale-105' 
                : buttonState === 'existing'
                  ? 'bg-gray-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
             <span className={`absolute transition-all duration-300 ${buttonState === 'idle' ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
               Add to Cart
             </span>
             
             <span className={`absolute transition-all duration-300 flex items-center ${buttonState === 'success' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Added!
             </span>

             <span className={`absolute transition-all duration-300 ${buttonState === 'existing' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
               In Cart
             </span>
             
             {/* Invisible spacer to maintain width */}
             <span className="opacity-0">Add to Cart</span> 
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed font-medium text-sm"
          >
            {product.status === 'reserved' ? 'Reserved' : 'Sold'}
          </button>
        )}
      </div>
    </div>
  )
}
