import Link from 'next/link'

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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {product.status !== 'available' && (
          <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
            {product.status}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.brand}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.title}</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-500">Size {product.size}</p>
        <p className="text-lg font-bold text-indigo-600">₱{product.price.toLocaleString()}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1">Condition: {product.condition}</p>
    </Link>
  )
}
