'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: number
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  status: string
  payment_reference: string
  product: {
    title: string
    price: number
  }
}    

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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
    setProcessingId(id)
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating order: ' + error.message)
    } else {
      fetchOrders()
    }
    setProcessingId(null)
  }

  const printLabel = (order: Order) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <html>
        <head>
          <title>Waybill - Order #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; border: 2px dashed #333; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .row { margin-bottom: 15px; }
            .label { font-weight: bold; font-size: 12px; color: #666; text-transform: uppercase; }
            .value { font-size: 16px; margin-top: 4px; }
            .address { white-space: pre-wrap; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Rona's Shoe Thrift Shop</h2>
            <p>Davao City, Philippines</p>
          </div>
          
          <div class="row">
            <div class="label">Customer</div>
            <div class="value">${order.customer_name}</div>
            <div class="value">${order.customer_phone}</div>
          </div>

          <div class="row">
            <div class="label">Shipping Address</div>
            <div class="value address">${order.customer_address || 'No address provided'}</div>
          </div>

          <div class="row">
            <div class="label">Item</div>
            <div class="value">${order.product?.title}</div>
          </div>

          <div class="row">
            <div class="label">Payment Status</div>
            ${order.payment_reference 
              ? `<div class="value">PAID - GCash Ref: ${order.payment_reference}</div>`
              : `<div class="value">Pending / COD</div>`
            }
          </div>

          <div class="row">
            <div class="label">Amount</div>
            <div class="value" style="font-size: 24px; font-weight: bold;">₱${order.product?.price.toLocaleString()}</div>
          </div>

          <div class="footer">
            Order #${order.id} • ${new Date().toLocaleDateString()}
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
  }

  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase()
    return (
      order.id.toString().includes(term) ||
      order.customer_name.toLowerCase().includes(term) ||
      order.customer_email.toLowerCase().includes(term) ||
      (order.payment_reference && order.payment_reference.toLowerCase().includes(term))
    )
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Orders & Reservations</h1>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <li key={order.id} className="bg-white hover:bg-gray-50 transition-colors duration-150">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        Order #{order.id}
                      </p>
                      <span className={`sm:hidden px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-base font-medium text-gray-900 mt-1">{order.product?.title}</p>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>{order.customer_name}</p>
                      <p>{order.customer_email}</p>
                      <p>{order.customer_phone}</p>
                      {order.customer_address && (
                        <p className="mt-1 text-xs bg-gray-50 p-1 rounded border border-gray-100">
                          📍 {order.customer_address}
                        </p>
                      )}
                      {order.payment_reference && (
                         <div className="mt-2 text-indigo-700 font-semibold bg-indigo-50 p-2 rounded">
                            GCash Ref: {order.payment_reference}
                         </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-3">
                    <span className={`hidden sm:inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                    
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button 
                        onClick={() => printLabel(order)}
                        className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        title="Print Waybill"
                      >
                        🖨️ Label
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(order.id, 'completed')}
                            disabled={processingId === order.id}
                            className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {processingId === order.id ? 'Processing...' : 'Complete'}
                          </button>
                          <button 
                            onClick={() => updateStatus(order.id, 'cancelled')}
                            disabled={processingId === order.id}
                            className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {processingId === order.id ? 'Processing...' : 'Cancel'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {filteredOrders.length === 0 && !loading && (
            <li className="px-4 py-8 text-center text-gray-500">
               {searchTerm ? 'No orders matching your search.' : 'No orders yet.'}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
