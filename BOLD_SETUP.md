# Configuración de Pasarela de Pagos Bold

Este documento explica cómo configurar y usar la pasarela de pagos Bold en Celuvendo E-commerce.

## Flujo de Pago

1. **Cliente llena datos** - En `/checkout`, el cliente completa:
   - CLIENTE/nombre
   - CC / NIT
   - DIRECCION
   - CIUDAD
   - TELEFONO
   - CORREO ELECTRONICO

2. **Datos automáticos capturados**:
   - FECHA
   - MARCA EQUIPO
   - COLOR EQUIPO (si está disponible)
   - PRECIO
   - CUOTA INICIAL
   - DESCUENTO
   - TOTAL INICIAL
   - FORMA DE PAGO INICIAL
   - FORMA DE PAGO

3. **Pago con Bold** - El cliente es redirigido a Bold para completar el pago

4. **Confirmación** - Bold envía webhook a nuestro servidor

5. **Envío a n8n** - Los datos se envían automáticamente a n8n vía webhook

## Configuración

### 1. InstantDB (Base de Datos)

Este proyecto usa **InstantDB** como base de datos. Primero debes configurar InstantDB:

1. Ve a [https://instantdb.com/dash](https://instantdb.com/dash)
2. Crea una nueva app o usa una existente
3. Obtén tu **App ID** y **Admin Token**
4. Actualiza el schema ejecutando el push (ver sección "Actualizar Schema" abajo)

Configura las variables de InstantDB en `.env`:

```bash
# InstantDB - Base de Datos
VITE_INSTANT_APP_ID=your_instant_app_id
INSTANT_APP_ID=your_instant_app_id
INSTANT_ADMIN_TOKEN=your_instant_admin_token
```

### 2. Variables de Entorno de Bold

Copia `.env.example` a `.env` y configura las siguientes variables:

```bash
# Entorno de Bold (test o production)
BOLD_ENV=test

# Llaves de Prueba (por defecto)
BOLD_API_KEY=Iu2YwnF_G0gqnpUcqGJJW1Jz_5wrzyaYk21bYYM9bWs
BOLD_SECRET_KEY=sOwzS3EPJfdd6PL83_MPMw

# Para producción, usa las llaves de la imagen proporcionada
# BOLD_ENV=production
# BOLD_API_KEY=MdG8AUR_EQ6MeT_WvDVkAIhbspC4EOgWyPTLyMW8eh0
# BOLD_SECRET_KEY=8ss8oSlI8reH8LVOcty39g
```

### 3. URL de la Aplicación

Configura la URL base de tu aplicación:

```bash
APP_URL=https://tu-dominio.com
```

Esta URL se usa para la redirección después del pago.

### 3. Webhook de n8n

Configura la URL del webhook de n8n donde se enviarán los datos de las órdenes:

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/celuvendo-orders
```

### 4. Configurar Webhook en Bold

En el panel de Bold, configura el webhook para recibir notificaciones de pago:

**URL del Webhook**: `https://tu-dominio.com/api/webhooks/bold`

**Eventos a suscribir**:
- `payment.success`
- `transaction.approved`

## Estructura de Datos Enviados a n8n

Cuando un pago es exitoso, se envía la siguiente estructura al webhook de n8n:

```json
{
  "customerName": "Juan Pérez",
  "documentType": "CC",
  "documentNumber": "1234567890",
  "address": "Calle 123 #45-67",
  "city": "Bogotá",
  "phone": "3001234567",
  "email": "juan@example.com",
  "orderNumber": "CEL-1234567890-ABC123",
  "orderDate": "2024-01-01T12:00:00Z",
  "productBrand": "Samsung",
  "productName": "Galaxy A54 5G",
  "productColor": "",
  "price": 1299000,
  "initialPayment": "",
  "discount": 0,
  "totalInitial": 1299000,
  "paymentMethod": "Bold",
  "paymentMethodInitial": "Bold",
  "boldTransactionId": "tx_abc123",
  "boldOrderId": "CEL-1234567890-ABC123"
}
```

## Endpoints de API

### POST /api/orders/create

Crea una orden y genera el enlace de pago de Bold.

**Request Body**:
```json
{
  "customerName": "string",
  "documentType": "CC|NIT|CE|PAS",
  "documentNumber": "string",
  "address": "string",
  "city": "string",
  "phone": "string",
  "email": "string",
  "items": [
    {
      "productId": "string",
      "name": "string",
      "brand": "string",
      "price": number,
      "quantity": number
    }
  ],
  "subtotal": number,
  "shipping": number,
  "total": number,
  "sessionId": "string"
}
```

**Response**:
```json
{
  "success": true,
  "orderId": "uuid",
  "orderNumber": "CEL-1234567890-ABC123",
  "paymentUrl": "https://checkout.bold.co/..."
}
```

### POST /api/webhooks/bold

Recibe notificaciones de Bold sobre el estado de los pagos.

**Headers**:
- `x-bold-signature`: Firma HMAC SHA256 para verificar autenticidad

### GET /api/orders/:orderId

Obtiene la información de una orden específica.

## Páginas

### /checkout

Formulario de datos del cliente y resumen de la orden.

**Características**:
- Validación de formulario
- Resumen de productos del carrito
- Cálculo de subtotal, envío y total
- Redirección a Bold para pago

### /payment/confirmation

Página de confirmación después del pago.

**Muestra**:
- Estado del pago (exitoso/pendiente)
- Detalles de la orden
- Información de envío
- Productos comprados
- Totales

## Actualizar Schema de InstantDB

El schema de la base de datos está definido en `shared/instant-schema.ts`. Después de configurar tus credenciales de InstantDB, debes hacer push del schema:

### Opción 1: Usando el CLI de InstantDB (Recomendado)

```bash
# Instalar el CLI de InstantDB globalmente
npm install -g instant-cli

# Hacer push del schema
instant-cli push-schema --app-id YOUR_APP_ID --admin-token YOUR_ADMIN_TOKEN
```

### Opción 2: Desde el Dashboard de InstantDB

1. Ve a [https://instantdb.com/dash](https://instantdb.com/dash)
2. Selecciona tu app
3. Ve a la sección "Schema"
4. El schema se actualizará automáticamente cuando tu aplicación se conecte por primera vez

### Schema de Orders

El schema incluye la entidad `orders` con los siguientes campos:
- orderNumber (único, indexado)
- sessionId (indexado)
- Información del cliente (nombre, documento, dirección, etc.)
- Items de la orden (JSON array)
- Totales (subtotal, shipping, discount, total)
- Información de pago (paymentStatus, boldTransactionId, etc.)
- Estados (orderStatus, timestamps)

## Testing

### Modo de Prueba

Con las llaves de prueba configuradas (`BOLD_ENV=test`), puedes probar el flujo completo sin cargos reales.

### Tarjetas de Prueba Bold

Consulta la documentación de Bold para obtener números de tarjeta de prueba:
https://developers.bold.co/pagos-en-linea/boton-de-pagos/integracion-manual/integracion-manual

## Documentación de Bold

- **Integración Manual**: https://developers.bold.co/pagos-en-linea/boton-de-pagos/integracion-manual/integracion-manual
- **API Reference**: https://developers.bold.co/
- **Webhooks**: https://developers.bold.co/webhooks

## Soporte

Para problemas con la integración de Bold, contacta al soporte técnico de Bold o revisa la documentación oficial.
