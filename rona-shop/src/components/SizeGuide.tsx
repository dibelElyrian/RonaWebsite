'use client'

import { useState } from 'react'

export default function SizeGuide() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-indigo-600 hover:text-indigo-800 underline ml-2"
      >
        Size Guide & CM
      </button>
    )
  }

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Nike / Jordan Size Chart
                </h3>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">US Men</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">US Women</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">EU</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">CM</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                             <tr><td className="px-3 py-2 text-gray-900">6</td><td className="px-3 py-2 text-gray-900">7.5</td><td className="px-3 py-2 text-gray-900">38.5</td><td className="px-3 py-2 text-gray-900">24</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">6.5</td><td className="px-3 py-2 text-gray-900">8</td><td className="px-3 py-2 text-gray-900">39</td><td className="px-3 py-2 text-gray-900">24.5</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">7</td><td className="px-3 py-2 text-gray-900">8.5</td><td className="px-3 py-2 text-gray-900">40</td><td className="px-3 py-2 text-gray-900">25</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">7.5</td><td className="px-3 py-2 text-gray-900">9</td><td className="px-3 py-2 text-gray-900">40.5</td><td className="px-3 py-2 text-gray-900">25.5</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">8</td><td className="px-3 py-2 text-gray-900">9.5</td><td className="px-3 py-2 text-gray-900">41</td><td className="px-3 py-2 text-gray-900">26</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">8.5</td><td className="px-3 py-2 text-gray-900">10</td><td className="px-3 py-2 text-gray-900">42</td><td className="px-3 py-2 text-gray-900">26.5</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">9</td><td className="px-3 py-2 text-gray-900">10.5</td><td className="px-3 py-2 text-gray-900">42.5</td><td className="px-3 py-2 text-gray-900">27</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">9.5</td><td className="px-3 py-2 text-gray-900">11</td><td className="px-3 py-2 text-gray-900">43</td><td className="px-3 py-2 text-gray-900">27.5</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">10</td><td className="px-3 py-2 text-gray-900">11.5</td><td className="px-3 py-2 text-gray-900">44</td><td className="px-3 py-2 text-gray-900">28</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">10.5</td><td className="px-3 py-2 text-gray-900">12</td><td className="px-3 py-2 text-gray-900">44.5</td><td className="px-3 py-2 text-gray-900">28.5</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">11</td><td className="px-3 py-2 text-gray-900">12.5</td><td className="px-3 py-2 text-gray-900">45</td><td className="px-3 py-2 text-gray-900">29</td></tr>
                             <tr><td className="px-3 py-2 text-gray-900">12</td><td className="px-3 py-2 text-gray-900">13.5</td><td className="px-3 py-2 text-gray-900">46</td><td className="px-3 py-2 text-gray-900">30</td></tr>
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-gray-500">* Sizing may vary slightly by brand (Adidas, Vans, etc.). This is a general reference for Nike/Jordan.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
