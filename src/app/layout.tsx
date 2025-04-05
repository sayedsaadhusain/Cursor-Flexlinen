import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import CartButton from '../components/CartButton';
import WishlistButton from '../components/WishlistButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlexLinen - Premium Sportswear',
  description: 'Discover high-quality sportswear that combines style, comfort, and performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col">
              {/* Navigation */}
              <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 justify-between items-center">
                    <div className="flex-shrink-0">
                      <Link href="/" className="text-2xl font-bold text-primary-600">
                        FlexLinen
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link
                        href="/"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Home
                      </Link>
                      <Link
                        href="/shop"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Shop
                      </Link>
                      <Link
                        href="/collections"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Collections
                      </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                      <WishlistButton />
                      <CartButton />
                    </div>
                  </div>
                </div>
              </nav>

              {/* Main content */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <footer className="bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold mb-4">About FlexLinen</h3>
                      <p className="text-gray-600 mb-4">
                        FlexLinen is your premier destination for high-quality sportswear. We combine style,
                        comfort, and performance to deliver exceptional athletic apparel.
                      </p>
                      <p className="text-gray-600">
                        Visit us at: 123 Sports Avenue, Lucknow, India
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/shop" className="text-gray-600 hover:text-primary-600">
                            Shop
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections" className="text-gray-600 hover:text-primary-600">
                            Collections
                          </Link>
                        </li>
                        <li>
                          <Link href="/about" className="text-gray-600 hover:text-primary-600">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                      <div className="space-y-2">
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 block"
                        >
                          Facebook
                        </a>
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 block"
                        >
                          Instagram
                        </a>
                        <a
                          href="https://wa.me/1234567890"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 block"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-500">
                      © {new Date().getFullYear()} FlexLinen. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
} 