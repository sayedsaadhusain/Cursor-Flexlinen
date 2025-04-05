'use client';

import { Product } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingCartIcon,
  TagIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

interface SearchSuggestionsProps {
  suggestions: Product[];
  onSelect: (product: Product) => void;
  searchQuery: string;
  onClear: () => void;
}

export default function SearchSuggestions({ 
  suggestions, 
  onSelect, 
  searchQuery,
  onClear 
}: SearchSuggestionsProps) {
  const { state } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Show animation when mounting
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          onSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClear();
        break;
      case 'Tab':
        if (suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => 
            e.shiftKey 
              ? (prev > 0 ? prev - 1 : suggestions.length - 1)
              : (prev < suggestions.length - 1 ? prev + 1 : 0)
          );
        }
        break;
    }
  };

  // Don't show anything if there's no search query
  if (!searchQuery) {
    return null;
  }

  const baseClasses = `absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg transform transition-all duration-300 ease-in-out
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;

  // Show loading state
  if (state.isSearching) {
    return (
      <div className={baseClasses}>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
            <span className="text-sm text-gray-500">Searching...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show "No results" state
  if (suggestions.length === 0) {
    return (
      <div className={baseClasses}>
        <div className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <XMarkIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">No results found for "{searchQuery}"</span>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            <span>Press </span>
            <kbd className="px-2 py-1 bg-gray-100 rounded-md">ESC</kbd>
            <span> to clear search</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={baseClasses}
      onKeyDown={handleKeyDown}
      role="listbox"
      tabIndex={-1}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <ArrowUpIcon className="h-3 w-3" />
            <ArrowDownIcon className="h-3 w-3" />
            <span>to navigate</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>press</span>
            <kbd className="px-2 py-0.5 bg-gray-100 rounded-md">enter</kbd>
            <span>to select</span>
          </div>
        </div>
      </div>
      <ul 
        ref={listRef}
        className="max-h-60 overflow-auto py-1 text-base divide-y divide-gray-50"
      >
        {suggestions.map((product, index) => (
          <li
            key={product.id}
            className={`relative cursor-pointer select-none py-3 px-3 transition-all duration-150
              ${index === selectedIndex ? 'bg-primary-50 scale-[0.99]' : 'hover:bg-gray-50 hover:scale-[0.99]'}`}
            onClick={() => onSelect(product)}
            role="option"
            aria-selected={index === selectedIndex}
          >
            <div className="flex items-center">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md group">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover object-center transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div className="ml-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <ShoppingCartIcon className="h-4 w-4 text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <TagIcon className="h-4 w-4" />
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CurrencyRupeeIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 