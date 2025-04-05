export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  products: string[]; // Product IDs
}

export const collections: Collection[] = [
  {
    id: 'summer-essentials',
    name: 'Summer Essentials',
    description: 'Stay cool and stylish with our summer collection featuring breathable fabrics and vibrant designs.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Seasonal',
    featured: true,
    products: ['1', '3', '5']
  },
  {
    id: 'winter-collection',
    name: 'Winter Collection',
    description: 'Premium winter sportswear designed to keep you warm without compromising on style.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    category: 'Seasonal',
    featured: true,
    products: ['2', '6']
  },
  {
    id: 'active-wear',
    name: 'Active Wear',
    description: 'High-performance activewear for your most intense workouts.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    category: 'Sport',
    featured: true,
    products: ['1', '2', '3', '4']
  },
  {
    id: 'athleisure',
    name: 'Athleisure',
    description: 'Comfortable and stylish clothing that transitions seamlessly from workout to hangout.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Lifestyle',
    featured: true,
    products: ['2', '5', '6']
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Engineered for peak performance with advanced moisture-wicking technology.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    category: 'Sport',
    featured: false,
    products: ['1', '3', '4']
  },
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Timeless basics that form the foundation of your athletic wardrobe.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    category: 'Basics',
    featured: false,
    products: ['2', '5', '6']
  }
]; 