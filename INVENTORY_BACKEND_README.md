# Sistema de Gestión de Inventario y Trazabilidad Logística - Backend

## 📋 Descripción

Sistema backend robusto para gestión completa de inventario de equipos celulares, con trazabilidad completa desde la compra hasta la entrega, gestión de precios dinámicos y preparación para integración con operadores logísticos.

## 🎯 Características Principales

### ✅ Gestión de Inventario
- Registro de entrada de mercancía con IMEI y número de serie
- Control de stock en tiempo real
- Historial completo de movimientos
- Alertas de bajo stock
- Múltiples condiciones (nuevo, reacondicionado, dañado)

### ✅ Trazabilidad Completa
- 12 estados de seguimiento: `purchased` → `in_transit` → `in_warehouse` → `reserved` → `preparing` → `packed` → `ready_to_ship` → `shipped` → `delivered` / `returned` / `damaged` / `lost`
- Registro de cada transición con timestamp y usuario
- Historial completo auditable

### ✅ Gestión de Precios
- Múltiples tipos de precio (base, promocional, mayorista, especial)
- Historial de cambios con vigencia temporal
- Precios por cantidad y cliente específico

### ✅ Órdenes y Logística
- Creación y seguimiento de órdenes
- Reserva automática de inventario
- Información de tracking y operador logístico
- Webhooks para recibir actualizaciones de operadores

### ✅ Seguridad y Autenticación
- JWT para autenticación
- 5 roles de usuario con permisos granulares
- Todas las acciones registran usuario y timestamp

### ✅ Documentación
- Sistema de adjuntos (facturas, guías, comprobantes)
- Vinculación a inventario u órdenes
- Metadata completa

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────┐
│                  REST API                       │
│            (Express + TypeScript)               │
├─────────────────────────────────────────────────┤
│           Autenticación JWT                     │
│         (bcrypt + jsonwebtoken)                 │
├─────────────────────────────────────────────────┤
│            Validaciones Zod                     │
├─────────────────────────────────────────────────┤
│         Drizzle ORM + PostgreSQL                │
└─────────────────────────────────────────────────┘
```

## 📦 Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **ORM**: Drizzle ORM
- **Base de datos**: PostgreSQL
- **Validación**: Zod
- **Autenticación**: JWT + bcryptjs
- **Documentación**: Markdown (listo para Swagger)

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Paso 1: Instalar Dependencias
```bash
cd CeluvendoEcom
npm install
```

### Paso 2: Configurar Variables de Entorno

Crear archivo `.env`:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/celuvendo_inventory

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Session
SESSION_SECRET=your-session-secret-key-change-in-production

# Server
PORT=5000
NODE_ENV=development

# Instant DB (para frontend)
VITE_INSTANT_APP_ID=your-instant-app-id
```

### Paso 3: Crear Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb celuvendo_inventory

# O usando psql
psql -U postgres
CREATE DATABASE celuvendo_inventory;
```

### Paso 4: Ejecutar Migraciones
```bash
# Generar migraciones
npm run db:generate

# Ejecutar migraciones
npm run db:push
```

### Paso 5: Seed de Datos Iniciales (Opcional)
```bash
# Crear usuario admin y datos de ejemplo
npm run seed:complete
```

Credenciales por defecto:
- **Email**: admin@celuvendo.com
- **Password**: admin123

### Paso 6: Iniciar Servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 📚 Documentación

### Archivos de Documentación Incluidos

1. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Documentación completa de endpoints
2. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Diagrama ERD y estructura de base de datos
3. **[EXAMPLES_AND_TESTING.md](./EXAMPLES_AND_TESTING.md)** - Ejemplos de uso y scripts de testing

### Estructura de Archivos

```
CeluvendoEcom/
├── shared/
│   ├── schema.ts                    # Schemas originales (productos, carrito)
│   └── inventory-schema.ts          # Schemas de inventario (NUEVO)
├── server/
│   ├── index.ts                     # Servidor principal
│   ├── routes.ts                    # Rutas existentes + registro de inventory routes
│   ├── auth.ts                      # Autenticación JWT (NUEVO)
│   ├── inventory-routes.ts          # Rutas de inventario (NUEVO)
│   ├── db.ts                        # Configuración de base de datos
│   └── storage.ts                   # Storage de InstantDB
├── scripts/
│   └── seed-complete.ts             # Script de seed (NUEVO)
├── API_DOCUMENTATION.md             # Docs del API (NUEVO)
├── DATABASE_SCHEMA.md               # Schema de DB (NUEVO)
└── EXAMPLES_AND_TESTING.md          # Ejemplos y tests (NUEVO)
```

## 🔐 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **admin** | Acceso completo a todas las funciones |
| **warehouse_manager** | Gestión de inventario, precios y proveedores |
| **inventory_clerk** | Gestión de inventario (lectura/escritura) |
| **logistics_coordinator** | Gestión de órdenes y logística |
| **viewer** | Solo lectura en todas las áreas |

## 🌐 Endpoints Principales

### Autenticación
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registro (solo admin)
- `GET /api/v1/auth/me` - Perfil actual

### Inventario
- `GET /api/v1/inventory` - Listar inventario
- `POST /api/v1/inventory` - Crear item
- `PUT /api/v1/inventory/:id` - Actualizar item
- `POST /api/v1/inventory/:id/move` - Cambiar estado
- `GET /api/v1/inventory/:id/movements` - Historial
- `GET /api/v1/inventory/reports/stock-by-product` - Reporte

### Precios
- `POST /api/v1/prices` - Crear precio
- `GET /api/v1/prices/current/:productId` - Precio actual
- `GET /api/v1/prices/history/:productId` - Historial

### Proveedores
- `GET /api/v1/suppliers` - Listar
- `POST /api/v1/suppliers` - Crear
- `PUT /api/v1/suppliers/:id` - Actualizar

### Órdenes
- `GET /api/v1/orders` - Listar
- `POST /api/v1/orders` - Crear
- `GET /api/v1/orders/:id` - Obtener
- `PATCH /api/v1/orders/:id/status` - Actualizar estado

### Webhooks
- `POST /api/v1/webhooks/logistics` - Recibir webhook (público)
- `GET /api/v1/webhooks/logistics` - Listar webhooks

Ver documentación completa en [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔄 Flujo de Trabajo Típico

### 1. Recepción de Mercancía
```bash
# 1. Login
POST /auth/login

