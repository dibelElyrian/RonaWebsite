import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

async function getProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(20)
  
  return products || []
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Sneaker wall"
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fresh Kicks, Thrift Prices
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover unique, one-of-a-kind sneakers at unbeatable prices. 
            Our inventory is updated daily with the hottest drops.
          </p>
        </div>
      </div>

      {/* Fresh Drops Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Fresh Drops</h2>
          <a href="/shop" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            View all &rarr;
          </a>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shoes available right now. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
