import React from 'react'

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-indigo text-gray-500">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
        <p>
          By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Product Disclaimer (Thrift/Pre-loved Items)</h2>
        <p>
          Please be aware that the items sold on this website are <strong>thrifted, pre-loved, or second-hand</strong> unless explicitly stated otherwise.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Authenticity:</strong> We do not claim that all items are original/authentic. Items are sold as-is. Please check the photos and description carefully before purchasing.</li>
          <li><strong>Condition:</strong> We do our best to describe the condition of each item (e.g., New, Good, Fair). However, minor signs of wear and tear are to be expected with thrifted items.</li>
          <li><strong>Trademarks:</strong> All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Reservations & Payments</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Reservations are valid for <strong>24 hours</strong>. If payment is not received/verified within this timeframe, the item may be released back to inventory.</li>
          <li>Payments are currently accepted via <strong>GCash</strong>. Proof of payment must be sent to our Facebook page for verification.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Returns & Refunds</h2>
        <p>
          Due to the nature of thrift items, <strong>all sales are final</strong>. We do not accept returns or exchanges unless the item received is significantly different from the description.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us via our Facebook page.
        </p>
      </div>
    </div>
  )
}
