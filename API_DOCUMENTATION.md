# API Documentation - Sistema de Gestión de Inventario y Trazabilidad Logística

## Base URL
```
http://localhost:5000/api/v1
```

## Autenticación

Todas las rutas (excepto login y webhooks públicos) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

---

## 1. AUTENTICACIÓN

### 1.1 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@celuvendo.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@celuvendo.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin",
    "isActive": true
  }
}
```

### 1.2 Registro de Usuario (Solo Admin)
```http
POST /auth/register
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "warehouse@celuvendo.com",
  "passwordHash": "password123",
  "firstName": "Warehouse",
  "lastName": "Manager",
  "role": "warehouse_manager"
}
```

**Roles disponibles:**
- `admin`: Acceso completo
- `warehouse_manager`: Gestión de almacén y precios
- `inventory_clerk`: Gestión de inventario
- `logistics_coordinator`: Coordinación logística
- `viewer`: Solo lectura

### 1.3 Obtener Perfil Actual
```http
GET /auth/me
Authorization: Bearer <token>
```

---

## 2. INVENTARIO

### 2.1 Crear Entrada de Inventario
```http
POST /inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "imei": "123456789012345",
  "serialNumber": "SN-12345",
  "status": "purchased",
  "purchasePrice": "800000",
  "purchaseDate": "2025-11-19T10:00:00Z",
  "supplierId": "supplier-uuid",
  "purchaseOrderRef": "PO-2025-001",
  "warehouseLocation": "A-12-3",
  "condition": "new"
}
```

**Estados de inventario:**
- `purchased`: Comprado
- `in_transit`: En tránsito
- `in_warehouse`: En almacén
- `reserved`: Reservado
- `preparing`: En preparación
- `packed`: Empacado
- `ready_to_ship`: Listo para envío
- `shipped`: Enviado
- `delivered`: Entregado
- `returned`: Devuelto
- `damaged`: Dañado
- `lost`: Perdido

### 2.2 Listar Inventario
```http
GET /inventory?status=in_warehouse&productId=uuid&limit=50&offset=0
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filtrar por estado
- `productId`: Filtrar por producto
- `imei`: Buscar por IMEI
- `serialNumber`: Buscar por número de serie
- `condition`: Filtrar por condición (new, refurbished, damaged)
- `limit`: Límite de resultados (default: 100)
- `offset`: Offset para paginación (default: 0)

### 2.3 Obtener Item por ID
```http
GET /inventory/:id
Authorization: Bearer <token>
```

### 2.4 Actualizar Item
```http
PUT /inventory/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "warehouseLocation": "B-15-7",
  "condition": "refurbished",
  "notes": "Equipo reparado y verificado"
}
```

### 2.5 Cambiar Estado (Movimiento)
```http
POST /inventory/:id/move
Authorization: Bearer <token>
Content-Type: application/json

{
  "toStatus": "preparing",
  "toLocation": "PREP-01",
  "orderId": "order-uuid",
  "reason": "Order preparation",
  "notes": "Moving to preparation area"
}
```

**Response:**
```json
{
  "inventory": { ... },
  "movement": {
    "id": "uuid",
    "fromStatus": "in_warehouse",
    "toStatus": "preparing",
    "fromLocation": "A-12-3",
    "toLocation": "PREP-01",
    "performedBy": "user-uuid",
    "performedAt": "2025-11-19T15:30:00Z"
  }
}
```

### 2.6 Historial de Movimientos
```http
GET /inventory/:id/movements
Authorization: Bearer <token>
```

### 2.7 Reporte de Stock por Producto
```http
GET /inventory/reports/stock-by-product
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "productId": "uuid",
    "status": "in_warehouse",
    "count": 45
  },
  {
    "productId": "uuid",
    "status": "reserved",
    "count": 12
  }
]
```

---

## 3. GESTIÓN DE PRECIOS

### 3.1 Crear Precio
```http
POST /prices
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "priceType": "promotional",
  "price": "950000",
  "currency": "COP",
  "validFrom": "2025-11-20T00:00:00Z",
  "validTo": "2025-12-31T23:59:59Z",
  "minQuantity": 1,
  "reason": "Black Friday promotion"
}
```

