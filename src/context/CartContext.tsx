'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  isSearching: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'HYDRATE_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSearching: (isSearching: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'flexlinen-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const newState = existingItem
        ? {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: state.total + action.payload.price
          }
        : {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
            total: state.total + action.payload.price
          };
      
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload);
      if (!item) return state;

      const newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (item.price * item.quantity)
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      const newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }

    case 'CLEAR_CART': {
      localStorage.removeItem(CART_STORAGE_KEY);
      return {
        items: [],
        total: 0,
        isLoading: false,
        isSearching: false
      };
    }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_SEARCHING':
      return {
        ...state,
        isSearching: action.payload
      };

    case 'HYDRATE_CART':
      return {
        ...action.payload,
        isSearching: false
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    isLoading: true,
    isSearching: false
  });

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'HYDRATE_CART', payload: { ...parsedCart, isLoading: false } });
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const addItem = (product: Product) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'ADD_ITEM', payload: product });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 300);
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 300);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 300);
  };

  const clearCart = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 300);
  };

  const setSearching = (isSearching: boolean) => {
    dispatch({ type: 'SET_SEARCHING', payload: isSearching });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, setSearching }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 