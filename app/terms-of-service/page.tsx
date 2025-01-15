import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - ImgRes',
}

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600">
          By accessing or using ImgRes, you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
        <p className="text-gray-600">
          ImgRes provides an online image resizing service that allows users to resize images.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
        <p className="text-gray-600">
          You are responsible for maintaining the confidentiality of your account and password.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
        <p className="text-gray-600">
          All content included on ImgRes, such as text, graphics, logos, is the property of ImgRes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-600">
          ImgRes shall not be liable for any damages resulting from the use or inability to use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
        <p className="text-gray-600">
          We reserve the right to modify these terms at any time. Your continued use constitutes acceptance.
        </p>
      </section>
    </div>
  )
}