**Tipos de precio:**
- `base`: Precio base
- `promotional`: Promocional
- `wholesale`: Mayorista
- `special`: Especial (cliente específico)

### 3.2 Obtener Precio Actual
```http
GET /prices/current/:productId?priceType=base
```

### 3.3 Historial de Precios
```http
GET /prices/history/:productId
Authorization: Bearer <token>
```

### 3.4 Desactivar Precio
```http
PATCH /prices/:id/deactivate
Authorization: Bearer <token>
```

---

## 4. PROVEEDORES

### 4.1 Crear Proveedor
```http
POST /suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Tech Distributors S.A.S",
  "legalName": "Tech Distributors Colombia S.A.S",
  "taxId": "900123456-7",
  "contactName": "Juan Pérez",
  "email": "ventas@techdist.com",
  "phone": "+57 300 1234567",
  "address": {
    "street": "Calle 100 # 10-20",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "zipCode": "110111",
    "country": "Colombia"
  },
  "paymentTerms": "30 días",
  "currency": "COP"
}
```

### 4.2 Listar Proveedores
```http
GET /suppliers?isActive=true
Authorization: Bearer <token>
```

### 4.3 Obtener Proveedor
```http
GET /suppliers/:id
Authorization: Bearer <token>
```

### 4.4 Actualizar Proveedor
```http
PUT /suppliers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "+57 300 9876543",
  "notes": "Nuevo contacto comercial"
}
```

---

## 5. ÓRDENES

### 5.1 Crear Orden
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderNumber": "ORD-2025-001",
  "customerName": "María García",
  "customerEmail": "maria@example.com",
  "customerPhone": "+57 310 1234567",
  "shippingAddress": {
    "street": "Carrera 15 # 85-30 Apto 501",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "zipCode": "110221",
    "country": "Colombia",
    "additionalInfo": "Torre B, Portería principal"
  },
  "subtotal": "1200000",
  "tax": "228000",
  "shippingCost": "15000",
  "total": "1443000",
  "currency": "COP",
  "customerNotes": "Entregar entre 9am-5pm",
  "items": [
    {
      "inventoryId": "inventory-uuid-1",
      "productId": "product-uuid-1",
      "quantity": 1,
      "unitPrice": "1200000",
      "subtotal": "1200000"
    }
  ]
}
```

**Efectos:**
- Crea la orden
- Crea los items de orden
- Reserva el inventario (cambia status a `reserved`)
- Registra movimientos de inventario

### 5.2 Listar Órdenes
```http
GET /orders?status=pending&limit=50&offset=0
Authorization: Bearer <token>
```

**Estados de orden:**
- `pending`: Pendiente
- `confirmed`: Confirmada
- `preparing`: En preparación
- `shipped`: Enviada
- `delivered`: Entregada
- `cancelled`: Cancelada

### 5.3 Obtener Orden
```http
GET /orders/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "orderNumber": "ORD-2025-001",
  "customerName": "María García",
  ...
  "items": [
    {
      "id": "uuid",
      "inventoryId": "uuid",
      "productId": "uuid",
      "quantity": 1,
      "unitPrice": "1200000"
    }
  ]
}
```

### 5.4 Actualizar Estado de Orden
```http
PATCH /orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRK-123456789",
  "estimatedDeliveryDate": "2025-11-25T17:00:00Z"
}
```

---

## 6. DOCUMENTOS

### 6.1 Subir Documento
```http
POST /documents
Authorization: Bearer <token>
Content-Type: application/json

