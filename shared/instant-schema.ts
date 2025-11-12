import { i } from "@instantdb/core";

// Define the schema for InstantDB
const schema = i.schema({
  entities: {
    products: i.entity({
      sku: i.string().unique().indexed(),
      name: i.string().indexed(),
      slug: i.string().unique().indexed(),
      description: i.string(),
      brand: i.string().indexed(),
      price: i.number(),
      compareAtPrice: i.number().optional(),
      currency: i.string(),
      images: i.json(), // Array of image URLs
      specifications: i.json(), // Nested object with screen, processor, ram, etc.
      features: i.json(), // Array of feature strings
      stock: i.number(),
      isActive: i.boolean(),
      isFeatured: i.boolean(),
      rating: i.number().optional(),
      reviewCount: i.number(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
    cartItems: i.entity({
      sessionId: i.string().indexed(),
      productId: i.string().indexed(),
      quantity: i.number(),
      createdAt: i.number(),
    }),
  },
  links: {
    cartProduct: {
      forward: { on: "cartItems", has: "one", label: "product" },
      reverse: { on: "products", has: "many", label: "cartItems" },
    },
  },
});

export type Schema = typeof schema;
export default schema;

// Type definitions for TypeScript
export interface ProductSpecifications {
  screen: {
    size: string;
    type: string;
    resolution: string;
    refreshRate?: string;
  };
  processor: string;
  ram: string;
  storage: string;
  camera: {
    main: string;
    front: string;
    features?: string[];
  };
  battery: {
    capacity: string;
    charging?: string;
  };
  connectivity: string[];
  os: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  specifications: ProductSpecifications;
  features: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  rating?: number;
  reviewCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  id: string;
  sessionId: string;
  productId: string;
  quantity: number;
  createdAt: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}
