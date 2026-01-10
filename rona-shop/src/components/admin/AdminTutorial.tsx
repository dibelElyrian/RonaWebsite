'use client'

import { useState, useEffect } from 'react'

export default function AdminTutorial() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome, Boss! 👋",
      content: "This is your Admin Dashboard. Here you can manage your entire shop, track profits, and handle orders.",
    },
    {
      title: "Inventory Management 📦",
      content: "The 'Inventory' tab is your main workspace. Add new products, upload photos, and use the AI Caption Generator to write posts for Instagram.",
    },
    {
      title: "Track & Search Orders 📝",
      content: "Check the 'Orders' tab to see new reservations. Use the Search Bar to quickly find orders by Name, Email, or GCash Reference No.",
    },
    {
      title: "Business Analytics 📈",
      content: "Use the 'Analytics' page to see your total profit, revenue, and top-selling items. Watch your business grow!",
    },
    {
      title: "Need Help? ❓",
      content: "You can always click the 'Help' button in the sidebar to see this guide again.",
    }
  ]

  useEffect(() => {
    // Check if tutorial has been seen
    const hasSeenTutorial = localStorage.getItem('rona_admin_tutorial_seen')
    if (!hasSeenTutorial) {
      setIsOpen(true)
    }

    // Listen for manual trigger
    const handleOpen = () => {
      setIsOpen(true)
      setCurrentStep(0)
    }

    window.addEventListener('openAdminTutorial', handleOpen)
    return () => window.removeEventListener('openAdminTutorial', handleOpen)
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
    localStorage.setItem('rona_admin_tutorial_seen', 'true')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">
              Admin Guide {currentStep + 1}/{steps.length}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {steps[currentStep].content}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {currentStep === steps.length - 1 ? "Let's Work!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}
