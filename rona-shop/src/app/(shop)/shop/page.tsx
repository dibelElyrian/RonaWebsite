import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'

// Revalidate every 60 seconds
export const revalidate = 60

async function getFilteredProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  // Apply Filters
  if (searchParams.brand) {
    const brands = (searchParams.brand as string).split(',')
    query = query.in('brand', brands)
  }

  if (searchParams.size) {
    const sizes = (searchParams.size as string).split(',')
    query = query.in('size', sizes)
  }

  if (searchParams.condition) {
    const conditions = (searchParams.condition as string).split(',')
    query = query.in('condition', conditions)
  }

  const { data: products, error } = await query
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products || []
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const products = await getFilteredProducts(searchParams)

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shop All Shoes</h1>
          <p className="mt-4 text-base text-gray-500">
            Check out our complete collection of thrifted kicks.
          </p>
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {/* Filters (Sidebar on Desktop) */}
          <aside className="hidden lg:block">
            <ProductFilters />
          </aside>

          {/* Product Grid */}
          <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-8">
               <details className="group">
                 <summary className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 cursor-pointer">
                    <span>Filters</span>
                    <span className="ml-6 flex items-center">
                      <svg className="h-5 w-5 transform group-open:-rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                 </summary>
                 <div className="mt-4 px-4 py-4 bg-gray-50 rounded-lg border border-gray-200">
                   <ProductFilters />
                 </div>
               </details>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-lg">
                <h3 className="mt-2 text-sm font-medium text-gray-900">No shoes found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
