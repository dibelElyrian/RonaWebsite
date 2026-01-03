'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Product {
  id: number
  title: string
  price: number
  cost_price: number
  status: string
  created_at: string
}

export default function AnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'sold')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching analytics:', error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }
    fetchSoldProducts()
  }, [])

  const totalSales = products.reduce((sum, p) => sum + p.price, 0)
  const totalCost = products.reduce((sum, p) => sum + (p.cost_price || 0), 0)
  const netProfit = totalSales - totalCost

  if (loading) return <div className="p-8">Loading analytics...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profit & Expense Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">₱{totalSales.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Cost</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">₱{totalCost.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Net Profit</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">₱{netProfit.toLocaleString()}</dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sold Items History</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {product.title}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Profit: ₱{(product.price - (product.cost_price || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Sold Price: ₱{product.price.toLocaleString()} | Cost: ₱{(product.cost_price || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-400 sm:mt-0">
                    <p>
                      Sold on {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {products.length === 0 && (
              <li className="px-4 py-4 text-center text-gray-500">No sold items yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
