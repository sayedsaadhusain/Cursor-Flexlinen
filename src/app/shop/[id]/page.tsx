'use client';

import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import React from 'react';

// Define the Product interface to match your data structure
// Note: Including 'category' property as indicated by the error message
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  sizes: string[];
  colors: string[];
  features: string[];
  category: string; // Added this required property
}

// Define a CartItem interface that extends Product with the selected options
interface CartItem extends Product {
  size: string;
  color: string;
  quantity?: number;
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) as Product | undefined;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (buttonState !== 'idle' || !selectedSize || !selectedColor || !product) return;
    
    try {
      setButtonState('loading');
      console.log('Adding item to cart:', { ...product, size: selectedSize, color: selectedColor, quantity });
      
      // Add the item multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem({
          ...product, // This now includes the category property
          size: selectedSize,
          color: selectedColor
        } as CartItem);
      }
      
      // Show success state after item is added
      setTimeout(() => {
        setButtonState('success');
        console.log('Item added successfully');
        
        // Return to idle state after showing success
        setTimeout(() => {
          setButtonState('idle');
        }, 1000);
      }, 500);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setButtonState('error');
      setTimeout(() => {
        setButtonState('idle');
      }, 2000);
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300";
    
    if (!selectedSize || !selectedColor) {
      return `${baseStyles} bg-gray-400 cursor-not-allowed`;
    }
    
    switch (buttonState) {
      case 'loading':
        return `${baseStyles} bg-primary-500 cursor-wait`;
      case 'success':
        return `${baseStyles} bg-green-600 hover:bg-green-700 transform scale-[0.98]`;
      case 'error':
        return `${baseStyles} bg-red-600 hover:bg-red-700`;
      default:
        return `${baseStyles} bg-primary-600 hover:bg-primary-700 hover:scale-[0.98] active:scale-95`;
    }
  };

  const renderButtonContent = () => {
    if (!selectedSize || !selectedColor) {
      return (
        <div className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-5 w-5" />
          <span>Select size and color</span>
        </div>
      );
    }

    switch (buttonState) {
      case 'loading':
        return (
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Adding...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center space-x-2 animate-bounce">
            <CheckIcon className="h-5 w-5" />
            <span>Added to cart!</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-2">
            <XMarkIcon className="h-5 w-5" />
            <span>Failed to add</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>{`Add ${quantity} to cart - ₹${product ? (product.price * quantity).toLocaleString() : 0}`}</span>
          </div>
        );
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Product not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL and try again.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-h-1 aspect-w-1 w-full">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₹{product.price.toLocaleString()}</p>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-500">{product.rating} out of 5 stars</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-600'
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 text-primary-600'
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <span className="text-lg font-medium text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Increase quantity</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>
              <div className="mt-4">
                <ul className="list-disc space-y-2 pl-4 text-sm">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-gray-500">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || buttonState !== 'idle'}
                className={getButtonStyles()}
                aria-label={
                  !selectedSize || !selectedColor
                    ? 'Select size and color'
                    : buttonState === 'loading'
                    ? 'Adding to cart...'
                    : buttonState === 'success'
                    ? 'Added to cart'
                    : buttonState === 'error'
                    ? 'Failed to add to cart'
                    : `Add ${quantity} to cart`
                }
              >
                {renderButtonContent()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}