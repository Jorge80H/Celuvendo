# Guía de Pruebas en Producción - Celuvendo.com

Esta guía te ayudará a realizar pruebas completas del flujo de pago con Bold en tu sitio desplegado.

## ✅ Configuración Completada

Tu archivo `.env` ya está configurado para producción:

```bash
APP_URL=https://celuvendo.com
NODE_ENV=production
BOLD_ENV=test (para pruebas seguras primero)
N8N_WEBHOOK_URL=https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders
```

## 🔧 Paso 1: Configurar Webhook en Bold

### Acceder al Dashboard de Bold

1. Ve a: https://dashboard.bold.co/ (o https://sandbox.bold.co/ para pruebas)
2. Inicia sesión con tus credenciales

### Configurar el Webhook

1. En el dashboard, busca la sección de **"Webhooks"** o **"Notificaciones"**
2. Haz clic en **"Agregar Webhook"** o **"Nuevo Webhook"**
3. Configura los siguientes datos:

**URL del Webhook:**
```
https://celuvendo.com/api/webhooks/bold
```

**Eventos a suscribir:**
- ✅ `payment.success`
- ✅ `transaction.approved`
- ✅ `payment.confirmed` (si está disponible)

4. **Importante**: Guarda el webhook y asegúrate de que esté **activado**

### Verificar la Configuración del Webhook

Bold enviará una notificación de prueba. Verifica que:
- El endpoint esté accesible desde internet
- El servidor responda con código 200
- La firma del webhook se verifique correctamente

## 🚀 Paso 2: Desplegar la Aplicación

### Variables de Entorno en el Servidor

Asegúrate de que estas variables estén configuradas en tu servidor de producción:

```bash
# InstantDB
VITE_INSTANT_APP_ID=7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_APP_ID=7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_ADMIN_TOKEN=7c799aa0-a50a-4000-9863-c3321f7f8de7

# Server
PORT=5173
NODE_ENV=production
APP_URL=https://celuvendo.com
SESSION_SECRET=be90bd64d81cb2018db3e4901de493970445a943fc754d5252fbdbba3e33f1a0

# Bold - Ambiente de PRUEBAS (recomendado primero)
BOLD_ENV=test
BOLD_API_KEY=Iu2YwnF_G0gqnpUcqGJJW1Jz_5wrzyaYk21bYYM9bWs
BOLD_SECRET_KEY=sOwzS3EPJfdd6PL83_MPMw

# n8n Webhook
N8N_WEBHOOK_URL=https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders
```

### Comandos de Despliegue

```bash
# 1. Construir la aplicación
npm run build

# 2. Iniciar el servidor
npm run start

# O si usas PM2:
pm2 start npm --name "celuvendo" -- start
pm2 save
```

## 🧪 Paso 3: Realizar Pruebas

### Prueba 1: Verificar Endpoints

```bash
# Verificar que el servidor esté funcionando
curl https://celuvendo.com/api/products

# Verificar que el endpoint de webhook responda (opcional)
curl -X POST https://celuvendo.com/api/webhooks/bold \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Prueba 2: Flujo Completo de Compra

1. **Agregar productos al carrito**
   - Ve a: https://celuvendo.com/productos
   - Selecciona un producto
   - Agrega al carrito
   - Verifica que el contador del carrito se actualice

2. **Ir al carrito**
   - Ve a: https://celuvendo.com/carrito
   - Verifica que los productos estén listados
   - Verifica los totales (subtotal, envío, total)

3. **Proceder al checkout**
   - Haz clic en "Proceder al Pago"
   - Serás redirigido a: https://celuvendo.com/checkout

4. **Llenar formulario de datos**
   - **Nombre**: Tu nombre de prueba
   - **Tipo de documento**: CC o NIT
   - **Número de documento**: 123456789 (prueba)
   - **Dirección**: Calle 123 #45-67 Apto 801
   - **Ciudad**: Bogotá
   - **Teléfono**: 3001234567
   - **Email**: tu-email@prueba.com

5. **Iniciar pago con Bold**
   - Haz clic en "Proceder al Pago"
   - Serás redirigido a Bold
   - Verifica que veas la página de pago de Bold
   - Verifica que el monto sea correcto

### Prueba 3: Completar Pago en Bold

**Tarjetas de Prueba de Bold** (ambiente TEST):

Para **pago exitoso**:
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura (ej: 12/25)
CVV: 123
```

Para **pago rechazado**:
```
Número: 4000 0000 0000 0002
Fecha: Cualquier fecha futura
CVV: 123
```

1. Ingresa los datos de la tarjeta de prueba
2. Completa el formulario de Bold
3. Confirma el pago

### Prueba 4: Verificar Confirmación

Después del pago exitoso:

