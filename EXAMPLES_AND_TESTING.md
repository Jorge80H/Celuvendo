# Ejemplos de Uso y Testing - Sistema de Inventario

## 1. SETUP INICIAL

### Crear Usuario Admin
```bash
# 1. Primero crear usuario admin directamente en la base de datos
# O usar script de seed que crearemos

npm run seed:admin
```

### Script de Seed Admin (`scripts/seed-admin.ts`)
```typescript
import { db } from "../server/db";
import { users } from "../shared/inventory-schema";
import { hashPassword } from "../server/auth";

async function seedAdmin() {
  const passwordHash = await hashPassword("admin123");

  await db.insert(users).values({
    email: "admin@celuvendo.com",
    passwordHash,
    firstName: "Admin",
    lastName: "Sistema",
    role: "admin",
    isActive: true,
  });

  console.log("Admin user created successfully");
  console.log("Email: admin@celuvendo.com");
  console.log("Password: admin123");
}

seedAdmin();
```

## 2. FLUJOS DE TRABAJO COMPLETOS

### Flujo 1: Recepción de Mercancía

```bash
# 1. Login como admin
TOKEN=$(curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@celuvendo.com",
    "password": "admin123"
  }' | jq -r '.token')

# 2. Crear proveedor
SUPPLIER_ID=$(curl -X POST http://localhost:5000/api/v1/suppliers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Distributors",
    "email": "ventas@techdist.com",
    "phone": "+57 300 1234567",
    "paymentTerms": "30 días"
  }' | jq -r '.id')

# 3. Registrar entrada de inventario (10 iPhones)
for i in {1..10}; do
  IMEI="35123456789012$i"

  INVENTORY_ID=$(curl -X POST http://localhost:5000/api/v1/inventory \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"productId\": \"iphone-15-pro-256\",
      \"imei\": \"$IMEI\",
      \"serialNumber\": \"SN-2025-$i\",
      \"status\": \"purchased\",
      \"purchasePrice\": \"4500000\",
      \"purchaseDate\": \"2025-11-19T10:00:00Z\",
      \"supplierId\": \"$SUPPLIER_ID\",
      \"purchaseOrderRef\": \"PO-2025-001\",
      \"condition\": \"new\"
    }" | jq -r '.id')

  # 4. Mover a almacén
  curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"toStatus\": \"in_warehouse\",
      \"toLocation\": \"A-12-$i\",
      \"reason\": \"Arrived at warehouse\"
    }"

  echo "Registered inventory item $i"
done

# 5. Verificar stock
curl -X GET "http://localhost:5000/api/v1/inventory?status=in_warehouse" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Flujo 2: Procesamiento de Orden Completa

```bash
# 1. Obtener token
TOKEN=$(curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@celuvendo.com",
    "password": "admin123"
  }' | jq -r '.token')

# 2. Buscar inventario disponible
INVENTORY_ITEM=$(curl -X GET "http://localhost:5000/api/v1/inventory?status=in_warehouse&limit=1" \
  -H "Authorization: Bearer $TOKEN" | jq '.[0]')

INVENTORY_ID=$(echo $INVENTORY_ITEM | jq -r '.id')
PRODUCT_ID=$(echo $INVENTORY_ITEM | jq -r '.productId')

# 3. Crear precio promocional
curl -X POST http://localhost:5000/api/v1/prices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"productId\": \"$PRODUCT_ID\",
    \"priceType\": \"promotional\",
    \"price\": \"5200000\",
    \"currency\": \"COP\",
    \"validFrom\": \"2025-11-19T00:00:00Z\",
    \"validTo\": \"2025-12-31T23:59:59Z\",
    \"reason\": \"Black Friday\"
  }"

