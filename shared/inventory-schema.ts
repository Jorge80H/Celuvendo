import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, json, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "./schema";

// ===== ENUMS =====
export const inventoryStatusEnum = pgEnum("inventory_status", [
  "purchased",          // Comprado al proveedor
  "in_transit",        // En tránsito hacia almacén
  "in_warehouse",      // En almacén
  "reserved",          // Reservado para orden
  "preparing",         // En preparación
  "packed",            // Empacado
  "ready_to_ship",     // Listo para envío
  "shipped",           // Enviado
  "delivered",         // Entregado
  "returned",          // Devuelto
  "damaged",           // Dañado
  "lost"              // Perdido
]);

export const priceTypeEnum = pgEnum("price_type", [
  "base",             // Precio base
  "promotional",      // Precio promocional
  "wholesale",        // Precio mayorista
  "special"           // Precio especial (cliente específico)
]);

export const documentTypeEnum = pgEnum("document_type", [
  "invoice",          // Factura
  "receipt",          // Recibo
  "packing_slip",     // Guía de empaque
  "shipping_label",   // Etiqueta de envío
  "delivery_proof",   // Prueba de entrega
  "purchase_order",   // Orden de compra
  "other"
]);

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "warehouse_manager",
  "inventory_clerk",
  "logistics_coordinator",
  "viewer"
]);

// ===== USUARIOS =====
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: userRoleEnum("role").notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// ===== INVENTARIO =====
export const inventory = pgTable("inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  imei: text("imei").unique(), // Opcional para equipos con IMEI
  serialNumber: text("serial_number").unique(), // Número de serie
  status: inventoryStatusEnum("status").notNull().default("purchased"),

  // Información de compra
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  supplierId: varchar("supplier_id"),
  purchaseOrderRef: text("purchase_order_ref"),

  // Ubicación física
  warehouseLocation: text("warehouse_location"), // Ej: "A-12-3"
  bin: text("bin"), // Contenedor específico

  // Trazabilidad
  currentOrderId: varchar("current_order_id"), // Referencia a orden actual si está reservado

  // Condición
  condition: text("condition").notNull().default("new"), // new, refurbished, damaged
  notes: text("notes"),

  // Metadata
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertInventorySchema = createInsertSchema(inventory).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Inventory = typeof inventory.$inferSelect;
export type InsertInventory = z.infer<typeof insertInventorySchema>;

// ===== HISTORIAL DE MOVIMIENTOS DE INVENTARIO =====
export const inventoryMovements = pgTable("inventory_movements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inventoryId: varchar("inventory_id").notNull().references(() => inventory.id, { onDelete: "cascade" }),

  fromStatus: inventoryStatusEnum("from_status"),
  toStatus: inventoryStatusEnum("to_status").notNull(),

  fromLocation: text("from_location"),
  toLocation: text("to_location"),

  orderId: varchar("order_id"), // Referencia a orden si aplica

  reason: text("reason"), // Razón del movimiento
  notes: text("notes"),

  performedBy: varchar("performed_by").notNull().references(() => users.id),
  performedAt: timestamp("performed_at").notNull().defaultNow(),
});

export const insertInventoryMovementSchema = createInsertSchema(inventoryMovements).omit({
  id: true,
  performedAt: true,
});

export type InventoryMovement = typeof inventoryMovements.$inferSelect;
export type InsertInventoryMovement = z.infer<typeof insertInventoryMovementSchema>;

// ===== GESTIÓN DE PRECIOS =====
export const priceHistory = pgTable("price_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),

  priceType: priceTypeEnum("price_type").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("COP"),

  // Vigencia
  validFrom: timestamp("valid_from").notNull(),
  validTo: timestamp("valid_to"), // null = indefinido

  // Condiciones
  minQuantity: integer("min_quantity").default(1), // Cantidad mínima para este precio
  customerId: varchar("customer_id"), // Para precios especiales de cliente específico

  reason: text("reason"), // Razón del cambio de precio
  notes: text("notes"),

  isActive: boolean("is_active").notNull().default(true),

  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory).omit({
  id: true,
  createdAt: true,
});

export type PriceHistory = typeof priceHistory.$inferSelect;
export type InsertPriceHistory = z.infer<typeof insertPriceHistorySchema>;

