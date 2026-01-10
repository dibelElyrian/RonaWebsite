export default function SocialProof() {
  const testimonials = [
    {
      id: 1,
      name: "Miguel R.",
      handle: "@miggy_kicks",
      comment: "Legit seller! Got my grails for a steal price. Condition was exactly as described.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Sarah L.",
      handle: "@sarah_sneaks",
      comment: "Super fast transaction. The shoes were packed securely. Will definitely order again!",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "J Paolo",
      handle: "@paolo_collector",
      comment: "Solid pairs! Rona's selection is fire. Highly recommended for thrift finds.",
      image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=300&q=80"
    }
  ]

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Flex Your Kicks</h2>
          <p className="mt-4 text-lg text-gray-500">
            Join our community of happy sneakerheads. Tag us on socials to be featured!
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 p-6">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                      {/* Placeholder avatar */}
                      <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-indigo-600">{testimonial.handle}</p>
                  </div>
               </div>
               <p className="text-gray-600 italic">"{testimonial.comment}"</p>
               <div className="mt-4 rounded-md overflow-hidden h-48 w-full bg-gray-200 relative">
                   <img src={testimonial.image} alt="Customer shoe" className="w-full h-full object-cover" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
