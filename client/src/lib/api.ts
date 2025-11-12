import type { Product } from "@shared/schema";
import { db } from "./instant";

export interface ProductFilters {
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  ram?: string[];
  storage?: string[];
  sortBy?: string;
  search?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const { data, error } = await db.useQuery({ products: {} });

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }

  let products = data?.products || [];

  // Apply filters
  if (filters?.brand && filters.brand.length > 0) {
    products = products.filter(p => filters.brand!.includes(p.brand));
  }

  if (filters?.minPrice !== undefined) {
    products = products.filter(p => parseFloat(p.price) >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    products = products.filter(p => parseFloat(p.price) <= filters.maxPrice!);
  }

  if (filters?.ram && filters.ram.length > 0) {
    products = products.filter(p => p.ram && filters.ram!.includes(p.ram));
  }

  if (filters?.storage && filters.storage.length > 0) {
    products = products.filter(p => p.storage && filters.storage!.includes(p.storage));
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        products.sort((a, b) => (parseFloat(b.rating || '0') - parseFloat(a.rating || '0')));
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await db.useQuery({ products: {} });

  if (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Failed to fetch featured products');
  }

  const products = data?.products || [];

  // Return products with rating > 4.5 or first 6
  return products
    .filter(p => p.rating && parseFloat(p.rating) >= 4.5)
    .slice(0, 6);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json();
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`/api/products/slug/${slug}`);
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json();
}

export interface CartItemWithProduct {
  id: string;
  sessionId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  product: Product;
}

export async function getCart(): Promise<CartItemWithProduct[]> {
  const response = await fetch('/api/cart');
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  return response.json();
}

export async function addToCart(productId: string, quantity: number = 1): Promise<void> {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }
}

export async function updateCartQuantity(id: string, quantity: number): Promise<void> {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update cart');
  }
}

export async function removeFromCart(id: string): Promise<void> {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to remove from cart');
  }
}

export async function clearCart(): Promise<void> {
  const response = await fetch('/api/cart', {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }
}
