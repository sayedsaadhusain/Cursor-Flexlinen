'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/data/collections';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(collections.map(collection => collection.category)));
  
  const filteredCollections = selectedCategory
    ? collections.filter(collection => collection.category === selectedCategory)
    : collections;

  const featuredCollections = collections.filter(collection => collection.featured);

  return (
    <div className="bg-white">
      {/* Hero section with parallax effect */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 transform transition-transform duration-500 hover:scale-105">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=2000&q=80"
            alt="Collections hero"
            width={2000}
            height={1000}
            className="h-full w-full object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
              Our Collections
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-100 animate-fade-in-delay">
              Discover our curated collections of premium sportswear, designed for both performance and style.
            </p>
          </div>
        </div>
      </div>

      {/* Featured collections with enhanced hover effects */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative block overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold text-white mb-2">{collection.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{collection.description}</p>
                    <div className="mt-4 flex items-center text-white text-sm">
                      <span>Explore Collection</span>
                      <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category filter with improved styling */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              All Collections
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All collections grid with enhanced cards */}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group relative block overflow-hidden rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {collection.name}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/10">
                      {collection.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{collection.description}</p>
                  <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                    <span>View Collection</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 