'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items, setIsCartOpen } = useCart()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black tracking-tighter text-indigo-600">RONA'S</span>
              <span className="text-2xl font-bold tracking-tighter text-gray-900 ml-1">THRIFT</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-transparent text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                New Drops
              </Link>
              <Link href="/shop" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                All Shoes
              </Link>
              <Link href="/feedback" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Feedback
              </Link>
            </div>
          </div>
          
          {/* Desktop Right Menu */}
          <div className="hidden sm:flex items-center space-x-4">
             <button
              onClick={() => setIsCartOpen(true)}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center relative"
            >
              <span className="sr-only">Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openCustomerTutorial'))}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <span className="mr-1">❓</span> Help
            </button>
            <Link href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden space-x-2">
             <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <span className="sr-only">Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open. */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              New Drops
            </Link>
            <Link 
              href="/shop" 
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Shoes
            </Link>
            <Link 
              href="/feedback" 
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Leave Feedback
            </Link>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openCustomerTutorial'))
                setIsMenuOpen(false)
              }}
              className="w-full text-left border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              ❓ Help / Tutorial
            </button>
            <Link 
              href="/login" 
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
