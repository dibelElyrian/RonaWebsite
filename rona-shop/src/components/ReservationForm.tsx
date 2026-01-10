'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { revalidateShop } from '@/app/actions'

export default function ReservationForm({ productId, productTitle }: { productId: number, productTitle: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentReference: ''
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call the secure RPC function
      const { error } = await supabase.rpc('reserve_product', {
        p_product_id: productId,
        p_customer_name: formData.name,
        p_customer_email: formData.email,
        p_customer_phone: formData.phone,
        p_customer_address: formData.address,
        p_payment_reference: formData.paymentReference
      })

      if (error) throw error

      await revalidateShop(productId)
      alert('Order successful! \n\nWe have received your order and payment reference. We will verify the payment and process your shipping soon.')
      setIsOpen(false)
      router.refresh()
      
    } catch (error: any) {
      alert('Error processing order: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Buy Now
      </button>
    )
  }

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Order {productTitle}
                  </h3>
                  <div className="mt-2">
                    <div className="mt-4 mb-6 border-b pb-6">
                       <p className="text-sm font-medium text-gray-700 mb-2 text-center">Scan to Pay via GCash</p>
                       <div className="flex justify-center mb-2">
                          <div className="relative w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                             <img 
                                src="/gcash-qr.jpg" 
                                alt="GCash QR Code" 
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.parentElement!.innerText = 'QR Code Image Missing'
                                }}
                             />
                          </div>
                       </div>
                       <p className="text-xs text-gray-500 text-center">
                          Scan the QR code above and pay the exact amount. <br/> 
                          Copy the reference number from your receipt.
                       </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700">GCash Reference No.</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 9876543210"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                            value={formData.paymentReference}
                            onChange={(e) => setFormData({...formData, paymentReference: e.target.value})}
                          />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <textarea
                          required
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="House No., Street, Barangay, City, Province"
                        />
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Processing...' : 'Submit Order'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