{
  "inventoryId": "uuid",
  "documentType": "invoice",
  "documentNumber": "FAC-2025-12345",
  "fileUrl": "https://storage.example.com/invoices/12345.pdf",
  "fileName": "factura_12345.pdf",
  "fileType": "pdf",
  "issueDate": "2025-11-19T00:00:00Z",
  "notes": "Factura de compra al proveedor"
}
```

**Tipos de documento:**
- `invoice`: Factura
- `receipt`: Recibo
- `packing_slip`: Guía de empaque
- `shipping_label`: Etiqueta de envío
- `delivery_proof`: Prueba de entrega
- `purchase_order`: Orden de compra
- `other`: Otro

### 6.2 Documentos de Inventario
```http
GET /documents/inventory/:inventoryId
Authorization: Bearer <token>
```

### 6.3 Documentos de Orden
```http
GET /documents/order/:orderId
Authorization: Bearer <token>
```

---

## 7. ALERTAS DE STOCK

### 7.1 Crear Alerta
```http
POST /stock-alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "minStockLevel": 10
}
```

**Response:**
```json
{
  "id": "uuid",
  "productId": "uuid",
  "minStockLevel": 10,
  "currentStock": 5,
  "status": "active",
  "createdAt": "2025-11-19T15:00:00Z"
}
```

### 7.2 Listar Alertas Activas
```http
GET /stock-alerts
Authorization: Bearer <token>
```

---

## 8. INTEGRACIÓN LOGÍSTICA

### 8.1 Webhook de Operador Logístico (Público)
```http
POST /webhooks/logistics
Content-Type: application/json

{
  "provider": "OperadorXYZ",
  "event": "shipped",
  "orderId": "order-uuid",
  "trackingNumber": "TRK-123456",
  "timestamp": "2025-11-19T14:30:00Z",
  "additionalData": {
    "estimatedDelivery": "2025-11-25",
    "carrier": "Servientrega"
  }
}
```

**Eventos comunes:**
- `shipped`: Enviado
- `in_transit`: En tránsito
- `out_for_delivery`: En reparto
- `delivered`: Entregado
- `failed_delivery`: Intento fallido
- `returned`: Devuelto

**Response:**
```json
{
  "received": true,
  "webhookId": "uuid"
}
```

### 8.2 Listar Webhooks Recibidos
```http
GET /webhooks/logistics?processed=false&limit=100
Authorization: Bearer <token>
```

---

## 9. FLUJO COMPLETO DE TRAZABILIDAD

### Ejemplo: Desde Compra hasta Entrega

#### 1. Crear entrada de inventario (Comprado)
```http
POST /inventory
{
  "productId": "iphone-15-pro",
  "imei": "123456789012345",
  "status": "purchased",
  "purchasePrice": "4500000",
  "purchaseDate": "2025-11-01T10:00:00Z",
  "supplierId": "supplier-001"
}
```

#### 2. Mover a almacén
```http
POST /inventory/{id}/move
{
  "toStatus": "in_warehouse",
  "toLocation": "A-12-5",
  "reason": "Arrived at warehouse"
}
```

#### 3. Cliente hace pedido → Crear orden (automáticamente reserva)
```http
POST /orders
{
  "orderNumber": "ORD-2025-100",
  "customerName": "Carlos Díaz",
  ...
  "items": [{
    "inventoryId": "{inventory-id}",
    "productId": "iphone-15-pro",
    "quantity": 1,
    "unitPrice": "5200000",
    "subtotal": "5200000"
  }]
}
```

#### 4. Preparar pedido
```http
POST /inventory/{id}/move
{
  "toStatus": "preparing",
  "toLocation": "PREP-02",
  "orderId": "{order-id}",
  "reason": "Order preparation"
}
```

#### 5. Empacar
```http
POST /inventory/{id}/move
{
  "toStatus": "packed",
  "orderId": "{order-id}",
  "reason": "Packed for shipping"
}
```

#### 6. Listo para envío
```http
POST /inventory/{id}/move
{
  "toStatus": "ready_to_ship",
  "orderId": "{order-id}",
  "reason": "Ready for pickup"
}
```

#### 7. Entregar a operador logístico
```http
POST /inventory/{id}/move
{
  "toStatus": "shipped",
  "orderId": "{order-id}",
  "reason": "Shipped with LogiCorp"
}

PATCH /orders/{order-id}/status
{
  "status": "shipped",
  "trackingNumber": "TRK-987654321"
}
```

#### 8. Operador envía webhook (automático)
```http
POST /webhooks/logistics
{
  "provider": "LogiCorp",
  "event": "delivered",
  "orderId": "{order-id}",
  "trackingNumber": "TRK-987654321"
}
```

#### 9. Actualizar estado final
```http
POST /inventory/{id}/move
{
  "toStatus": "delivered",
  "orderId": "{order-id}",
  "reason": "Successfully delivered"
}