# 2. Crear entrada de inventario
POST /inventory
{
  "productId": "iphone-15-pro",
  "imei": "123456789012345",
  "status": "purchased",
  "purchasePrice": "4500000",
  ...
}

# 3. Mover a almacén
POST /inventory/{id}/move
{
  "toStatus": "in_warehouse",
  "toLocation": "A-12-5"
}
```

### 2. Procesamiento de Orden
```bash
# 1. Crear orden (reserva automáticamente)
POST /orders
{
  "orderNumber": "ORD-2025-001",
  "items": [...]
}

# 2. Preparar
POST /inventory/{id}/move { "toStatus": "preparing" }

# 3. Empacar
POST /inventory/{id}/move { "toStatus": "packed" }

# 4. Enviar
POST /inventory/{id}/move { "toStatus": "shipped" }
PATCH /orders/{id}/status { "status": "shipped", "trackingNumber": "..." }
```

### 3. Entrega
```bash
# Webhook del operador (automático)
POST /webhooks/logistics
{
  "provider": "LogiCorp",
  "event": "delivered",
  "orderId": "..."
}

# Actualizar estado final
POST /inventory/{id}/move { "toStatus": "delivered" }
PATCH /orders/{id}/status { "status": "delivered" }
```

## 🧪 Testing

### Ejecutar Tests
```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests e2e
npm run test:e2e
```

### Testing Manual con cURL
Ver [EXAMPLES_AND_TESTING.md](./EXAMPLES_AND_TESTING.md) para scripts completos

### Postman Collection
Importar `postman_collection.json` incluido en la documentación

## 🔌 Integración con Operador Logístico

### Preparación Actual ✅
- ✅ Tabla `logistics_webhooks` para recibir eventos
- ✅ Campos de tracking en órdenes
- ✅ Payload JSON flexible
- ✅ Endpoint público para webhooks

### Para Integrar (Próximos Pasos)
1. Obtener credenciales del operador
2. Implementar función de envío en `inventory-routes.ts`
3. Mapear eventos del webhook a estados internos
4. Configurar notificaciones automáticas

Ejemplo de integración:
```typescript
// Enviar orden a operador
async function sendToLogistics(orderId: string) {
  const order = await getOrder(orderId);

  const response = await fetch('https://api.operador.com/shipments', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order_id: order.orderNumber,
      customer: {...},
      shipping_address: {...}
    })
  });

  return response.json();
}
```

## 🔧 Configuración Avanzada

### N8N Workflows
Ver [EXAMPLES_AND_TESTING.md](./EXAMPLES_AND_TESTING.md) sección 7 para ejemplos de integración con n8n

### WhatsApp Notifications
```typescript
// Ejemplo de integración con WhatsApp Business API
async function sendWhatsAppNotification(phone: string, message: string) {
  await fetch('https://api.whatsapp.com/send', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer WHATSAPP_TOKEN' },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone,
      text: { body: message }
    })
  });
}
```

## 📊 Monitoreo y Métricas

### Logs
Los logs del servidor se encuentran en la consola durante desarrollo.

Para producción, configurar:
- Winston para logging estructurado
- Sentry para error tracking
- New Relic para APM

### Métricas Disponibles
- Stock por producto y estado
- Movimientos por período
- Órdenes por estado
- Tiempos de procesamiento

### Script de Diagnóstico
```bash
npm run diagnostics
```

## 🚀 Deployment

### Producción
```bash
# Build
npm run build

# Iniciar
NODE_ENV=production npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Variables de Entorno para Producción
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=strong-random-secret
SESSION_SECRET=another-strong-secret
PORT=5000
```

## 📈 Roadmap

### Fase 1 - Actual ✅
- ✅ Gestión de inventario completa
- ✅ Trazabilidad interna
- ✅ Gestión de precios
- ✅ Sistema de órdenes
- ✅ Autenticación y roles

### Fase 2 - Próxima (Q1 2026)
- [ ] Integración con operador logístico específico
- [ ] Notificaciones automáticas (Email/WhatsApp)
- [ ] Dashboard de métricas en tiempo real
- [ ] Exportación de reportes (Excel, PDF)
- [ ] Documentación Swagger/OpenAPI

### Fase 3 - Futura (Q2 2026)
- [ ] Múltiples almacenes
- [ ] Integración completa con n8n
- [ ] API pública para partners
- [ ] App móvil para escaneo de códigos
- [ ] BI y analytics avanzados

## 🤝 Soporte

Para dudas o problemas:
1. Revisar [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. Revisar [EXAMPLES_AND_TESTING.md](./EXAMPLES_AND_TESTING.md)
3. Contactar al equipo de desarrollo

## 📝 Changelog

### v1.0.0 (2025-11-19)
- ✅ Sistema completo de inventario
- ✅ Trazabilidad de 12 estados
- ✅ Gestión de precios con historial
- ✅ Sistema de órdenes
- ✅ Autenticación JWT
- ✅ Webhooks para logística
- ✅ Documentación completa

## 📄 Licencia

Propietario - Celuvendo.com - Todos los derechos reservados
