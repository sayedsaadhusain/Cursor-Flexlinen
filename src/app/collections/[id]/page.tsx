'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { StarIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface CollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { id } = use(params);
  const collection = collections.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Collection not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL and try again.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const collectionProducts = products.filter((product) => collection.products.includes(product.id));

  return (
    <div className="bg-white">
      {/* Hero section with parallax effect */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 transform transition-transform duration-700 hover:scale-105">
          <Image
            src={collection.image}
            alt={collection.name}
            width={2000}
            height={1000}
            className="h-full w-full object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full">
            <div className="animate-fade-in space-y-4 max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
                {collection.category}
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {collection.name}
              </h1>
              <p className="text-xl text-gray-100">
                {collection.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid with enhanced cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Products in this Collection</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {collectionProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group relative block overflow-hidden rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-4 aspect-h-5 w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white">
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>View Product</span>
                    </div>
                    <span className="bg-white/90 px-2.5 py-1.5 rounded-md text-sm font-medium text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-4 w-4 flex-shrink-0 ${
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{product.rating} out of 5</p>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to collections with enhanced button */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/collections"
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-600 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5 transform transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Collections
        </Link>
      </div>
    </div>
  );
} 