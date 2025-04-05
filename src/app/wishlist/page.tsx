'use client';

import { useState, useMemo } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Get unique categories from items
  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map(item => item.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [items]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(item => {
        if (max) {
          return item.price >= min && item.price <= max;
        }
        return item.price >= min;
      });
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [items, selectedCategory, sortBy, priceRange]);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8">Start adding items to your wishlist while shopping!</p>
        <Link
          href="/shop"
          className="rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Prices</option>
              <option value="0-1000">Under ₹1,000</option>
              <option value="1000-2000">₹1,000 - ₹2,000</option>
              <option value="2000-999999">Over ₹2,000</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-12">
            <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items match your filters</h3>
            <p className="mt-1 text-sm text-gray-500">Try changing your filters or clear them to see all items.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
                setSortBy('name');
              }}
              className="mt-6 text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedItems.map((item) => (
              <div key={item.id} className="group relative">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-all duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/shop/${item.id}`}>
                      <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 