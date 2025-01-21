
export default function RefundPolicy() {
  return (
    <section className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-4xl font-semibold text-center mb-12">Refund Policy</h2>

      <div className="space-y-8">
        {/* One-time Purchase Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">One-time Purchase</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Credits purchased through one-time payment are valid for 2 years from the date of purchase.
            </p>
            <p>
              Refunds are available within 7 days of purchase if no credits have been used.
            </p>
            <p>
              To request a refund, please contact our support team with your order details.
            </p>
          </div>
        </div>

        {/* Subscription Plan Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Subscription Plan</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              You may cancel your subscription at any time through your account settings.
            </p>
            <p>
              Upon cancellation, you will retain access to your remaining credits with no limit time.
            </p>
            <p>
              Refunds for unused subscription periods are not available after the first 7 days of subscription.
            </p>
          </div>
        </div>

        {/* General Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">General Information</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              All refund requests must be submitted in writing to our contact.
            </p>
            <p>
              Refunds will be processed within 7-10 business days and credited to your original payment method.
            </p>
            <p>
              For any questions regarding our refund policy, please contact us.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact: </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              support@imgres.com
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