# 4. Crear orden
ORDER_ID=$(curl -X POST http://localhost:5000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderNumber\": \"ORD-2025-$(date +%s)\",
    \"customerName\": \"María García\",
    \"customerEmail\": \"maria@example.com\",
    \"customerPhone\": \"+57 310 1234567\",
    \"shippingAddress\": {
      \"street\": \"Carrera 15 # 85-30 Apto 501\",
      \"city\": \"Bogotá\",
      \"state\": \"Cundinamarca\",
      \"zipCode\": \"110221\",
      \"country\": \"Colombia\"
    },
    \"subtotal\": \"5200000\",
    \"tax\": \"988000\",
    \"shippingCost\": \"15000\",
    \"total\": \"6203000\",
    \"currency\": \"COP\",
    \"items\": [
      {
        \"inventoryId\": \"$INVENTORY_ID\",
        \"productId\": \"$PRODUCT_ID\",
        \"quantity\": 1,
        \"unitPrice\": \"5200000\",
        \"subtotal\": \"5200000\"
      }
    ]
  }" | jq -r '.order.id')

echo "Order created: $ORDER_ID"

# 5. Preparar pedido
curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"toStatus\": \"preparing\",
    \"toLocation\": \"PREP-01\",
    \"orderId\": \"$ORDER_ID\",
    \"reason\": \"Order preparation started\"
  }"

# 6. Empacar
curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"toStatus\": \"packed\",
    \"orderId\": \"$ORDER_ID\",
    \"reason\": \"Item packed for shipping\"
  }"

# 7. Listo para envío
curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"toStatus\": \"ready_to_ship\",
    \"orderId\": \"$ORDER_ID\",
    \"reason\": \"Ready for carrier pickup\"
  }"

# 8. Actualizar orden a confirmada
curl -X PATCH http://localhost:5000/api/v1/orders/$ORDER_ID/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'

# 9. Entregar a operador logístico
curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"toStatus\": \"shipped\",
    \"orderId\": \"$ORDER_ID\",
    \"reason\": \"Handed to LogiCorp\"
  }"

# 10. Actualizar orden con tracking
curl -X PATCH http://localhost:5000/api/v1/orders/$ORDER_ID/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"status\": \"shipped\",
    \"trackingNumber\": \"TRK-$(date +%s)\",
    \"estimatedDeliveryDate\": \"2025-11-25T17:00:00Z\"
  }"

# 11. Ver historial completo del item
curl -X GET http://localhost:5000/api/v1/inventory/$INVENTORY_ID/movements \
  -H "Authorization: Bearer $TOKEN" | jq

# 12. Simular webhook del operador logístico (entrega exitosa)
curl -X POST http://localhost:5000/api/v1/webhooks/logistics \
  -H "Content-Type: application/json" \
  -d "{
    \"provider\": \"LogiCorp\",
    \"event\": \"delivered\",
    \"orderId\": \"$ORDER_ID\",
    \"trackingNumber\": \"TRK-123456\",
    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"location\": {
      \"city\": \"Bogotá\",
      \"description\": \"Entregado exitosamente\"
    }
  }"

# 13. Actualizar estado final
curl -X POST http://localhost:5000/api/v1/inventory/$INVENTORY_ID/move \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"toStatus\": \"delivered\",
    \"orderId\": \"$ORDER_ID\",
    \"reason\": \"Successfully delivered to customer\"
  }"

curl -X PATCH http://localhost:5000/api/v1/orders/$ORDER_ID/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"status\": \"delivered\",
    \"actualDeliveryDate\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
  }"

echo "Order completed successfully!"
```

### Flujo 3: Gestión de Alertas de Stock

```bash
TOKEN=$(curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@celuvendo.com",
    "password": "admin123"
  }' | jq -r '.token')

# 1. Ver reporte de stock por producto
curl -X GET http://localhost:5000/api/v1/inventory/reports/stock-by-product \
  -H "Authorization: Bearer $TOKEN" | jq

# 2. Crear alerta de stock bajo
curl -X POST http://localhost:5000/api/v1/stock-alerts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "iphone-15-pro-256",
    "minStockLevel": 10
  }'

# 3. Ver alertas activas
curl -X GET http://localhost:5000/api/v1/stock-alerts \
  -H "Authorization: Bearer $TOKEN" | jq