// ===== PROVEEDORES =====
export const suppliers = pgTable("suppliers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  legalName: text("legal_name"),
  taxId: text("tax_id"), // NIT o equivalente

  // Contacto
  contactName: text("contact_name"),
  email: text("email"),
  phone: text("phone"),

  // Dirección
  address: json("address").$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),

  // Términos comerciales
  paymentTerms: text("payment_terms"), // Ej: "30 días"
  currency: text("currency").default("COP"),

  notes: text("notes"),
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;

// ===== ÓRDENES =====
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(), // Número de orden único

  // Cliente
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),

  // Dirección de envío
  shippingAddress: json("shipping_address").$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    additionalInfo?: string;
  }>().notNull(),

  // Totales
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull().default("0"),
  shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).notNull().default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("COP"),

  // Estado
  status: text("status").notNull().default("pending"), // pending, confirmed, preparing, shipped, delivered, cancelled

  // Logística
  shippingProvider: text("shipping_provider"), // TBD: operador logístico
  trackingNumber: text("tracking_number"),
  estimatedDeliveryDate: timestamp("estimated_delivery_date"),
  actualDeliveryDate: timestamp("actual_delivery_date"),

  // Notas
  customerNotes: text("customer_notes"),
  internalNotes: text("internal_notes"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// ===== ITEMS DE ORDEN =====
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  inventoryId: varchar("inventory_id").notNull().references(() => inventory.id, { onDelete: "restrict" }),
  productId: varchar("product_id").notNull().references(() => products.id),

  quantity: integer("quantity").notNull().default(1),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
  createdAt: true,
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

// ===== DOCUMENTOS =====
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),

  // Relación (puede estar asociado a inventario, orden, o ambos)
  inventoryId: varchar("inventory_id").references(() => inventory.id, { onDelete: "cascade" }),
  orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }),

  documentType: documentTypeEnum("document_type").notNull(),
  documentNumber: text("document_number"), // Número del documento (factura, guía, etc.)

  // Archivo
  fileUrl: text("file_url"), // URL del archivo (S3, CloudStorage, etc.)
  fileName: text("file_name"),
  fileType: text("file_type"), // pdf, jpg, png, etc.

  // Metadata
  issueDate: timestamp("issue_date"),
  expiryDate: timestamp("expiry_date"),

  notes: text("notes"),

  uploadedBy: varchar("uploaded_by").notNull().references(() => users.id),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

// ===== ALERTAS DE STOCK =====
export const stockAlerts = pgTable("stock_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),

  minStockLevel: integer("min_stock_level").notNull(),
  currentStock: integer("current_stock").notNull(),

  status: text("status").notNull().default("active"), // active, resolved, dismissed

  notifiedAt: timestamp("notified_at"),
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: varchar("resolved_by").references(() => users.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertStockAlertSchema = createInsertSchema(stockAlerts).omit({
  id: true,
  createdAt: true,
});

export type StockAlert = typeof stockAlerts.$inferSelect;
export type InsertStockAlert = z.infer<typeof insertStockAlertSchema>;

// ===== INTEGRACIÓN LOGÍSTICA =====
// Webhooks entrantes del operador logístico
export const logisticsWebhooks = pgTable("logistics_webhooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),

  provider: text("provider").notNull(), // Nombre del proveedor logístico
  event: text("event").notNull(), // shipped, in_transit, delivered, failed, etc.

  payload: json("payload").$type<Record<string, any>>().notNull(), // Payload completo del webhook

  processed: boolean("processed").notNull().default(false),
  processedAt: timestamp("processed_at"),

  error: text("error"), // Si hubo error al procesar

  receivedAt: timestamp("received_at").notNull().defaultNow(),
});

export const insertLogisticsWebhookSchema = createInsertSchema(logisticsWebhooks).omit({
  id: true,
  receivedAt: true,
});

export type LogisticsWebhook = typeof logisticsWebhooks.$inferSelect;
export type InsertLogisticsWebhook = z.infer<typeof insertLogisticsWebhookSchema>;

// ===== CONFIGURACIÓN DEL SISTEMA =====
export const systemConfig = pgTable("system_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: json("value").$type<any>().notNull(),
  description: text("description"),
  updatedBy: varchar("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSystemConfigSchema = createInsertSchema(systemConfig).omit({
  id: true,
  updatedAt: true,
});

export type SystemConfig = typeof systemConfig.$inferSelect;
export type InsertSystemConfig = z.infer<typeof insertSystemConfigSchema>;
