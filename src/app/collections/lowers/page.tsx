'use client';

import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function LowersCollectionPage() {
  const [sortBy, setSortBy] = useState('newest');

  // Filter products for Lowers category
  const lowersProducts = products.filter(product => product.category === 'Lowers');

  // Sort products based on selected criteria
  const sortedProducts = [...lowersProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // 'newest'
        return b.id.localeCompare(a.id); // Fixed: string comparison
    }
  });

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80"
            alt="Lowers Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Lowers Collection
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            Discover our premium collection of comfortable and stylish bottoms designed for your active lifestyle.
          </p>
        </div>
      </div>

      {/* Product grid section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Sort controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {lowersProducts.length} Products
          </h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <div key={product.id} className="flex h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Please check back later for new arrivals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