```

## 3. TESTING POSTMAN COLLECTION

### Archivo: `postman_collection.json`

```json
{
  "info": {
    "name": "Celuvendo Inventory API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{token}}",
        "type": "string"
      }
    ]
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.test('Login successful', function () {",
                  "    pm.response.to.have.status(200);",
                  "    var jsonData = pm.response.json();",
                  "    pm.environment.set('token', jsonData.token);",
                  "    pm.environment.set('userId', jsonData.user.id);",
                  "});"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@celuvendo.com\",\n  \"password\": \"admin123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Inventory",
      "item": [
        {
          "name": "Create Inventory Item",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.test('Inventory created', function () {",
                  "    pm.response.to.have.status(201);",
                  "    var jsonData = pm.response.json();",
                  "    pm.environment.set('inventoryId', jsonData.id);",
                  "});"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"productId\": \"{{productId}}\",\n  \"imei\": \"123456789012345\",\n  \"serialNumber\": \"SN-TEST-001\",\n  \"status\": \"purchased\",\n  \"purchasePrice\": \"800000\",\n  \"purchaseDate\": \"2025-11-19T10:00:00Z\",\n  \"condition\": \"new\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/inventory",
              "host": ["{{baseUrl}}"],
              "path": ["inventory"]
            }
          }
        },
        {
          "name": "List Inventory",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/inventory?status=in_warehouse",
              "host": ["{{baseUrl}}"],
              "path": ["inventory"],
              "query": [
                {
                  "key": "status",
                  "value": "in_warehouse"
                }
              ]
            }
          }
        },
        {
          "name": "Move Inventory",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"toStatus\": \"in_warehouse\",\n  \"toLocation\": \"A-12-5\",\n  \"reason\": \"Arrived at warehouse\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/inventory/{{inventoryId}}/move",
              "host": ["{{baseUrl}}"],
              "path": ["inventory", "{{inventoryId}}", "move"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api/v1"
    }
  ]
}
```

## 4. TESTS UNITARIOS CON JEST

### Archivo: `tests/inventory.test.ts`

```typescript
import request from 'supertest';
import { app } from '../server/index';

let token: string;
let inventoryId: string;

