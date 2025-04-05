'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories, sortOptions, Product } from '@/data/products';
import { 
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import SearchSuggestions from '@/components/SearchSuggestions';
import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/context/CartContext';
import React from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearching } = useCart();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Focus search input on Ctrl+K or Command+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchSuggestions = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    
    const query = debouncedSearchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [debouncedSearchQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearching(value.length > 0);
  }, [setSearching]);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    setSearching(false);
    searchInputRef.current?.focus();
  }, [setSearching]);

  const handleSuggestionSelect = useCallback((product: Product) => {
    setSearchQuery(product.name);
    setSearching(false);
  }, [setSearching]);

  const filteredAndSortedProducts = useMemo(() => {
    // Ensure products array exists and filter out any undefined products
    if (!Array.isArray(products)) {
      return [];
    }

    let filtered = products.filter(product => product && typeof product === 'object');

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply price range filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter((product) => {
        if (!product.price) return false;
        if (max) {
          return product.price >= min && product.price < max;
        }
        return product.price >= min;
      });
    }

    // Apply sorting
    switch (selectedSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, selectedSort, selectedPriceRange, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange(null);
    setSelectedSort('popular');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedPriceRange !== null || searchQuery !== '';

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-6 pt-24">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Clear all filters
              </button>
            )}

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 sm:hidden">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - Full Width on Mobile */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products... (Ctrl+K)"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <SearchSuggestions
              suggestions={searchSuggestions}
              onSelect={handleSuggestionSelect}
              searchQuery={searchQuery}
              onClear={handleSearchClear}
            />
          </div>

          {/* Desktop Controls */}
          <div className="hidden sm:flex sm:items-center sm:justify-end sm:space-x-4">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <div className="mt-4 space-y-4">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Price Range</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="price-all"
                      name="price"
                      type="radio"
                      checked={selectedPriceRange === null}
                      onChange={() => setSelectedPriceRange(null)}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="price-all"
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      All Prices
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-0-1000"
                      name="price"
                      type="radio"
                      checked={selectedPriceRange === '0-1000'}
                      onChange={() => {
                        setSelectedPriceRange('0-1000');
                        setIsMobileFilterOpen(false);
                      }}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="price-0-1000"
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      Under ₹1,000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-1000-2000"
                      name="price"
                      type="radio"
                      checked={selectedPriceRange === '1000-2000'}
                      onChange={() => {
                        setSelectedPriceRange('1000-2000');
                        setIsMobileFilterOpen(false);
                      }}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="price-1000-2000"
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      ₹1,000 - ₹2,000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-2000-plus"
                      name="price"
                      type="radio"
                      checked={selectedPriceRange === '2000-999999'}
                      onChange={() => {
                        setSelectedPriceRange('2000-999999');
                        setIsMobileFilterOpen(false);
                      }}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="price-2000-plus"
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      Over ₹2,000
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* Collections Link */}
              <div className="mb-8 p-6 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Browse Collections</h2>
                    <p className="mt-1 text-sm text-gray-500">Discover our curated collections of premium sportswear.</p>
                  </div>
                  <a href="/collections" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
                    View All Collections
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedProducts.filter(product => product).map((product) => (
                  <div key={product.id} className="flex h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter dialog */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-1 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <div className="mt-4 space-y-4">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`mobile-category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`mobile-category-${category}`}
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="mobile-price-all"
                    name="price"
                    type="radio"
                    checked={selectedPriceRange === null}
                    onChange={() => {
                      setSelectedPriceRange(null);
                      setIsMobileFilterOpen(false);
                    }}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="mobile-price-all"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    All Prices
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mobile-price-0-1000"
                    name="price"
                    type="radio"
                    checked={selectedPriceRange === '0-1000'}
                    onChange={() => {
                      setSelectedPriceRange('0-1000');
                      setIsMobileFilterOpen(false);
                    }}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="mobile-price-0-1000"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    Under ₹1,000
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mobile-price-1000-2000"
                    name="price"
                    type="radio"
                    checked={selectedPriceRange === '1000-2000'}
                    onChange={() => {
                      setSelectedPriceRange('1000-2000');
                      setIsMobileFilterOpen(false);
                    }}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="mobile-price-1000-2000"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    ₹1,000 - ₹2,000
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mobile-price-2000-plus"
                    name="price"
                    type="radio"
                    checked={selectedPriceRange === '2000-999999'}
                    onChange={() => {
                      setSelectedPriceRange('2000-999999');
                      setIsMobileFilterOpen(false);
                    }}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="mobile-price-2000-plus"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    Over ₹2,000
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 