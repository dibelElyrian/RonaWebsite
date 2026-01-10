'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([formData])

      if (error) throw error

      setSubmitted(true)
    } catch (error) {
      alert('Error submitting feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
             <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
             <p className="text-gray-600">Your feedback helps us improve our thrift shop.</p>
             <a href="/" className="mt-6 inline-block text-indigo-600 font-medium">Back to Shop</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          We'd love to hear from you!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about your experience shopping at Rona's.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className={`text-2xl focus:outline-none ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Send Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
