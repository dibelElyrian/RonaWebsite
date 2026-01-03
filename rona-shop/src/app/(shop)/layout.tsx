import Navbar from '@/components/Navbar'
import CustomerTutorial from '@/components/CustomerTutorial'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <CustomerTutorial />
      <Navbar />
      <main>
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/faq" className="text-sm text-gray-500 hover:text-gray-900">
              FAQ
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mb-4 max-w-2xl mx-auto">
            Disclaimer: Rona's Shop is a thrift store. Items are pre-loved/second-hand and are not guaranteed authentic unless explicitly stated. All product names, logos, and brands are property of their respective owners.
          </p>
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Rona's Shoe Thrift Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
