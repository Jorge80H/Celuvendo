import { Router } from "express";
import { db } from "./db";
import {
  inventory,
  inventoryMovements,
  priceHistory,
  suppliers,
  orders,
  orderItems,
  documents,
  stockAlerts,
  logisticsWebhooks,
  users,
  insertInventorySchema,
  insertInventoryMovementSchema,
  insertPriceHistorySchema,
  insertSupplierSchema,
  insertOrderSchema,
  insertDocumentSchema,
  insertUserSchema,
} from "../shared/inventory-schema";
import { eq, and, gte, lte, desc, sql, isNull, or } from "drizzle-orm";
import { authenticate, authorize, AuthRequest, hashPassword, generateToken, comparePassword } from "./auth";
import { z } from "zod";

const router = Router();

// ===== AUTENTICACIÓN =====

// Registro de usuario (solo admin puede crear usuarios)
router.post("/auth/register",
  authenticate,
  authorize("admin"),
  async (req: AuthRequest, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const passwordHash = await hashPassword(data.passwordHash);

      const [user] = await db.insert(users).values({
        ...data,
        passwordHash,
      }).returning();

      const { passwordHash: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(req.body);

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener perfil actual
router.get("/auth/me", authenticate, async (req: AuthRequest, res) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.user!.id)).limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== INVENTARIO =====

// Crear entrada de inventario
router.post("/inventory",
  authenticate,
  authorize("admin", "warehouse_manager", "inventory_clerk"),
  async (req: AuthRequest, res) => {
    try {
      const data = insertInventorySchema.parse(req.body);

      const [item] = await db.insert(inventory).values({
        ...data,
        createdBy: req.user!.id,
      }).returning();

      // Registrar movimiento
      await db.insert(inventoryMovements).values({
        inventoryId: item.id,
        fromStatus: null,
        toStatus: item.status,
        reason: "Initial entry",
        performedBy: req.user!.id,
      });

      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Listar inventario con filtros
router.get("/inventory", authenticate, async (req: AuthRequest, res) => {
  try {
    const { status, productId, imei, serialNumber, condition, limit = 100, offset = 0 } = req.query;

    let query = db.select().from(inventory);

    const conditions = [];
    if (status) conditions.push(eq(inventory.status, status as any));
    if (productId) conditions.push(eq(inventory.productId, productId as string));
    if (imei) conditions.push(eq(inventory.imei, imei as string));
    if (serialNumber) conditions.push(eq(inventory.serialNumber, serialNumber as string));
    if (condition) conditions.push(eq(inventory.condition, condition as string));

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const items = await query
      .limit(Number(limit))
      .offset(Number(offset))
      .orderBy(desc(inventory.createdAt));

    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener item de inventario por ID
router.get("/inventory/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const [item] = await db.select().from(inventory).where(eq(inventory.id, req.params.id)).limit(1);

    if (!item) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar item de inventario
router.put("/inventory/:id",
  authenticate,
  authorize("admin", "warehouse_manager", "inventory_clerk"),
  async (req: AuthRequest, res) => {
    try {
      const updates = insertInventorySchema.partial().parse(req.body);

      const [item] = await db
        .update(inventory)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(inventory.id, req.params.id))
        .returning();

      if (!item) {
        return res.status(404).json({ error: "Inventory item not found" });
      }

      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Cambiar estado de item (con registro de movimiento)
router.post("/inventory/:id/move",
  authenticate,
  authorize("admin", "warehouse_manager", "inventory_clerk", "logistics_coordinator"),
  async (req: AuthRequest, res) => {
    try {
      const { toStatus, toLocation, orderId, reason, notes } = z.object({
        toStatus: z.enum([
          "purchased", "in_transit", "in_warehouse", "reserved", "preparing",
          "packed", "ready_to_ship", "shipped", "delivered", "returned", "damaged", "lost"
        ]),
        toLocation: z.string().optional(),
        orderId: z.string().optional(),
        reason: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);

      // Obtener estado actual
      const [currentItem] = await db.select().from(inventory).where(eq(inventory.id, req.params.id)).limit(1);

      if (!currentItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }

      // Actualizar inventario
      const [updatedItem] = await db
        .update(inventory)
        .set({
          status: toStatus,
          warehouseLocation: toLocation || currentItem.warehouseLocation,
          currentOrderId: orderId || currentItem.currentOrderId,
          updatedAt: new Date(),
        })
        .where(eq(inventory.id, req.params.id))
        .returning();

      // Registrar movimiento
      const [movement] = await db.insert(inventoryMovements).values({
        inventoryId: req.params.id,
        fromStatus: currentItem.status,
        toStatus,
        fromLocation: currentItem.warehouseLocation || undefined,
        toLocation,
        orderId,
        reason,
        notes,
        performedBy: req.user!.id,
      }).returning();

      res.json({
        inventory: updatedItem,
        movement,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Historial de movimientos de un item
router.get("/inventory/:id/movements", authenticate, async (req: AuthRequest, res) => {
  try {
    const movements = await db
      .select()
      .from(inventoryMovements)
      .where(eq(inventoryMovements.inventoryId, req.params.id))
      .orderBy(desc(inventoryMovements.performedAt));

    res.json(movements);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Reporte de stock por producto
router.get("/inventory/reports/stock-by-product", authenticate, async (req: AuthRequest, res) => {
  try {
    const stockReport = await db
      .select({
        productId: inventory.productId,
        status: inventory.status,
        count: sql<number>`count(*)::int`,
      })
      .from(inventory)
      .groupBy(inventory.productId, inventory.status);

    res.json(stockReport);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PRECIOS =====

// Crear precio
router.post("/prices",
  authenticate,
  authorize("admin", "warehouse_manager"),
  async (req: AuthRequest, res) => {
    try {
      const data = insertPriceHistorySchema.parse(req.body);

      const [price] = await db.insert(priceHistory).values({
        ...data,
        createdBy: req.user!.id,
      }).returning();

      res.status(201).json(price);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Obtener precio actual de un producto
router.get("/prices/current/:productId", async (req, res) => {
  try {
    const { priceType = "base" } = req.query;
    const now = new Date();

    const [price] = await db
      .select()
      .from(priceHistory)
      .where(
        and(
          eq(priceHistory.productId, req.params.productId),
          eq(priceHistory.priceType, priceType as any),
          eq(priceHistory.isActive, true),
          lte(priceHistory.validFrom, now),
          or(
            isNull(priceHistory.validTo),
            gte(priceHistory.validTo, now)
          )
        )
      )
      .orderBy(desc(priceHistory.validFrom))
      .limit(1);

    if (!price) {
      return res.status(404).json({ error: "No active price found" });
    }

    res.json(price);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Historial de precios de un producto
router.get("/prices/history/:productId", authenticate, async (req: AuthRequest, res) => {
  try {
    const prices = await db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.productId, req.params.productId))
      .orderBy(desc(priceHistory.validFrom));

    res.json(prices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Desactivar precio
router.patch("/prices/:id/deactivate",
  authenticate,
  authorize("admin", "warehouse_manager"),
  async (req: AuthRequest, res) => {
    try {
      const [price] = await db
        .update(priceHistory)
        .set({ isActive: false })
        .where(eq(priceHistory.id, req.params.id))
        .returning();

      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }

      res.json(price);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
});

// ===== PROVEEDORES =====

// Crear proveedor
router.post("/suppliers",
  authenticate,
  authorize("admin", "warehouse_manager"),
  async (req: AuthRequest, res) => {
    try {
      const data = insertSupplierSchema.parse(req.body);

      const [supplier] = await db.insert(suppliers).values(data).returning();

      res.status(201).json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Listar proveedores
router.get("/suppliers", authenticate, async (req: AuthRequest, res) => {
  try {
    const { isActive } = req.query;

    let query = db.select().from(suppliers);

    if (isActive !== undefined) {
      query = query.where(eq(suppliers.isActive, isActive === "true")) as any;
    }

    const results = await query.orderBy(suppliers.name);

    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener proveedor por ID
router.get("/suppliers/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, req.params.id)).limit(1);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar proveedor
router.put("/suppliers/:id",
  authenticate,
  authorize("admin", "warehouse_manager"),
  async (req: AuthRequest, res) => {
    try {
      const updates = insertSupplierSchema.partial().parse(req.body);

      const [supplier] = await db
        .update(suppliers)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(suppliers.id, req.params.id))
        .returning();

      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }

      res.json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// ===== ÓRDENES =====

// Crear orden
router.post("/orders",
  authenticate,
  authorize("admin", "warehouse_manager", "logistics_coordinator"),
  async (req: AuthRequest, res) => {
    try {
      const { items, ...orderData } = z.object({
        orderNumber: z.string(),
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string(),
        shippingAddress: z.object({
          street: z.string(),
          city: z.string(),
          state: z.string(),
          zipCode: z.string(),
          country: z.string(),
          additionalInfo: z.string().optional(),
        }),
        subtotal: z.string(),
        tax: z.string().optional(),
        shippingCost: z.string().optional(),
        total: z.string(),
        currency: z.string().optional(),
        customerNotes: z.string().optional(),
        internalNotes: z.string().optional(),
        items: z.array(z.object({
          inventoryId: z.string(),
          productId: z.string(),
          quantity: z.number(),
          unitPrice: z.string(),
          subtotal: z.string(),
        })),
      }).parse(req.body);

      // Crear orden
      const [order] = await db.insert(orders).values(orderData).returning();

      // Crear items de orden
      const createdItems = await db.insert(orderItems).values(
        items.map(item => ({
          ...item,
          orderId: order.id,
        }))
      ).returning();

      // Reservar inventario
      for (const item of items) {
        await db
          .update(inventory)
          .set({
            status: "reserved",
            currentOrderId: order.id,
            updatedAt: new Date(),
          })
          .where(eq(inventory.id, item.inventoryId));

        // Registrar movimiento
        await db.insert(inventoryMovements).values({
          inventoryId: item.inventoryId,
          toStatus: "reserved",
          orderId: order.id,
          reason: "Reserved for order",
          performedBy: req.user!.id,
        });
      }

      res.status(201).json({
        order,
        items: createdItems,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Listar órdenes
router.get("/orders", authenticate, async (req: AuthRequest, res) => {
  try {
    const { status, limit = 100, offset = 0 } = req.query;

    let query = db.select().from(orders);

    if (status) {
      query = query.where(eq(orders.status, status as string)) as any;
    }

    const results = await query
      .limit(Number(limit))
      .offset(Number(offset))
      .orderBy(desc(orders.createdAt));

    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener orden por ID
router.get("/orders/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const [order] = await db.select().from(orders).where(eq(orders.id, req.params.id)).limit(1);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Obtener items
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, req.params.id));

    res.json({
      ...order,
      items,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de orden
router.patch("/orders/:id/status",
  authenticate,
  authorize("admin", "warehouse_manager", "logistics_coordinator"),
  async (req: AuthRequest, res) => {
    try {
      const { status, trackingNumber, estimatedDeliveryDate, actualDeliveryDate } = z.object({
        status: z.enum(["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"]),
        trackingNumber: z.string().optional(),
        estimatedDeliveryDate: z.string().optional(),
        actualDeliveryDate: z.string().optional(),
      }).parse(req.body);

      const [order] = await db
        .update(orders)
        .set({
          status,
          trackingNumber,
          estimatedDeliveryDate: estimatedDeliveryDate ? new Date(estimatedDeliveryDate) : undefined,
          actualDeliveryDate: actualDeliveryDate ? new Date(actualDeliveryDate) : undefined,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, req.params.id))
        .returning();

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// ===== DOCUMENTOS =====

// Subir documento
router.post("/documents",
  authenticate,
  authorize("admin", "warehouse_manager", "inventory_clerk", "logistics_coordinator"),
  async (req: AuthRequest, res) => {
    try {
      const data = insertDocumentSchema.parse(req.body);

      const [document] = await db.insert(documents).values({
        ...data,
        uploadedBy: req.user!.id,
      }).returning();

      res.status(201).json(document);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Obtener documentos de inventario
router.get("/documents/inventory/:inventoryId", authenticate, async (req: AuthRequest, res) => {
  try {
    const docs = await db
      .select()
      .from(documents)
      .where(eq(documents.inventoryId, req.params.inventoryId))
      .orderBy(desc(documents.uploadedAt));

    res.json(docs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener documentos de orden
router.get("/documents/order/:orderId", authenticate, async (req: AuthRequest, res) => {
  try {
    const docs = await db
      .select()
      .from(documents)
      .where(eq(documents.orderId, req.params.orderId))
      .orderBy(desc(documents.uploadedAt));

    res.json(docs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ALERTAS DE STOCK =====

// Crear alerta de stock
router.post("/stock-alerts",
  authenticate,
  authorize("admin", "warehouse_manager"),
  async (req: AuthRequest, res) => {
    try {
      const { productId, minStockLevel } = z.object({
        productId: z.string(),
        minStockLevel: z.number(),
      }).parse(req.body);

      // Contar stock disponible
      const [stockCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(inventory)
        .where(
          and(
            eq(inventory.productId, productId),
            eq(inventory.status, "in_warehouse")
          )
        );

      const currentStock = stockCount?.count || 0;

      if (currentStock <= minStockLevel) {
        const [alert] = await db.insert(stockAlerts).values({
          productId,
          minStockLevel,
          currentStock,
        }).returning();

        res.status(201).json(alert);
      } else {
        res.json({ message: "Stock is above minimum level", currentStock, minStockLevel });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
});

// Listar alertas activas
router.get("/stock-alerts", authenticate, async (req: AuthRequest, res) => {
  try {
    const alerts = await db
      .select()
      .from(stockAlerts)
      .where(eq(stockAlerts.status, "active"))
      .orderBy(desc(stockAlerts.createdAt));

    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== WEBHOOKS LOGÍSTICOS =====

// Recibir webhook de operador logístico
router.post("/webhooks/logistics", async (req, res) => {
  try {
    const { provider, event, orderId, ...payload } = req.body;

    const [webhook] = await db.insert(logisticsWebhooks).values({
      provider,
      event,
      orderId,
      payload,
    }).returning();

    // Aquí iría lógica de procesamiento según el evento
    // Por ahora solo almacenamos

    res.status(200).json({ received: true, webhookId: webhook.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Listar webhooks recibidos
router.get("/webhooks/logistics",
  authenticate,
  authorize("admin", "logistics_coordinator"),
  async (req: AuthRequest, res) => {
    try {
      const { processed, limit = 100, offset = 0 } = req.query;

      let query = db.select().from(logisticsWebhooks);

      if (processed !== undefined) {
        query = query.where(eq(logisticsWebhooks.processed, processed === "true")) as any;
      }

      const webhooks = await query
        .limit(Number(limit))
        .offset(Number(offset))
        .orderBy(desc(logisticsWebhooks.receivedAt));

      res.json(webhooks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
});

export default router;
