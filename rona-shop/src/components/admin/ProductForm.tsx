'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductForm({ onProductAdded }: { onProductAdded: () => void }) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [condition, setCondition] = useState('Good')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrls: string[] = []

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('shoe-images')
          .upload(filePath, imageFile)

        if (uploadError) {
          throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('shoe-images')
          .getPublicUrl(filePath)
        
        imageUrls.push(publicUrl)
      }

      const { error } = await supabase
        .from('products')
        .insert([
          {
            title,
            brand,
            size: parseFloat(size),
            price: parseFloat(price),
            condition,
            images: imageUrls,
            status: 'available'
          },
        ])

      if (error) throw error

      // Reset form
      setTitle('')
      setBrand('')
      setSize('')
      setPrice('')
      setImageFile(null)
      onProductAdded()
      alert('Product added successfully!')

    } catch (error: any) {
      alert('Error adding product: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Shoe</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Nike Air Jordan 1 High"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Nike"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Size (US)</label>
          <input
            type="number"
            step="0.5"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="9.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="120.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
