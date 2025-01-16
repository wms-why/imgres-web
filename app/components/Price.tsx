'use client'

import { useState } from 'react'

export default function PricingPage() {
  const [selectedOneTime, setSelectedOneTime] = useState("100")
  const [selectedSubscription, setSelectedSubscription] = useState("200")
  const [billingCycle, setBillingCycle] = useState("yearly")

  const oneTimeCredits = [
    { credits: "100", price: 11.99, pricePerCredit: 0.12 },
    { credits: "200", price: 19.99, pricePerCredit: 0.10 },
    { credits: "500", price: 39.99, pricePerCredit: 0.08 },
    { credits: "1000", price: 59.99, pricePerCredit: 0.06 },
    { credits: "2000", price: 79.99, pricePerCredit: 0.04 },
    { credits: "10000", price: 280, pricePerCredit: 0.028 }
  ]

  const subscriptionCredits = [
    { credits: "200", price: 35.99, pricePerCredit: 0.015 },
    { credits: "500", price: 71.99, pricePerCredit: 0.012 },
    { credits: "1000", price: 129.99, pricePerCredit: 0.011 },
    { credits: "2000", price: 215.99, pricePerCredit: 0.009 }
  ]

  return (
    <section id="price" className="container mx-auto px-4 py-24 ">
      <h2 className="text-4xl font-semibold text-center mb-12">Price</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* One-time Payment Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-semibold mb-2">One-time Payment</h3>
          <div className="text-3xl font-bold mb-6">
            US$ {selectedOneTime === "100" ? "0.12" : oneTimeCredits.find(c => c.credits === selectedOneTime)?.pricePerCredit.toFixed(3)}
            <span className="text-sm font-normal text-gray-500">/Credit</span>
          </div>

          <div className="space-y-4">
            {oneTimeCredits.map((plan) => (
              <label
                key={plan.credits}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedOneTime === plan.credits ? 'border-primary' : 'border-gray-200'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="one-time"
                    value={plan.credits}
                    checked={selectedOneTime === plan.credits}
                    onChange={(e) => setSelectedOneTime(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium">{plan.credits} Credits</div>
                    <div className="text-sm text-gray-500">US${plan.pricePerCredit.toFixed(3)}/Credit</div>
                  </div>
                </div>
                <div className="font-semibold">US${plan.price}</div>
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6 mb-4">
            Credits available for use anytime within 2 years of purchase
          </p>

          <button className="w-full font-medium rounded-lg py-3 px-6 bg-gray-200 hover:bg-gray-300">
            Buy Now
          </button>
        </div>

        {/* Subscription Plan Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 relative">
          <div className="absolute right-4 top-4">
            <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
              Most popular
            </span>
          </div>

          <h3 className="text-2xl font-semibold mb-2">Subscription Plan for Year</h3>
          <div className="text-3xl font-bold mb-6">
            US$ 0.015
            <span className="text-sm font-normal text-gray-500">/Credit</span>
          </div>

          <div className="space-y-4">
            {subscriptionCredits.map((plan) => (
              <label
                key={plan.credits}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedSubscription === plan.credits ? 'border-primary' : 'border-gray-200'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subscription"
                    value={plan.credits}
                    checked={selectedSubscription === plan.credits}
                    onChange={(e) => setSelectedSubscription(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium">{plan.credits} Credits/Month x 12</div>
                    <div className="text-sm text-gray-500">US${plan.pricePerCredit.toFixed(3)}/Credit</div>
                  </div>
                </div>
                <div className="font-semibold">US${plan.price}</div>
              </label>
            ))}
          </div>

          <div className="mt-6 mb-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unused credits will roll over as long as you're subscribed, up to no limit.
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime.
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                New credits will be issued to your account each month on the day you subscribe.
              </li>
            </ul>
          </div>

          <button className="w-full bg-gradient-to-r from-[#C1F05A] to-[#62E9E4] text-black font-medium rounded-lg py-3 px-6 hover:opacity-90">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  )
}
