'use client'

import { useState, useEffect } from 'react'

const steps = [
  {
    title: "Welcome to Rona's Thrift Shop! 👟",
    content: "We sell unique, pre-loved kicks at steal prices. Here is a quick guide on how to score your pair."
  },
  {
    title: "1. Find Your Pair 🔍",
    content: "Use the filters to search by Size, Brand, or Condition. Since items are 1-of-1, what you see is what we have!"
  },
  {
    title: "2. Add to Cart 🛒",
    content: "Found a gem? Click 'Add to Cart'. You can add multiple items and check them out all at once."
  },
  {
    title: "3. Easy Checkout ⚡",
    content: "Fill in your shipping details (we can save them for next time!) and pay via GCash using our QR code. Input your reference number, and you're set!"
  }
]

export default function CustomerTutorial() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem('rona_customer_tutorial_seen')
    if (!hasSeenTutorial) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('rona_customer_tutorial_seen', 'true')
  }

  // Expose a way to reopen the tutorial (for the 'Show Tutorial' button later)
  useEffect(() => {
    const handleReopen = () => {
      setCurrentStep(0)
      setIsOpen(true)
    }
    window.addEventListener('openCustomerTutorial', handleReopen)
    return () => window.removeEventListener('openCustomerTutorial', handleReopen)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
        {/* Progress Bar */}
        <div className="flex space-x-1 mb-6">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full ${idx <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600">
            {steps[currentStep].content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleClose}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Skip
          </button>
          <button 
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors"
          >
            {currentStep === steps.length - 1 ? "Let's Shop!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}
