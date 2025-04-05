'use client';

import Image from 'next/image';

export default function PoliciesPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[40vh] min-h-[300px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
            alt="Policies Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy & Policies
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            Learn about how we handle your data and our business policies.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              At Flexlinen, we take your privacy seriously. This privacy policy describes how we collect,
              use, and protect your personal information when you use our website and services.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information (name, email, shipping address)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Shopping preferences and history</li>
              <li>Device and browser information</li>
            </ul>
            <h3 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order updates and shipping notifications</li>
              <li>Improve our products and services</li>
              <li>Personalize your shopping experience</li>
            </ul>
          </div>
        </section>

        {/* Shipping Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              We aim to deliver your orders as quickly and efficiently as possible. Here's what you
              need to know about our shipping process.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Delivery Times</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard Shipping: 3-5 business days</li>
              <li>Express Shipping: 1-2 business days</li>
              <li>International Shipping: 7-14 business days</li>
            </ul>
            <h3 className="text-xl font-semibold mt-8 mb-4">Shipping Costs</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free standard shipping on orders over ₹1,000</li>
              <li>Standard shipping: ₹100</li>
              <li>Express shipping: ₹250</li>
              <li>International shipping: Calculated at checkout</li>
            </ul>
          </div>
        </section>

        {/* Return Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with your
              order, here's our return policy.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Return Guidelines</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>30-day return window from the date of delivery</li>
              <li>Items must be unworn and in original condition with tags attached</li>
              <li>Free returns for standard shipping orders</li>
              <li>Express shipping return costs are non-refundable</li>
            </ul>
            <h3 className="text-xl font-semibold mt-8 mb-4">How to Return</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in to your account and initiate a return</li>
              <li>Print the return shipping label</li>
              <li>Pack the items securely</li>
              <li>Drop off at your nearest courier location</li>
            </ol>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              By using Flexlinen's services, you agree to these terms. Please read them carefully.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Account Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use this service</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
            </ul>
            <h3 className="text-xl font-semibold mt-8 mb-4">Usage Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products must be used as intended</li>
              <li>Resale of products is not permitted without authorization</li>
              <li>We reserve the right to refuse service</li>
              <li>Prices and availability are subject to change</li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              If you have any questions about our policies, please don't hesitate to contact us:
            </p>
            <ul className="list-none pl-0 space-y-2 mt-4">
              <li>Email: support@flexlinen.com</li>
              <li>Phone: 1-800-FLEXLINEN</li>
              <li>Hours: Monday - Friday, 9:00 AM - 6:00 PM IST</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 