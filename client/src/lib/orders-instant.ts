import { db, id } from "./instant";
import type { OrderItem } from "@shared/instant-schema";

export interface CreateOrderData {
  sessionId: string;
  customerName: string;
  documentType: string;
  documentNumber: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

/**
 * Creates a new order in InstantDB
 */
export async function createOrderInstant(data: CreateOrderData) {
  const orderId = id();
  const orderNumber = generateOrderNumber();
  const now = Date.now();

  await db.transact([
    db.tx.orders[orderId].update({
      orderNumber,
      sessionId: data.sessionId,
      customerName: data.customerName,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      items: data.items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      discount: data.discount,
      total: data.total,
      paymentStatus: "pending",
      orderStatus: "pending",
      createdAt: now,
      updatedAt: now,
    }),
  ]);

  return {
    id: orderId,
    orderNumber,
    ...data,
    paymentStatus: "pending",
    orderStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Updates order payment information
 */
export async function updateOrderPaymentInfoInstant(
  orderId: string,
  info: {
    boldTransactionId?: string;
    boldOrderId?: string;
    paymentMethod?: string;
  }
) {
  await db.transact([
    db.tx.orders[orderId].update({
      ...info,
      updatedAt: Date.now(),
    }),
  ]);
}

/**
 * Updates order status
 */
export async function updateOrderStatusInstant(
  orderId: string,
  status: {
    paymentStatus?: string;
    orderStatus?: string;
    paidAt?: number;
  }
) {
  await db.transact([
    db.tx.orders[orderId].update({
      ...status,
      updatedAt: Date.now(),
    }),
  ]);
}

/**
 * Generates a unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CEL-${timestamp}-${random}`;
}
