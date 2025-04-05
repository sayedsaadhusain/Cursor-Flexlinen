'use client';

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CATEGORY_INFO = {
  tracksuits: {
    name: 'Tracksuits',
    description: 'Premium tracksuits for ultimate comfort and style.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=80',
  },
  lowers: {
    name: 'Lowers',
    description: 'Comfortable and stylish lower wear for every occasion.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80',
  },
  accessories: {
    name: 'Accessories',
    description: 'Complete your look with our range of accessories.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=2000&q=80',
  },
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const category = CATEGORY_INFO[categoryId as keyof typeof CATEGORY_INFO];

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryId.toLowerCase()
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-900">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative h-[40vh] min-h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">No products found</h2>
            <p className="mt-2 text-gray-600">Check back soon for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
} 