1. **Serás redirigido a**: https://celuvendo.com/payment/confirmation
2. **Debes ver**:
   - ✅ Ícono de éxito (check verde)
   - ✅ Número de orden
   - ✅ Detalles de la orden
   - ✅ Información de envío
   - ✅ Productos comprados
   - ✅ Totales

### Prueba 5: Verificar InstantDB

1. Ve a: https://instantdb.com/dash
2. Selecciona tu app: `7d176ba5-60f3-4385-a6e7-bf8bd7944993`
3. Ve a la sección **"Data"**
4. Busca la entidad **"orders"**
5. **Debes ver**:
   - La orden creada con todos los datos
   - Estado: `paymentStatus: "paid"`
   - Estado: `orderStatus: "processing"`
   - Información del cliente
   - Items de la orden

### Prueba 6: Verificar Webhook de n8n

1. Ve a tu instancia de n8n: https://n8n.srv942208.hstgr.cloud
2. Abre el workflow de Celuvendo
3. Revisa las **"Executions"** (ejecuciones)
4. **Debes ver**:
   - Una nueva ejecución exitosa
   - Los datos recibidos del webhook
   - Todos los campos poblados correctamente:
     ```json
     {
       "customerName": "...",
       "documentNumber": "...",
       "orderNumber": "CEL-...",
       "productBrand": "...",
       "productName": "...",
       "total": ...,
       "boldTransactionId": "..."
     }
     ```

## 🐛 Troubleshooting

### Problema: No se recibe el webhook de Bold

**Solución**:
1. Verifica que la URL del webhook sea correcta: `https://celuvendo.com/api/webhooks/bold`
2. Verifica que el servidor esté funcionando
3. Revisa los logs del servidor para ver si llegan requests
4. Verifica en el dashboard de Bold el estado del webhook

### Problema: Error al crear la orden

**Solución**:
1. Verifica que todas las variables de entorno estén configuradas
2. Verifica que InstantDB esté accesible
3. Revisa los logs del servidor
4. Verifica que el schema de InstantDB esté actualizado

### Problema: No se envían datos a n8n

**Solución**:
1. Verifica que `N8N_WEBHOOK_URL` esté correcta
2. Verifica que el workflow de n8n esté activo
3. Revisa los logs del servidor para ver si hay errores al enviar
4. Prueba la URL del webhook manualmente con curl:
   ```bash
   curl -X POST https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

### Problema: Error en la página de confirmación

**Solución**:
1. Verifica que la orden se haya creado en InstantDB
2. Verifica que el `orderId` esté en la URL
3. Revisa los logs del navegador (F12 → Console)

## 📊 Logs a Monitorear

### En el Servidor

```bash
# Ver logs en tiempo real
pm2 logs celuvendo --lines 100

# O si usas node directamente
tail -f /var/log/celuvendo.log
```

**Busca estos mensajes**:
- ✅ `Payment confirmed for order CEL-...`
- ✅ `Data sent to n8n successfully`
- ❌ `Error creating order:`
- ❌ `Failed to send data to n8n:`

### En el Navegador

Abre las herramientas de desarrollo (F12) y revisa:
- **Console**: Para errores de JavaScript
- **Network**: Para verificar las llamadas a la API
- **Application → Storage**: Para ver el sessionId del carrito

## 🎯 Checklist Final

Antes de considerar que todo está funcionando:

- [ ] Productos se pueden agregar al carrito
- [ ] El contador del carrito se actualiza en tiempo real
- [ ] El carrito muestra los productos correctamente
- [ ] El checkout muestra el resumen correcto
- [ ] El formulario valida los campos correctamente
- [ ] La redirección a Bold funciona
- [ ] El pago en Bold se procesa correctamente
- [ ] La página de confirmación muestra la orden
- [ ] La orden se crea en InstantDB con estado "paid"
- [ ] El carrito se limpia después del pago
- [ ] Los datos se envían a n8n correctamente
- [ ] El webhook de Bold se recibe correctamente

## 🔄 Pasar a Producción (Pagos Reales)

Una vez que todas las pruebas funcionen correctamente:

1. **Actualiza las llaves de Bold** en `.env`:
```bash
BOLD_ENV=production
BOLD_API_KEY=MdG8AUR_EQ6MeT_WvDVkAIhbspC4EOgWyPTLyMW8eh0
BOLD_SECRET_KEY=8ss8oSlI8reH8LVOcty39g
```

2. **Actualiza el webhook en Bold**:
   - Usa el dashboard de producción de Bold
   - Configura la misma URL: `https://celuvendo.com/api/webhooks/bold`

3. **Reinicia el servidor**:
```bash
pm2 restart celuvendo
```

4. **Haz una compra de prueba real** con una tarjeta verdadera (puede ser por un monto pequeño)

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del servidor
2. Revisa la consola del navegador
3. Verifica InstantDB dashboard
4. Verifica n8n executions
5. Consulta la documentación de Bold: https://developers.bold.co/

---

**¡Buena suerte con las pruebas!** 🚀
