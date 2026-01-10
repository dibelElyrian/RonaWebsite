import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

// Revalidate every 60 seconds
export const revalidate = 60

async function getProduct(id: string) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  return product
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">₱{product.price.toLocaleString()}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>Brand: <span className="font-semibold">{product.brand}</span></p>
                <p>Size: <span className="font-semibold">{product.size}</span></p>
                <p>Condition: <span className="font-semibold">{product.condition}</span></p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${
                  product.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  {product.status}
                </p>
              </div>
            </div>

            <div className="mt-10 flex sm:flex-col">
              {product.status === 'available' ? (
                <AddToCartButton product={product} />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed"
                >
                  {product.status === 'reserved' ? 'Reserved' : 'Sold Out'}
                </button>
              )}
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
               <p className="text-xs text-gray-500">
                 <strong>Thrift Disclaimer:</strong> This item is pre-loved/second-hand. Please review photos carefully. Authenticity is not guaranteed unless stated.
               </p>
            </div>
            
            <div className="mt-6 text-center">
               <Link href="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
                 &larr; Back to Shop
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
