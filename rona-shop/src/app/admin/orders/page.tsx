'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: number
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone: string
  status: string
  product: {
    title: string
    price: number
  }
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        product:products(title, price)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating order')
    } else {
      fetchOrders()
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders & Reservations</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      Order #{order.id} - {order.product?.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customer_name} ({order.customer_email})
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(order.id, 'completed')}
                            className="text-xs text-green-600 hover:text-green-900 border border-green-600 rounded px-2 py-1"
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => updateStatus(order.id, 'cancelled')}
                            className="text-xs text-red-600 hover:text-red-900 border border-red-600 rounded px-2 py-1"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {orders.length === 0 && !loading && (
            <li className="px-4 py-4 text-center text-gray-500">No orders yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
