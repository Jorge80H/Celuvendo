import { type Product, type InsertProduct, type CartItem, type InsertCartItem, type Order, type InsertOrder } from "@shared/schema";
import { db } from "./db";
import { products, cartItems, orders } from "@shared/schema";
import { eq, and, gte, lte, inArray, sql, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(filters?: {
    brand?: string[];
    minPrice?: number;
    maxPrice?: number;
    ram?: string[];
    storage?: string[];
    sortBy?: string;
    search?: string;
  }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  updateOrderPaymentInfo(id: string, info: { boldTransactionId?: string; boldOrderId?: string }): Promise<void>;
  updateOrderStatus(id: string, status: { paymentStatus?: string; orderStatus?: string; paidAt?: Date }): Promise<void>;
}

export class DbStorage implements IStorage {
  async getProducts(filters?: {
    brand?: string[];
    minPrice?: number;
    maxPrice?: number;
    ram?: string[];
    storage?: string[];
    sortBy?: string;
    search?: string;
  }): Promise<Product[]> {
    let query = db.select().from(products).where(eq(products.isActive, true));
    
    const conditions = [eq(products.isActive, true)];
    
    if (filters?.brand && filters.brand.length > 0) {
      conditions.push(inArray(products.brand, filters.brand));
    }
    
    if (filters?.minPrice !== undefined) {
      conditions.push(gte(products.price, filters.minPrice.toString()));
    }
    
    if (filters?.maxPrice !== undefined) {
      conditions.push(lte(products.price, filters.maxPrice.toString()));
    }
    
    if (filters?.search) {
      conditions.push(
        sql`${products.name} ILIKE ${`%${filters.search}%`} OR ${products.description} ILIKE ${`%${filters.search}%`}`
      );
    }
    
    let results = await db.select().from(products).where(and(...conditions));
    
    // Filter by RAM and storage in-memory since they're in JSON
    if (filters?.ram && filters.ram.length > 0) {
      results = results.filter(p => {
        const specs = p.specifications as any;
        return filters.ram!.includes(specs.ram);
      });
    }
    
    if (filters?.storage && filters.storage.length > 0) {
      results = results.filter(p => {
        const specs = p.specifications as any;
        return filters.storage!.includes(specs.storage);
      });
    }
    
    // Sort results
    if (filters?.sortBy === 'price_asc') {
      results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters?.sortBy === 'price_desc') {
      results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (filters?.sortBy === 'rating') {
      results.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
    } else if (filters?.sortBy === 'newest') {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return results;
  }
  
  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.slug, slug));
    return result[0];
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
      .limit(8);
  }
  
  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    
    const itemsWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await this.getProduct(item.productId);
        return { ...item, product: product! };
      })
    );
    
    return itemsWithProducts;
  }
  
  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = await db.select().from(cartItems)
      .where(and(
        eq(cartItems.sessionId, item.sessionId),
        eq(cartItems.productId, item.productId)
      ));
    
    if (existing.length > 0) {
      // Update quantity
      const updated = await db.update(cartItems)
        .set({ quantity: existing[0].quantity + item.quantity })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated[0];
    }
    
    const result = await db.insert(cartItems).values(item).returning();
    return result[0];
  }
  
  async updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    if (quantity <= 0) {
      await this.removeFromCart(id);
      return undefined;
    }
    
    const result = await db.update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return result[0];
  }
  
  async removeFromCart(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
  
  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  // Order methods
  async createOrder(order: InsertOrder): Promise<Order> {
    // Generate unique order number
    const orderNumber = `CEL-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const result = await db.insert(orders).values({
      ...order,
      orderNumber,
    }).returning();

    return result[0];
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return result[0];
  }

  async updateOrderPaymentInfo(id: string, info: { boldTransactionId?: string; boldOrderId?: string }): Promise<void> {
    await db.update(orders)
      .set({
        boldTransactionId: info.boldTransactionId,
        boldOrderId: info.boldOrderId,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, id));
  }

  async updateOrderStatus(id: string, status: { paymentStatus?: string; orderStatus?: string; paidAt?: Date }): Promise<void> {
    await db.update(orders)
      .set({
        ...status,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, id));
  }
}

export const storage = new DbStorage();
