import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-indigo text-gray-500">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to Rona's Shoe Thrift Shop. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name.</li>
          <li><strong>Contact Data:</strong> includes email address, telephone number, and delivery address.</li>
          <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>To process and deliver your order.</li>
          <li>To manage our relationship with you.</li>
          <li>To improve our website, products/services, marketing or customer relationships.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us via our Facebook page.
        </p>
      </div>
    </div>
  )
}