PATCH /orders/{order-id}/status
{
  "status": "delivered",
  "actualDeliveryDate": "2025-11-25T15:30:00Z"
}
```

---

## 10. VALIDACIONES Y ERRORES

### Códigos de Estado HTTP
- `200`: Éxito
- `201`: Recurso creado
- `400`: Error de validación
- `401`: No autenticado
- `403`: No autorizado (permisos insuficientes)
- `404`: No encontrado
- `500`: Error del servidor

### Formato de Error
```json
{
  "error": "Descripción del error"
}
```

### Errores de Validación (Zod)
```json
{
  "error": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

---

## 11. CONSIDERACIONES PARA INTEGRACIÓN CON OPERADOR LOGÍSTICO

### Preparación para Integración Futura

**1. Datos que enviarías al operador:**
```json
{
  "order_id": "ORD-2025-001",
  "customer": {
    "name": "María García",
    "phone": "+57 310 1234567",
    "email": "maria@example.com"
  },
  "shipping_address": {
    "street": "Carrera 15 # 85-30 Apto 501",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "zipCode": "110221",
    "country": "CO"
  },
  "package": {
    "weight": 0.5,
    "dimensions": {
      "length": 20,
      "width": 15,
      "height": 5
    },
    "declared_value": 1443000,
    "currency": "COP"
  },
  "items": [
    {
      "sku": "IPH15PRO-256-BLU",
      "name": "iPhone 15 Pro 256GB Blue",
      "quantity": 1,
      "imei": "123456789012345"
    }
  ]
}
```

**2. Webhook esperado del operador:**
```json
{
  "provider": "OperadorXYZ",
  "event": "status_update",
  "order_id": "ORD-2025-001",
  "tracking_number": "TRK-123456",
  "status": "in_transit",
  "timestamp": "2025-11-20T10:00:00Z",
  "location": {
    "city": "Cali",
    "description": "En tránsito hacia Bogotá"
  },
  "estimated_delivery": "2025-11-25T17:00:00Z"
}
```

---

## 12. EJEMPLOS DE USO CON CURL

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@celuvendo.com",
    "password": "admin123"
  }'
```

### Crear Inventario
```bash
curl -X POST http://localhost:5000/api/v1/inventory \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod-123",
    "imei": "123456789012345",
    "status": "purchased",
    "purchasePrice": "800000",
    "purchaseDate": "2025-11-19T10:00:00Z",
    "condition": "new"
  }'
```

### Listar Inventario
```bash
curl -X GET "http://localhost:5000/api/v1/inventory?status=in_warehouse&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Mover Item
```bash
curl -X POST http://localhost:5000/api/v1/inventory/ITEM_ID/move \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "toStatus": "preparing",
    "toLocation": "PREP-01",
    "reason": "Order preparation"
  }'
```

---

## 13. VARIABLES DE ENTORNO

Archivo `.env`:
```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/celuvendo_inventory

# JWT
JWT_SECRET=your-super-secret-key-change-in-production

# Session
SESSION_SECRET=another-secret-key-for-sessions

# Servidor
PORT=5000
NODE_ENV=development

# Instant DB (para frontend)
VITE_INSTANT_APP_ID=your-instant-app-id
```

---

## 14. ROADMAP DE INTEGRACIÓN

### Fase 1 - Actual ✅
- ✅ Gestión de inventario completa
- ✅ Trazabilidad interna
- ✅ Gestión de precios
- ✅ Órdenes básicas
- ✅ Sistema de autenticación y roles

### Fase 2 - Próxima
- [ ] Integración con operador logístico específico
- [ ] Notificaciones automáticas por email/WhatsApp
- [ ] Dashboard de métricas
- [ ] Exportación de reportes (Excel, PDF)

### Fase 3 - Futura
- [ ] Múltiples almacenes
- [ ] Integración con n8n para workflows
- [ ] API pública para integraciones externas
- [ ] App móvil para escaneo de códigos de barras/IMEI
