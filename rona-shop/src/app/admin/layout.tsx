'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import AdminTutorial from '@/components/admin/AdminTutorial'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold text-gray-800">Rona's Shop</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 fixed top-16 left-0 right-0 z-10 shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md font-medium">
              Inventory
            </Link>
            <Link href="/admin/orders" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md font-medium">
              Orders
            </Link>
            <Link href="/admin/analytics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md font-medium">
              Analytics
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openAdminTutorial'))}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md font-medium"
            >
              Help / Tutorial
            </button>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-md font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Rona's Shop</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className={`block px-6 py-3 hover:bg-gray-50 hover:text-indigo-600 ${pathname === '/admin' ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-700'}`}>
            Inventory
          </Link>
          <Link href="/admin/orders" className={`block px-6 py-3 hover:bg-gray-50 hover:text-indigo-600 ${pathname === '/admin/orders' ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-700'}`}>
            Orders
          </Link>
          <Link href="/admin/analytics" className={`block px-6 py-3 hover:bg-gray-50 hover:text-indigo-600 ${pathname === '/admin/analytics' ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-700'}`}>
            Analytics
          </Link>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openAdminTutorial'))}
            className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            Help / Tutorial
          </button>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
      <AdminTutorial />
    </div>
  )
}
