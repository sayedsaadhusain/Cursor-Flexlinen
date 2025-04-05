'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton() {
  const { items } = useWishlist();

  return (
    <Link
      href="/wishlist"
      className="group -m-2 flex items-center p-2 relative"
      aria-label="View wishlist"
    >
      <HeartIcon
        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center">
          <span className="text-xs font-medium text-white">{items.length}</span>
        </span>
      )}
    </Link>
  );
} 