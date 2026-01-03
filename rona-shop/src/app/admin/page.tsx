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
  const [processingId, setProcessingId] = useState<number | null>(null)

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

    setProcessingId(id)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting product: ' + error.message)
    } else {
      fetchProducts()
    }
    setProcessingId(null)
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    setProcessingId(id)
    const { error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating status')
    } else {
      fetchProducts()
    }
    setProcessingId(null)
  }

  const copyCaption = (product: Product) => {
    const productUrl = `${window.location.origin}/products/${product.id}`
    const caption = `🔥 FRESH DROP! 🔥
👟 ${product.title}
📏 Size: ${product.size} US
💰 Price: ₱${product.price.toLocaleString()}
✨ Condition: ${product.condition}

👉 Reserve here: ${productUrl}
#RonasThrift #SneakersPH`

    navigator.clipboard.writeText(caption)
    alert('Caption copied to clipboard!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management</h1>
      
      <ProductForm onProductAdded={fetchProducts} />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="bg-white hover:bg-gray-50 transition-colors duration-150">
              <div className="px-4 py-4 sm:px-6">
                
                {/* Main Content Container */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  
                  {/* Product Info */}
                  <div className="flex items-start space-x-4 w-full sm:w-auto">
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="h-16 w-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                         <p className="text-base font-medium text-indigo-600 truncate pr-2">{product.title}</p>
                         <p className="sm:hidden text-base font-bold text-gray-900">₱{product.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-gray-500">{product.brand} • Size {product.size}</p>
                      <div className="mt-1 flex items-center gap-2 sm:hidden">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'available' ? 'bg-green-100 text-green-800' : 
                          product.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Price & Status */}
                  <div className="hidden sm:flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'available' ? 'bg-green-100 text-green-800' : 
                      product.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                    <p className="text-sm text-gray-900 font-bold">₱{product.price.toLocaleString()}</p>
                  </div>

                </div>

                {/* Actions & Details Footer */}
                <div className="mt-4 sm:mt-2 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="font-medium mr-1">Condition:</span>
                    {product.condition}
                  </p>
                  
                  <div className="flex space-x-3 w-full sm:w-auto">
                    <button 
                      onClick={() => copyCaption(product)}
                      className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      title="Copy Social Media Caption"
                    >
                      📋 Copy
                    </button>
                    <button 
                      onClick={() => handleStatusChange(product.id, product.status === 'available' ? 'sold' : 'available')}
                      disabled={processingId === product.id}
                      className={`flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        product.status === 'available' 
                          ? 'text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500' 
                          : 'text-green-800 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                      }`}
                    >
                      {processingId === product.id ? 'Updating...' : (product.status === 'available' ? 'Mark Sold' : 'Mark Available')}
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      disabled={processingId === product.id}
                      className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === product.id ? 'Deleting...' : 'Delete'}
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
