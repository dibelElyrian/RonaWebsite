'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { revalidateShop } from '@/app/actions'
import { useCart } from '@/lib/CartContext'

export default function CheckoutForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const { items, cartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1 = Details, 2 = Payment
  const [isQRExpanded, setIsQRExpanded] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentReference: ''
  })
  const [saveInfo, setSaveInfo] = useState(false)

  // Load saved details from localStorage on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem('rona-customer-details')
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails)
        setFormData(prev => ({
          ...prev,
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          address: parsed.address || ''
        }))
        setSaveInfo(true)
      } catch (e) {
        console.error('Failed to load saved details')
      }
    }
  }, [])

  const router = useRouter()

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (saveInfo) {
      localStorage.setItem('rona-customer-details', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      }))
    } else {
      localStorage.removeItem('rona-customer-details')
    }
    
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productIds = items.map(item => item.id)

      // Call the secure RPC function
      const { error } = await supabase.rpc('reserve_products_bulk', {
        p_product_ids: productIds,
        p_customer_name: formData.name,
        p_customer_email: formData.email,
        p_customer_phone: formData.phone,
        p_customer_address: formData.address,
        p_payment_reference: formData.paymentReference
      })

      if (error) throw error

      if (items.length > 0) {
        await revalidateShop(items[0].id)
      }

      alert('Order placed successfully! \n\nWe will review your payment and ship your items soon.')
      clearCart()
      onSuccess()
      router.refresh()
      
    } catch (error: any) {
      alert('Error processing order: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // --- Step 1: Customer Details ---
  if (step === 1) {
    return (
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 h-full flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Checkout</h3>
          <p className="text-sm text-gray-500">Step 1 of 2: Shipping Details</p>
        </div>

        <form id="details-form" onSubmit={handleNextStep} className="space-y-4 flex-1 overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border text-gray-900 placeholder-gray-400"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Juan dela Cruz"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">Email Address</label>
            <input
              type="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border text-gray-900 placeholder-gray-400"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="juan@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">Mobile Phone</label>
            <input
              type="tel"
              required
              maxLength={11}
              minLength={11}
              pattern="09[0-9]{9}"
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-3 border placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                formData.phone.length > 0 && (!formData.phone.startsWith('09') || formData.phone.length !== 11)
                  ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 text-gray-900'
              }`}
              value={formData.phone}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '')
                setFormData({ ...formData, phone: val })
              }}
              placeholder="09123456789"
            />
            {formData.phone.length > 0 && (!formData.phone.startsWith('09') || formData.phone.length !== 11) && (
              <p className="mt-1 text-xs text-red-600">
                 Must start with 09 and be 11 digits
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">Shipping Address</label>
            <textarea
              required
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border text-gray-900 placeholder-gray-400"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              placeholder="Complete address for delivery"
            />
          </div>

          <div className="flex items-center pt-2">
            <input
              id="save-info"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
              Save my information for next time
            </label>
          </div>
        </form>

        <div className="mt-6 flex space-x-3 pt-4 border-t sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="details-form"
            className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Next: Payment
          </button>
        </div>
      </div>
    )
  }

  // --- Step 2: Payment ---
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 h-full flex flex-col">
       {isQRExpanded && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsQRExpanded(false)}
        >
          <div className="relative max-w-lg w-full">
             <img 
                src="/gcash-qr.jpg" 
                alt="GCash QR Full Screen" 
                className="w-full h-auto rounded-lg shadow-2xl"
             />
             <p className="text-center mt-4 text-white font-medium text-sm bg-black/50 py-1 rounded-full w-max mx-auto px-4">Tap to close</p>
          </div>
        </div>
       )}

       <div className="mb-4">
          <button 
            type="button" 
            onClick={() => setStep(1)}
            className="text-indigo-600 text-sm mb-2 flex items-center hover:underline"
          >
            &larr; Back to Details
          </button>
          <h3 className="text-xl font-bold text-gray-900">Payment</h3>
          <p className="text-sm text-gray-500">Step 2 of 2: GCash Payment</p>
       </div>

       <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {/* Order Summary */}
          <div className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center border border-indigo-100">
             <div>
               <p className="text-xs text-indigo-700 uppercase font-bold tracking-wider">Total Amount</p>
               <p className="text-2xl font-black text-indigo-900">₱{cartTotal.toLocaleString()}</p>
             </div>
             <div className="text-right">
               <p className="text-sm text-indigo-800 font-medium">{items.length} item(s)</p>
             </div>
          </div>

          {/* Payment Section */}
          <div className="border rounded-lg overflow-hidden">
             <div className="bg-blue-600 px-4 py-2">
                <h4 className="text-white font-medium text-sm flex items-center">
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-4m6 0h-2m4 0h.01M5 21l-5-10a2 2 0 012-2h10a2 2 0 012 2v4m16-4v16m-4-2H5a2 2 0 01-2-2v-4m14-4H5a2 2 0 00-2 2v4h14a2 2 0 002-2v-4z"></path></svg>
                   InstaPay / GCash
                </h4>
             </div>
             
             <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4">
               
                  <p className="text-sm font-semibold text-gray-900">Scan to Pay via GCash</p>
                  
                  {/* Clickable QR Container */}
                  <div 
                    className="relative w-full aspect-square max-w-[280px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-2 cursor-zoom-in hover:border-indigo-500 transition-colors group"
                    onClick={() => setIsQRExpanded(true)}
                  >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg z-10">
                        <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm transition-opacity">
                          Click to Expand
                        </span>
                      </div>
                      <img 
                          src="/gcash-qr.jpg" 
                          alt="GCash QR Code" 
                          className="w-full h-full object-contain rounded-md"
                          onError={(e) => { e.currentTarget.style.display = 'none' }} 
                      />
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-xs text-gray-500 text-center max-w-xs">
                      Tap the image above to view fullscreen.
                    </p>
                    <a 
                      href="/gcash-qr.jpg" 
                      download="ronas-thrift-shop-qr.jpg"
                      className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 flex items-center hover:underline"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Save QR Image
                    </a>
                  </div>

             </div>
          </div>

          <form id="payment-form" onSubmit={handleSubmit} className="mt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">GCash Reference No.</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{13}"
                maxLength={13}
                minLength={13}
                required
                placeholder="e.g. 9876543210123"
                className={`block w-full rounded-md shadow-sm text-lg p-3 border font-mono text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                  formData.paymentReference.length > 0 && formData.paymentReference.length !== 13 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
                value={formData.paymentReference}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '') // Only allow numbers
                  setFormData({ ...formData, paymentReference: value })
                }}
              />
              <div className="flex justify-between items-start mt-1">
                <p className={`text-xs ${formData.paymentReference.length > 0 && formData.paymentReference.length !== 13 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  {formData.paymentReference.length > 0 && formData.paymentReference.length !== 13 
                     ? "Reference number must be exactly 13 digits." 
                     : "Check your GCash receipt for the Ref No."}
                </p>
                <span className={`text-xs font-mono ${formData.paymentReference.length === 13 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                   {formData.paymentReference.length}/13
                </span>
              </div>
            </div>
          </form>
       </div>

       <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white">
          <button
            type="submit"
            form="payment-form"
            disabled={loading}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-75 cursor-wait' : ''}`}
          >
            {loading ? 'Verifying...' : `Submit Order (₱${cartTotal.toLocaleString()})`}
          </button>
       </div>
    </div>
  )
}

