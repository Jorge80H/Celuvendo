import { i } from "@instantdb/core";

// Define the schema for InstantDB
const schema = i.schema({
  entities: {
    products: i.entity({
      sku: i.string().unique().indexed(),
      name: i.string().indexed(),
      slug: i.string().unique().indexed(),
      description: i.string(),
      longDescription: i.string().optional(),
      brand: i.string().indexed(),
      price: i.number(),
      compareAtPrice: i.number().optional(),
      currency: i.string(),
      images: i.json(), // Array of image URLs
      specifications: i.json(), // Nested object with screen, processor, ram, etc.
      features: i.json(), // Array of feature strings
      colors: i.json().optional(), // Array of color objects
      highlights: i.json().optional(), // pros/cons object
      boxContents: i.json().optional(), // included/notIncluded object
      promotion: i.json().optional(), // promotion object
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
      selectedColor: i.string().optional(),
      createdAt: i.number(),
    }),
    orders: i.entity({
      orderNumber: i.string().unique().indexed(),
      sessionId: i.string().indexed(),
      // Customer information
      customerName: i.string(),
      documentType: i.string(),
      documentNumber: i.string().indexed(),
      address: i.string(),
      city: i.string(),
      phone: i.string(),
      email: i.string().indexed(),
      // Order details
      items: i.json(), // Array of order items
      subtotal: i.number(),
      shipping: i.number(),
      discount: i.number(),
      total: i.number(),
      // Payment information
      paymentMethod: i.string().optional(),
      paymentStatus: i.string().indexed(), // pending, paid, failed
      boldTransactionId: i.string().optional(),
      boldOrderId: i.string().optional(),
      // Status
      orderStatus: i.string().indexed(), // pending, processing, shipped, delivered, cancelled
      // Timestamps
      createdAt: i.number(),
      paidAt: i.number().optional(),
      updatedAt: i.number(),
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
  selectedColor?: string;
  createdAt: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  sessionId: string;
  // Customer information
  customerName: string;
  documentType: string;
  documentNumber: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  // Order details
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  // Payment information
  paymentMethod?: string;
  paymentStatus: string;
  boldTransactionId?: string;
  boldOrderId?: string;
  // Status
  orderStatus: string;
  // Timestamps
  createdAt: number;
  paidAt?: number;
  updatedAt: number;
}
