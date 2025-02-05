'use client'

import { useState } from 'react'
import { prices } from '@/lib/price'
export default function PricingPage() {
  const oneTimeCredits = prices.filter(p => p.type === "one-time")
  const subscriptionCredits = prices.filter(p => p.type === "subscription")

  const [selectedOneTimeId, setSelectedOneTimeId] = useState(oneTimeCredits[0].id)
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(subscriptionCredits[0].id)

  return (
    <section id="price" className="container mx-auto px-4 ">
      <h2 className="text-4xl font-semibold text-center mb-12">Price</h2>

      <h3 className="text-2xl font-semibold text-center mb-8">Pay For Credits</h3>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* One-time Payment Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-semibold mb-2">One-time Payment</h3>
          <div className="text-3xl font-bold mb-6">
            US$ {oneTimeCredits.find(c => c.id === selectedOneTimeId)?.pricePerCredit.toFixed(3)}
            <span className="text-sm font-normal text-gray-500"> / Credit</span>
          </div>

          <div className="space-y-4">
            {oneTimeCredits.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedOneTimeId === plan.id ? 'border-primary' : 'border-gray-200'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="one-time"
                    value={plan.id}
                    checked={selectedOneTimeId === plan.id}
                    onChange={(e) => setSelectedOneTimeId(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium">{plan.credits} Credits</div>
                    <div className="text-sm text-gray-500">US${plan.pricePerCredit.toFixed(3)} / Credit</div>
                  </div>
                </div>
                <div className="font-semibold">US${plan.price}</div>
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6 mb-4">
            Credits available for use anytime within 2 years of purchase
          </p>

          {/* <Link href={"/checkout/" + selectedOneTimeId}> */}
          <button className="w-full font-medium rounded-lg py-3 px-6 bg-gray-200 hover:bg-gray-300" >
            Buy Now
          </button>
          {/* </Link> */}

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
            US$ {subscriptionCredits.find(c => c.id === selectedSubscriptionId)?.pricePerCredit.toFixed(3)}
            <span className="text-sm font-normal text-gray-500"> / Credit</span>
          </div>

          <div className="space-y-4">
            {subscriptionCredits.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedSubscriptionId === plan.id ? 'border-primary' : 'border-gray-200'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subscription"
                    value={plan.id}
                    checked={selectedSubscriptionId === plan.id}
                    onChange={(e) => setSelectedSubscriptionId(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium">{plan.credits} Credits/Month x 12</div>
                    <div className="text-sm text-gray-500">US${plan.pricePerCredit.toFixed(3)} / Credit</div>
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

          {/* <Link href={"/checkout/" + selectedSubscriptionId}> */}
          <button className="w-full bg-gradient-to-r from-[#C1F05A] to-[#62E9E4] text-black font-medium rounded-lg py-3 px-6 hover:opacity-90">
            Subscribe Now
          </button>
          {/* </Link> */}

        </div>
      </div>

      {/* Credits Explanation */}
      <div className="w-full py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">How Credits Work</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Earning Credits</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Every purchase you make will grant you a corresponding number of credits. These credits can be used for AI image processing operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Using Credits</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Each AI image processing operation consumes 1 credit. Free resolutions your choosed don't consume credits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Example</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                If you process an image at 128px (free), 256px (AI), and 1200px (AI), you'll consume 2 credits for the two AI operations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-md text-center mb-12 py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">
          <a href="/refund-policy" className="text-gray-500">* Check Refund Policy</a>
        </h3>

      </div>
    </section>
  )
}
