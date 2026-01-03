'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductForm from '@/components/admin/ProductForm'

interface Product {
  id: number
  title: string
  brand: string
  size: number
  price: number
  condition: string
  status: string
  images: string[]
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting product')
    } else {
      fetchProducts()
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating status')
    } else {
      fetchProducts()
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management</h1>
      
      <ProductForm onProductAdded={fetchProducts} />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.brand} - Size {product.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'available' ? 'bg-green-100 text-green-800' : 
                      product.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                    <p className="text-sm text-gray-900 font-bold">${product.price}</p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Condition: {product.condition}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm sm:mt-0 space-x-2">
                    <button 
                      onClick={() => handleStatusChange(product.id, product.status === 'available' ? 'sold' : 'available')}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {product.status === 'available' ? 'Mark Sold' : 'Mark Available'}
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {products.length === 0 && !loading && (
            <li className="px-4 py-4 text-center text-gray-500">No products found. Add one above!</li>
          )}
        </ul>
      </div>
    </div>
  )
}