describe('Inventory API', () => {
  beforeAll(async () => {
    // Login
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@celuvendo.com',
        password: 'admin123'
      });

    token = response.body.token;
  });

  describe('POST /inventory', () => {
    it('should create inventory item', async () => {
      const response = await request(app)
        .post('/api/v1/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: 'test-product',
          imei: '123456789012345',
          serialNumber: 'SN-TEST-001',
          status: 'purchased',
          purchasePrice: '800000',
          purchaseDate: '2025-11-19T10:00:00Z',
          condition: 'new'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      inventoryId = response.body.id;
    });

    it('should reject duplicate IMEI', async () => {
      const response = await request(app)
        .post('/api/v1/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: 'test-product',
          imei: '123456789012345', // Same IMEI
          serialNumber: 'SN-TEST-002',
          status: 'purchased',
          purchasePrice: '800000',
          purchaseDate: '2025-11-19T10:00:00Z',
          condition: 'new'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /inventory/:id/move', () => {
    it('should move inventory to new status', async () => {
      const response = await request(app)
        .post(`/api/v1/inventory/${inventoryId}/move`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          toStatus: 'in_warehouse',
          toLocation: 'A-12-5',
          reason: 'Test movement'
        });

      expect(response.status).toBe(200);
      expect(response.body.inventory.status).toBe('in_warehouse');
      expect(response.body.movement).toBeDefined();
    });
  });

  describe('GET /inventory/:id/movements', () => {
    it('should get movement history', async () => {
      const response = await request(app)
        .get(`/api/v1/inventory/${inventoryId}/movements`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
```

## 5. SCRIPTS DE UTILIDAD

### Script de Seed Completo (`scripts/seed-complete.ts`)

```typescript
import { db } from "../server/db";
import {
  users,
  suppliers,
  inventory,
  priceHistory,
  systemConfig
} from "../shared/inventory-schema";
import { hashPassword } from "../server/auth";

async function seedComplete() {
  console.log("Seeding database...");

  // 1. Usuarios
  const password = await hashPassword("admin123");
  const [admin] = await db.insert(users).values([
    {
      email: "admin@celuvendo.com",
      passwordHash: password,
      firstName: "Admin",
      lastName: "Sistema",
      role: "admin"
    },
    {
      email: "warehouse@celuvendo.com",
      passwordHash: password,
      firstName: "Warehouse",
      lastName: "Manager",
      role: "warehouse_manager"
    }
  ]).returning();

  console.log("✅ Users created");

  // 2. Proveedores
  const [supplier] = await db.insert(suppliers).values({
    name: "Tech Distributors",
    email: "ventas@techdist.com",
    phone: "+57 300 1234567",
    paymentTerms: "30 días"
  }).returning();

  console.log("✅ Suppliers created");

  // 3. Inventario de ejemplo
  const inventoryItems = [];
  for (let i = 1; i <= 20; i++) {
    inventoryItems.push({
      productId: "iphone-15-pro-256",
      imei: `35123456789012${i.toString().padStart(2, '0')}`,
      serialNumber: `SN-2025-${i.toString().padStart(3, '0')}`,
      status: "in_warehouse" as const,
      purchasePrice: "4500000",
      purchaseDate: new Date("2025-11-01"),
      supplierId: supplier.id,
      warehouseLocation: `A-${Math.floor(i / 5) + 1}-${i % 5}`,
      condition: "new",
      createdBy: admin.id
    });
  }

  await db.insert(inventory).values(inventoryItems);
  console.log("✅ Inventory created");

  // 4. Precios
  await db.insert(priceHistory).values({
    productId: "iphone-15-pro-256",
    priceType: "base",
    price: "5500000",
    currency: "COP",
    validFrom: new Date("2025-11-01"),
    isActive: true,
    createdBy: admin.id
  });

  console.log("✅ Prices created");

  // 5. Configuración del sistema
  await db.insert(systemConfig).values([
    {
      key: "low_stock_threshold",
      value: 10,
      description: "Nivel mínimo de stock para alertas"
    },
    {
      key: "default_currency",
      value: "COP",
      description: "Moneda por defecto"
    }
  ]);

  console.log("✅ System config created");
  console.log("\n🎉 Database seeded successfully!");
  console.log("\nLogin credentials:");
  console.log("Email: admin@celuvendo.com");
  console.log("Password: admin123");
}

seedComplete().catch(console.error);
```

## 6. MONITOREO Y DEBUGGING

### Script de Diagnóstico (`scripts/diagnostics.ts`)

```typescript
import { db } from "../server/db";
import { inventory, inventoryMovements, orders } from "../shared/inventory-schema";
import { sql } from "drizzle-orm";

async function runDiagnostics() {
  console.log("=== INVENTORY DIAGNOSTICS ===\n");

  // Stock por estado
  const stockByStatus = await db
    .select({
      status: inventory.status,
      count: sql<number>`count(*)::int`
    })
    .from(inventory)
    .groupBy(inventory.status);

  console.log("Stock by Status:");
  console.table(stockByStatus);

  // Movimientos del último día
  const recentMovements = await db
    .select({
      count: sql<number>`count(*)::int`,
      status: inventoryMovements.toStatus
    })
    .from(inventoryMovements)
    .where(sql`performed_at >= NOW() - INTERVAL '1 day'`)
    .groupBy(inventoryMovements.toStatus);

  console.log("\nMovements (last 24h):");
  console.table(recentMovements);

  // Órdenes por estado
  const ordersByStatus = await db
    .select({
      status: orders.status,
      count: sql<number>`count(*)::int`
    })
    .from(orders)
    .groupBy(orders.status);

  console.log("\nOrders by Status:");
  console.table(ordersByStatus);
}

runDiagnostics();
```

## 7. INTEGRACIÓN CON N8N

### Webhook de n8n para Notificaciones de Stock Bajo

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "stock-alert",
        "responseMode": "onReceived"
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "to": "warehouse@celuvendo.com",
        "subject": "⚠️ Stock Alert: {{$json.productName}}",
        "text": "Stock bajo detectado:\n\nProducto: {{$json.productName}}\nStock actual: {{$json.currentStock}}\nNivel mínimo: {{$json.minStockLevel}}"
      }
    }
  ]
}
```

### Llamar desde el backend:
```typescript
// En inventory-routes.ts, después de crear alerta
if (currentStock <= minStockLevel) {
  // Llamar webhook de n8n
  await fetch('https://n8n.example.com/webhook/stock-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
      productName: "iPhone 15 Pro",
      currentStock,
      minStockLevel
    })
  });
}
```
