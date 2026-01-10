'use client'

import { useCart } from '@/lib/CartContext'
import { useState } from 'react'
import CheckoutForm from './CheckoutForm'

export default function CartDrawer() {
  const { items, removeItem, isCartOpen, setIsCartOpen, cartTotal } = useCart()
  const [isCheckout, setIsCheckout] = useState(false)

  if (!isCartOpen) return null

  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop: translucent black with blur for better context retention */}
      <div 
        className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {isCheckout ? (
                  <CheckoutForm onSuccess={() => { setIsCheckout(false); setIsCartOpen(false); }} onCancel={() => setIsCheckout(false)} />
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {items.length === 0 ? (
                           <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                        ) : (
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {item.image ? (
                                        <img
                                          src={item.image}
                                          alt={item.title}
                                          className="h-full w-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                                    )}
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/products/${item.id}`}>{item.title}</a>
                                        </h3>
                                        <p className="ml-4">₱{item.price.toLocaleString()}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty 1</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₱{cartTotal.toLocaleString()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          disabled={items.length === 0}
                          onClick={() => setIsCheckout(true)}
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
