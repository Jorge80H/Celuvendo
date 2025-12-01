# Diagrama de Base de Datos - Sistema de Inventario y Trazabilidad

## Diagrama ERD (Entidad-Relación)

```
┌─────────────────────────┐
│        USERS            │
├─────────────────────────┤
│ id (PK)                 │
│ email (unique)          │
│ passwordHash            │
│ firstName               │
│ lastName                │
│ role (enum)             │
│ isActive                │
│ createdAt               │
│ updatedAt               │
└─────────────────────────┘
          │
          │ createdBy
          ↓
┌─────────────────────────┐       ┌─────────────────────────┐
│      SUPPLIERS          │       │       PRODUCTS          │
├─────────────────────────┤       ├─────────────────────────┤
│ id (PK)                 │       │ id (PK)                 │
│ name                    │       │ sku (unique)            │
│ legalName               │       │ name                    │
│ taxId                   │       │ slug (unique)           │
│ contactName             │       │ description             │
│ email                   │       │ brand                   │
│ phone                   │       │ price                   │
│ address (JSON)          │       │ compareAtPrice          │
│ paymentTerms            │       │ currency                │
│ currency                │       │ images (JSON)           │
│ notes                   │       │ specifications (JSON)   │
│ isActive                │       │ features (JSON)         │
│ createdAt               │       │ stock                   │
│ updatedAt               │       │ isActive                │
└─────────────────────────┘       │ isFeatured              │
          │                       │ rating                  │
          │                       │ reviewCount             │
          │ supplierId            │ createdAt               │
          ↓                       │ updatedAt               │
┌─────────────────────────────────┴───────────┐             └─────────────────────────┘
│              INVENTORY                      │                       │
├─────────────────────────────────────────────┤                       │ productId
│ id (PK)                                     │◄──────────────────────┘
│ productId (FK → products)                   │
│ imei (unique)                               │
│ serialNumber (unique)                       │
│ status (enum)                               │
│ purchasePrice                               │
│ purchaseDate                                │
│ supplierId (FK → suppliers)                 │
│ purchaseOrderRef                            │
│ warehouseLocation                           │
│ bin                                         │
│ currentOrderId (FK → orders)                │
│ condition                                   │
│ notes                                       │
│ createdBy (FK → users)                      │
│ createdAt                                   │
│ updatedAt                                   │
└─────────────────────────────────────────────┘
          │                    │
          │                    │
          ↓                    ↓
┌───────────────────────┐  ┌───────────────────────────┐
│ INVENTORY_MOVEMENTS   │  │      ORDER_ITEMS          │
├───────────────────────┤  ├───────────────────────────┤
│ id (PK)               │  │ id (PK)                   │
│ inventoryId (FK)      │  │ orderId (FK → orders)     │
│ fromStatus (enum)     │  │ inventoryId (FK)          │
│ toStatus (enum)       │  │ productId (FK → products) │
│ fromLocation          │  │ quantity                  │
│ toLocation            │  │ unitPrice                 │
│ orderId (FK)          │  │ subtotal                  │
│ reason                │  │ createdAt                 │
│ notes                 │  └───────────────────────────┘
│ performedBy (FK)      │              │
│ performedAt           │              │ orderId
└───────────────────────┘              ↓
                              ┌─────────────────────────┐
                              │        ORDERS           │
                              ├─────────────────────────┤
                              │ id (PK)                 │
                              │ orderNumber (unique)    │
                              │ customerName            │
                              │ customerEmail           │
                              │ customerPhone           │
                              │ shippingAddress (JSON)  │
                              │ subtotal                │
                              │ tax                     │
                              │ shippingCost            │
                              │ total                   │
                              │ currency                │
                              │ status                  │
                              │ shippingProvider        │
                              │ trackingNumber          │
                              │ estimatedDeliveryDate   │
                              │ actualDeliveryDate      │
                              │ customerNotes           │
                              │ internalNotes           │
                              │ createdAt               │
                              │ updatedAt               │
                              └─────────────────────────┘
                                        │
                                        │ orderId
                                        ↓
                              ┌─────────────────────────┐
                              │ LOGISTICS_WEBHOOKS      │
                              ├─────────────────────────┤
                              │ id (PK)                 │
                              │ orderId (FK)            │
                              │ provider                │
                              │ event                   │
                              │ payload (JSON)          │
                              │ processed               │
                              │ processedAt             │
                              │ error                   │
                              │ receivedAt              │
                              └─────────────────────────┘

┌─────────────────────────┐       ┌─────────────────────────┐
│    PRICE_HISTORY        │       │      STOCK_ALERTS       │
├─────────────────────────┤       ├─────────────────────────┤
│ id (PK)                 │       │ id (PK)                 │
│ productId (FK)          │       │ productId (FK)          │
│ priceType (enum)        │       │ minStockLevel           │
│ price                   │       │ currentStock            │
│ currency                │       │ status                  │
│ validFrom               │       │ notifiedAt              │
│ validTo                 │       │ resolvedAt              │
│ minQuantity             │       │ resolvedBy (FK → users) │
│ customerId              │       │ createdAt               │
│ reason                  │       └─────────────────────────┘
│ notes                   │
│ isActive                │
│ createdBy (FK → users)  │
│ createdAt               │
└─────────────────────────┘

┌─────────────────────────────────┐
│          DOCUMENTS              │
├─────────────────────────────────┤
│ id (PK)                         │
│ inventoryId (FK → inventory)    │
│ orderId (FK → orders)           │
│ documentType (enum)             │
│ documentNumber                  │
│ fileUrl                         │
│ fileName                        │
│ fileType                        │
│ issueDate                       │
│ expiryDate                      │
│ notes                           │
│ uploadedBy (FK → users)         │
│ uploadedAt                      │
└─────────────────────────────────┘

┌─────────────────────────┐
│    SYSTEM_CONFIG        │
├─────────────────────────┤
│ id (PK)                 │
│ key (unique)            │
│ value (JSON)            │
│ description             │
│ updatedBy (FK → users)  │
│ updatedAt               │
└─────────────────────────┘
```

