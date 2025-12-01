import { init, tx, id } from "@instantdb/admin";
import type { Schema } from "@shared/instant-schema";

// Get InstantDB credentials from environment
const INSTANT_APP_ID = process.env.INSTANT_APP_ID;
const INSTANT_ADMIN_TOKEN = process.env.INSTANT_ADMIN_TOKEN;

// Log environment for debugging
console.log("InstantDB Config:", {
  hasAppId: !!INSTANT_APP_ID,
  hasAdminToken: !!INSTANT_ADMIN_TOKEN,
  appIdLength: INSTANT_APP_ID?.length || 0,
});

// Initialize InstantDB admin client
let db: ReturnType<typeof init<Schema>>;

try {
  if (!INSTANT_APP_ID || !INSTANT_ADMIN_TOKEN) {
    throw new Error(
      "INSTANT_APP_ID and INSTANT_ADMIN_TOKEN must be set in environment variables"
    );
  }

  db = init<Schema>({
    appId: INSTANT_APP_ID,
    adminToken: INSTANT_ADMIN_TOKEN,
  });

  console.log("InstantDB initialized successfully");
} catch (error) {
  console.error("Failed to initialize InstantDB:", error);
  throw error;
}

export { db, tx, id };

/**
 * Queries orders by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  const result = await db.query({
    orders: {
      $: {
        where: {
          orderNumber,
        },
      },
    },
  });

  return result.orders?.[0];
}

/**
 * Queries order by ID
 */
export async function getOrderById(orderId: string) {
  const result = await db.query({
    orders: {
      $: {
        where: {
          id: orderId,
        },
      },
    },
  });

  return result.orders?.[0];
}

/**
 * Creates a new order
 */
export async function createOrder(orderData: {
  sessionId: string;
  customerName: string;
  documentType: string;
  documentNumber: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  items: any[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}) {
  const orderId = id();
  const orderNumber = generateOrderNumber();
  const now = Date.now();

  await db.transact([
    tx.orders[orderId].update({
      orderNumber,
      ...orderData,
      paymentStatus: "pending",
      orderStatus: "pending",
      createdAt: now,
      updatedAt: now,
    }),
  ]);

  return {
    id: orderId,
    orderNumber,
    ...orderData,
    paymentStatus: "pending",
    orderStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Updates order payment information
 */
export async function updateOrderPaymentInfo(
  orderId: string,
  info: {
    boldTransactionId?: string;
    boldOrderId?: string;
    paymentMethod?: string;
  }
) {
  await db.transact([
    tx.orders[orderId].update({
      ...info,
      updatedAt: Date.now(),
    }),
  ]);
}

/**
 * Updates order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: {
    paymentStatus?: string;
    orderStatus?: string;
    paidAt?: number;
  }
) {
  await db.transact([
    tx.orders[orderId].update({
      ...status,
      updatedAt: Date.now(),
    }),
  ]);
}

/**
 * Clears cart for a session
 */
export async function clearCart(sessionId: string) {
  const result = await db.query({
    cartItems: {
      $: {
        where: {
          sessionId,
        },
      },
    },
  });

  if (result.cartItems && result.cartItems.length > 0) {
    const deleteTxs = result.cartItems.map((item: any) =>
      tx.cartItems[item.id].delete()
    );
    await db.transact(deleteTxs);
  }
}

/**
 * Generates a unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CEL-${timestamp}-${random}`;
}
