import type { Product } from "@shared/schema";

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
  const params = new URLSearchParams();
  
  if (filters?.brand) {
    filters.brand.forEach(b => params.append('brand', b));
  }
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters?.ram) {
    filters.ram.forEach(r => params.append('ram', r));
  }
  if (filters?.storage) {
    filters.storage.forEach(s => params.append('storage', s));
  }
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);
  if (filters?.search) params.append('search', filters.search);
  
  const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetch('/api/products/featured');
  
  if (!response.ok) {
    throw new Error('Failed to fetch featured products');
  }
  
  return response.json();
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