## Enumeraciones (ENUMs)

### inventory_status
- `purchased`: Comprado al proveedor
- `in_transit`: En tránsito hacia almacén
- `in_warehouse`: En almacén
- `reserved`: Reservado para orden
- `preparing`: En preparación
- `packed`: Empacado
- `ready_to_ship`: Listo para envío
- `shipped`: Enviado
- `delivered`: Entregado
- `returned`: Devuelto
- `damaged`: Dañado
- `lost`: Perdido

### price_type
- `base`: Precio base
- `promotional`: Precio promocional
- `wholesale`: Precio mayorista
- `special`: Precio especial (cliente específico)

### document_type
- `invoice`: Factura
- `receipt`: Recibo
- `packing_slip`: Guía de empaque
- `shipping_label`: Etiqueta de envío
- `delivery_proof`: Prueba de entrega
- `purchase_order`: Orden de compra
- `other`: Otro

### user_role
- `admin`: Administrador (acceso completo)
- `warehouse_manager`: Gerente de almacén
- `inventory_clerk`: Auxiliar de inventario
- `logistics_coordinator`: Coordinador logístico
- `viewer`: Solo lectura

## Relaciones Clave

### 1. INVENTORY → PRODUCTS (N:1)
Cada item de inventario pertenece a un producto específico

### 2. INVENTORY → SUPPLIERS (N:1)
Cada item fue comprado a un proveedor

### 3. INVENTORY → USERS (N:1)
Cada item fue registrado por un usuario

### 4. INVENTORY_MOVEMENTS → INVENTORY (N:1)
Cada movimiento afecta a un item de inventario

### 5. INVENTORY_MOVEMENTS → USERS (N:1)
Cada movimiento es realizado por un usuario

### 6. INVENTORY_MOVEMENTS → ORDERS (N:1 opcional)
Movimientos pueden estar asociados a órdenes

### 7. ORDERS → ORDER_ITEMS (1:N)
Una orden contiene múltiples items

### 8. ORDER_ITEMS → INVENTORY (N:1)
Cada item de orden está vinculado a un item específico de inventario

### 9. DOCUMENTS → INVENTORY (N:1 opcional)
Documentos pueden estar asociados a items de inventario

