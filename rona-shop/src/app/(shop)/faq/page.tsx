import React from 'react'

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I buy/reserve an item?</h2>
          <p className="text-gray-600">
            Simply browse our shop, click on the item you like, and click the "Reserve Now" button. 
            Fill out your details, and the item will be reserved for you for 24 hours.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I pay?</h2>
          <p className="text-gray-600">
            We currently accept payments via <strong>GCash</strong>. After reserving, you will see the instructions. 
            Please send your payment to the provided number and send the screenshot/proof of payment to our Facebook Page to confirm your order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Are the shoes authentic/original?</h2>
          <p className="text-gray-600">
            Our items are <strong>thrifted/pre-loved</strong>. While we find many authentic gems, we cannot guarantee the authenticity of every single pair unless explicitly stated. 
            We recommend checking the detailed photos and description before buying.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Do you ship nationwide?</h2>
          <p className="text-gray-600">
            Yes! We ship nationwide via J&T Express or LBC. Shipping fees are shouldered by the buyer and will be calculated based on your location.
            For Davao City customers, we can also arrange meet-ups or pick-ups.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Can I return an item?</h2>
          <p className="text-gray-600">
            Since these are thrift items, all sales are generally final. However, if we missed a major defect that was not in the description, please contact us immediately so we can resolve it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I know my size?</h2>
          <p className="text-gray-600">
            We list sizes in <strong>US Sizing</strong>. If you are unsure, we recommend measuring your foot in centimeters (CM) and messaging us on Facebook so we can help you check if the shoe fits.
          </p>
        </div>
      </div>
    </div>
  )
}
