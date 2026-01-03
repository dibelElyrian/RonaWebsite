'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13]
const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Converse', 'Vans', 'Other']
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  useEffect(() => {
    // Sync state with URL params on load
    const sizeParam = searchParams.get('size')
    const brandParam = searchParams.get('brand')
    const conditionParam = searchParams.get('condition')

    if (sizeParam) setSelectedSizes(sizeParam.split(','))
    if (brandParam) setSelectedBrands(brandParam.split(','))
    if (conditionParam) setSelectedConditions(conditionParam.split(','))
  }, [searchParams])

  const updateFilters = (type: 'size' | 'brand' | 'condition', value: string) => {
    let newValues: string[] = []
    let currentValues: string[] = []
    
    if (type === 'size') currentValues = selectedSizes
    if (type === 'brand') currentValues = selectedBrands
    if (type === 'condition') currentValues = selectedConditions

    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value)
    } else {
      newValues = [...currentValues, value]
    }

    // Update state
    if (type === 'size') setSelectedSizes(newValues)
    if (type === 'brand') setSelectedBrands(newValues)
    if (type === 'condition') setSelectedConditions(newValues)

    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    
    // Helper to set or delete param
    const updateParam = (key: string, vals: string[]) => {
      if (vals.length > 0) params.set(key, vals.join(','))
      else params.delete(key)
    }

    if (type === 'size') updateParam('size', newValues)
    else updateParam('size', selectedSizes) // Keep existing if not changing

    if (type === 'brand') updateParam('brand', newValues)
    else updateParam('brand', selectedBrands)

    if (type === 'condition') updateParam('condition', newValues)
    else updateParam('condition', selectedConditions)

    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="space-y-8">
      {/* Brand Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Brand</h3>
        <div className="mt-4 space-y-2">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                id={`brand-${brand}`}
                name="brand[]"
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => updateFilters('brand', brand)}
                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Size (US)</h3>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateFilters('size', size.toString())}
              className={`px-2 py-1 text-sm border rounded-md ${
                selectedSizes.includes(size.toString())
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Condition</h3>
        <div className="mt-4 space-y-2">
          {CONDITIONS.map((condition) => (
            <div key={condition} className="flex items-center">
              <input
                id={`condition-${condition}`}
                name="condition[]"
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() => updateFilters('condition', condition)}
                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`condition-${condition}`} className="ml-3 text-sm text-gray-600">
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
