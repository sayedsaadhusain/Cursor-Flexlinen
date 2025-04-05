'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="relative rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <span className="sr-only">View cart</span>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
            {itemCount}
          </span>
        )}
      </button>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
} 