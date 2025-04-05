export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  sizes: string[];
  colors: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Track Pants',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    category: 'Lowers',
    rating: 4,
    description: 'Premium quality track pants made with breathable fabric for ultimate comfort during workouts.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    features: ['Breathable fabric', 'Elastic waistband', 'Zippered pockets', 'Moisture wicking'],
  },
  {
    id: '2',
    name: 'Classic Tracksuit Set',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    category: 'Tracksuits',
    rating: 5,
    description: 'Complete tracksuit set with matching jacket and pants, perfect for both workouts and casual wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    features: ['Matching set', 'Breathable material', 'Elastic cuffs', 'Zippered pockets'],
  },
  {
    id: '3',
    name: 'Performance Shorts',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    category: 'Lowers',
    rating: 4,
    description: 'Lightweight and comfortable shorts designed for high-performance workouts.',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Grey'],
    features: ['Quick-dry fabric', 'Built-in liner', 'Elastic waistband', 'Zippered pocket'],
  },
  {
    id: '4',
    name: 'Sports Bra',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    rating: 5,
    description: 'High-support sports bra with moisture-wicking fabric for intense workouts.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Pink'],
    features: ['High support', 'Moisture wicking', 'Adjustable straps', 'Breathable fabric'],
  },
  {
    id: '5',
    name: 'Training T-Shirt',
    price: 999,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    rating: 4,
    description: 'Comfortable and stylish training t-shirt made with breathable fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    features: ['Breathable fabric', 'Moisture wicking', 'Tagless design', 'Relaxed fit'],
  },
  {
    id: '6',
    name: 'Premium Hoodie',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    category: 'Tracksuits',
    rating: 5,
    description: 'Warm and comfortable hoodie perfect for outdoor workouts or casual wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    features: ['Fleece lining', 'Kangaroo pocket', 'Adjustable hood', 'Ribbed cuffs'],
  },
];

export const categories = ['All', 'Lowers', 'Tracksuits', 'Accessories'];

export const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
]; 