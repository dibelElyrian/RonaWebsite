'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Feedback {
  id: number
  created_at: string
  name: string
  email: string
  rating: number
  message: string
  status: string
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFeedbacks(data || [])
    } catch (error) {
      console.error('Error fetching feedback:', error)
      alert('Error loading feedback')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return

    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      // Remove from UI
      setFeedbacks(feedbacks.filter(f => f.id !== id))
    } catch (error) {
      alert('Error deleting feedback')
    }
  }

  if (loading) return <div className="p-8">Loading feedback...</div>

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Feedback</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {feedbacks.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">No feedback yet.</li>
          ) : (
            feedbacks.map((item) => (
              <li key={item.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-2">
                         <p className="text-sm font-medium text-indigo-600 truncate">
                            {item.name || 'Anonymous'} 
                            <span className="text-gray-400 font-normal ml-2 text-xs">
                                {item.email && `(${item.email})`}
                            </span>
                         </p>
                         <div className="ml-2 flex-shrink-0 flex">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm text-gray-600 font-medium">{item.rating}/5</span>
                         </div>
                     </div>
                     <p className="text-sm text-gray-900 break-words mb-2">"{item.message}"</p>
                     <p className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                     </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                      <button 
                         onClick={() => handleDelete(item.id)}
                         className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                         Delete
                      </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