### 10. DOCUMENTS → ORDERS (N:1 opcional)
Documentos pueden estar asociados a órdenes

### 11. LOGISTICS_WEBHOOKS → ORDERS (N:1 opcional)
Webhooks recibidos están asociados a órdenes

### 12. PRICE_HISTORY → PRODUCTS (N:1)
Historial de precios por producto

### 13. STOCK_ALERTS → PRODUCTS (N:1)
Alertas de stock por producto

## Índices Recomendados

```sql
-- Inventario
CREATE INDEX idx_inventory_product_id ON inventory(productId);
CREATE INDEX idx_inventory_status ON inventory(status);
CREATE INDEX idx_inventory_imei ON inventory(imei);
CREATE INDEX idx_inventory_serial_number ON inventory(serialNumber);
CREATE INDEX idx_inventory_supplier_id ON inventory(supplierId);
CREATE INDEX idx_inventory_created_at ON inventory(createdAt);

-- Movimientos
CREATE INDEX idx_movements_inventory_id ON inventory_movements(inventoryId);
CREATE INDEX idx_movements_performed_at ON inventory_movements(performedAt);
CREATE INDEX idx_movements_order_id ON inventory_movements(orderId);

-- Órdenes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customerEmail);
CREATE INDEX idx_orders_created_at ON orders(createdAt);
CREATE INDEX idx_orders_order_number ON orders(orderNumber);

-- Items de Orden
CREATE INDEX idx_order_items_order_id ON order_items(orderId);
CREATE INDEX idx_order_items_inventory_id ON order_items(inventoryId);

-- Precios
CREATE INDEX idx_price_history_product_id ON price_history(productId);
CREATE INDEX idx_price_history_valid_from ON price_history(validFrom);
CREATE INDEX idx_price_history_valid_to ON price_history(validTo);
CREATE INDEX idx_price_history_is_active ON price_history(isActive);

-- Documentos
CREATE INDEX idx_documents_inventory_id ON documents(inventoryId);
CREATE INDEX idx_documents_order_id ON documents(orderId);
CREATE INDEX idx_documents_uploaded_at ON documents(uploadedAt);

-- Webhooks
CREATE INDEX idx_webhooks_order_id ON logistics_webhooks(orderId);
CREATE INDEX idx_webhooks_processed ON logistics_webhooks(processed);
CREATE INDEX idx_webhooks_received_at ON logistics_webhooks(receivedAt);
```

## Consideraciones de Diseño

### 1. Trazabilidad Completa
- Cada cambio de estado se registra en `inventory_movements`
- Se mantiene timestamp y usuario que realizó cada acción
- Se puede reconstruir toda la historia de un item

### 2. Flexibilidad de Precios
- Sistema de historial de precios con vigencia
- Soporte para múltiples tipos de precio
- Precios especiales por cliente o cantidad

### 3. Documentación Completa
- Todos los documentos vinculados a inventario u órdenes
- Referencias cruzadas para auditoría

### 4. Preparado para Integración Logística
- Tabla de webhooks para recibir actualizaciones
- Campos de tracking en órdenes
- Payload JSON flexible para diferentes proveedores

### 5. Seguridad y Auditoría
- Todos los cambios importantes registran usuario
- Sistema de roles granular
- Timestamps en todas las tablas

### 6. Escalabilidad
- Uso de UUIDs para IDs
- Índices optimizados para consultas frecuentes
- JSON para datos semi-estructurados (direcciones, especificaciones)

## Datos de Ejemplo

### Usuario Admin Inicial
```sql
INSERT INTO users (email, passwordHash, firstName, lastName, role)
VALUES (
  'admin@celuvendo.com',
  '$2a$10$...',  -- hash de 'admin123'
  'Admin',
  'Sistema',
  'admin'
);
```

### Configuración del Sistema
```sql
INSERT INTO system_config (key, value, description)
VALUES
  ('low_stock_threshold', '10', 'Nivel de stock bajo para alertas'),
  ('default_currency', '"COP"', 'Moneda por defecto'),
  ('warehouse_locations', '["A", "B", "C"]', 'Zonas del almacén');
```
