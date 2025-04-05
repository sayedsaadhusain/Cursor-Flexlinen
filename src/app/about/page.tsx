'use client';

import Image from 'next/image';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80"
            alt="About Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Flexlinen
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            Crafting premium sportswear that combines style, comfort, and performance.
          </p>
        </div>
      </div>

      {/* Our Story section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                Founded in 2023, Flexlinen began with a simple mission: to create sportswear that doesn't compromise on style or performance. Our journey started when we noticed a gap in the market for affordable, high-quality athletic wear that looks as good as it performs.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, we're proud to offer a wide range of sportswear that helps athletes and fitness enthusiasts look and feel their best, whether they're training at the gym or running errands around town.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality, using only the finest materials and craftsmanship in every piece we create.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices, from eco-friendly materials to responsible manufacturing processes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate our designs and materials to provide the best possible experience for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={`https://images.unsplash.com/photo-${1500000000000 + member}?auto=format&fit=crop&w=200&h=200&q=80`}
                    alt={`Team Member ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Team Member {member}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 