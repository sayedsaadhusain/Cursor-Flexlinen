'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/shop/${product.id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-all duration-200"
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist(product.id) ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
        </div>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-4 w-4 flex-shrink-0 ${
                index < Math.floor(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {product.rating} out of 5
          </span>
        </div>
      </div>
    </Link>
  );
} 