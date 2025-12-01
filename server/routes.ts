import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import { randomUUID } from "crypto";
import inventoryRoutes from "./inventory-routes";
import { createBoldPayment, verifyBoldWebhook } from "./lib/bold";
import * as instantServer from "./lib/instant-server";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "celuvendo-secret-key-change-in-production",
      resave: false,
      saveUninitialized: true,
      cookie: { 
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      },
    })
  );

  // Ensure session ID exists
  app.use((req, res, next) => {
    if (!req.session.id) {
      req.session.id = randomUUID();
    }
    next();
  });

  // Inventory Management API
  app.use("/api/v1", inventoryRoutes);

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const filters: any = {};
      
      if (req.query.brand) {
        filters.brand = Array.isArray(req.query.brand) 
          ? req.query.brand 
          : [req.query.brand];
      }
      
      if (req.query.minPrice) {
        filters.minPrice = parseInt(req.query.minPrice as string);
      }
      
      if (req.query.maxPrice) {
        filters.maxPrice = parseInt(req.query.maxPrice as string);
      }
      
      if (req.query.ram) {
        filters.ram = Array.isArray(req.query.ram)
          ? req.query.ram
          : [req.query.ram];
      }
      
      if (req.query.storage) {
        filters.storage = Array.isArray(req.query.storage)
          ? req.query.storage
          : [req.query.storage];
      }
      
      if (req.query.sortBy) {
        filters.sortBy = req.query.sortBy;
      }
      
      if (req.query.search) {
        filters.search = req.query.search;
      }
      
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/slug/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id!;
      const items = await storage.getCartItems(sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id!;
      const data = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });
      
      const item = await storage.addToCart(data);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
      
      const item = await storage.updateCartQuantity(req.params.id, quantity);
      res.json(item);
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id!;
      await storage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Order routes
  app.post("/api/orders/create", async (req, res) => {
    try {
      console.log("Creating order - Step 1: Validating request");
      const {
        customerName,
        documentType,
        documentNumber,
        address,
        city,
        phone,
        email,
        items,
        subtotal,
        shipping,
        total,
        sessionId,
      } = req.body;

      // Validate required fields
      if (!customerName || !documentNumber || !address || !city || !phone || !email || !items || !total) {
        console.error("Missing required fields:", { customerName, documentNumber, address, city, phone, email, items: !!items, total });
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log("Creating order - Step 2: Creating order in InstantDB");
      // Create order in InstantDB
      const order = await instantServer.createOrder({
        sessionId,
        customerName,
        documentType,
        documentNumber,
        address,
        city,
        phone,
        email,
        items,
        subtotal,
        shipping,
        total,
        discount: 0,
      });

      console.log("Creating order - Step 3: Order created", { orderId: order.id, orderNumber: order.orderNumber });

      // Get order number
      const orderNumber = order.orderNumber;

      // Create description for Bold payment
      const itemsDescription = items.map((item: any) =>
        `${item.name} x${item.quantity}`
      ).join(", ");

      // Get app URL for redirect
      const appUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`;

      console.log("Creating order - Step 4: Creating Bold payment", { orderNumber, amount: Math.round(parseFloat(total)) });

      // Create payment with Bold
      const paymentResult = await createBoldPayment({
        orderId: orderNumber,
        description: `Orden #${orderNumber} - ${itemsDescription}`,
        amount: Math.round(parseFloat(total)), // Bold uses COP (pesos), not cents
        currency: "COP",
        redirectUrl: `${appUrl}/payment/confirmation?orderId=${order.id}`,
        customerEmail: email,
        customerName,
        customerPhone: phone,
        customerDocument: documentNumber,
        customerDocumentType: documentType,
      });

      if (!paymentResult.success) {
        console.error("Bold payment failed:", paymentResult.error);
        return res.status(500).json({ error: paymentResult.error });
      }

      console.log("Creating order - Step 5: Payment created, updating order");

      // Update order with Bold transaction info
      await instantServer.updateOrderPaymentInfo(order.id, {
        boldTransactionId: paymentResult.transactionId,
        boldOrderId: paymentResult.orderId,
      });

      console.log("Creating order - Step 6: Success");

      res.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        paymentUrl: paymentResult.paymentUrl,
      });

    } catch (error) {
      console.error("Error creating order:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      console.error("Error message:", error instanceof Error ? error.message : String(error));
      res.status(500).json({
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Bold webhook endpoint
  app.post("/api/webhooks/bold", async (req, res) => {
    try {
      const signature = req.headers["x-bold-signature"] as string;
      const rawBody = (req as any).rawBody;

      // Verify webhook signature
      if (!verifyBoldWebhook(rawBody?.toString() || JSON.stringify(req.body), signature)) {
        console.error("Invalid Bold webhook signature");
        return res.status(401).json({ error: "Invalid signature" });
      }

      const { event, data } = req.body;

      // Handle payment confirmation
      if (event === "payment.success" || event === "transaction.approved") {
        const { orderId, transactionId, amount, status } = data;

        // Find order by Bold order ID (order number)
        const order = await instantServer.getOrderByNumber(orderId);

        if (!order) {
          console.error(`Order not found: ${orderId}`);
          return res.status(404).json({ error: "Order not found" });
        }

        // Update order status
        await instantServer.updateOrderStatus(order.id, {
          paymentStatus: "paid",
          orderStatus: "processing",
          paidAt: Date.now(),
        });

        // Clear cart
        await instantServer.clearCart(order.sessionId);

        // Send data to n8n webhook
        await sendToN8n(order, data);

        console.log(`Payment confirmed for order ${orderId}`);
      }

      res.json({ success: true });

    } catch (error) {
      console.error("Error processing Bold webhook:", error);
      res.status(500).json({ error: "Failed to process webhook" });
    }
  });

  // Payment confirmation page data
  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      console.log("Fetching order:", req.params.orderId);
      const order = await instantServer.getOrderById(req.params.orderId);

      if (!order) {
        console.error("Order not found:", req.params.orderId);
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Order found:", { id: order.id, orderNumber: order.orderNumber, status: order.paymentStatus });
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

/**
 * Send order data to n8n webhook after successful payment
 */
async function sendToN8n(order: any, paymentData: any) {
  try {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.warn("N8N_WEBHOOK_URL not configured");
      return;
    }

    // Prepare data for n8n
    const items = order.items; // Already an array from InstantDB

    const webhookData = {
      // Customer info
      customerName: order.customerName,
      documentType: order.documentType,
      documentNumber: order.documentNumber,
      address: order.address,
      city: order.city,
      phone: order.phone,
      email: order.email,

      // Order info
      orderNumber: order.orderNumber,
      orderDate: new Date(order.createdAt).toISOString(),

      // Product details (first item for simplicity - adjust if multiple items)
      productBrand: items[0]?.brand || "",
      productName: items[0]?.name || "",
      productColor: items[0]?.color || "",

      // Pricing
      price: items[0]?.price || 0,
      initialPayment: order.total, // Full payment amount
      discount: order.discount || 0,
      totalInitial: order.total,

      // Payment
      paymentMethod: paymentData.paymentMethod || "Bold",
      paymentMethodInitial: "Bold",

      // Bold transaction info
      boldTransactionId: order.boldTransactionId,
      boldOrderId: order.boldOrderId,
    };

    // Send to n8n
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      console.error("Failed to send data to n8n:", await response.text());
    } else {
      console.log("Data sent to n8n successfully");
    }

  } catch (error) {
    console.error("Error sending to n8n:", error);
  }
}
