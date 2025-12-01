# ⏰ Recordatorio: Configurar Webhook de Bold

## 🔴 PENDIENTE: Configurar Webhook en Bold

Esta configuración es **CRÍTICA** para que el sistema de pagos funcione correctamente.

---

## 📍 Cuándo Hacerlo

**Esta noche o mañana** - antes de hacer pruebas de pago

---

## 🎯 Pasos Exactos

### 1. Acceder al Dashboard de Bold

Para **ambiente de pruebas** (recomendado primero):
👉 https://sandbox.bold.co/

Para **ambiente de producción**:
👉 https://dashboard.bold.co/

### 2. Navegar a Webhooks

1. Inicia sesión con tus credenciales de Bold
2. Busca en el menú: **"Webhooks"**, **"Notificaciones"** o **"Integraciones"**
3. Haz clic en **"Agregar Webhook"** o **"Nuevo Webhook"**

### 3. Configurar el Webhook

Ingresa estos datos exactos:

**URL del Webhook:**
```
https://celuvendo.com/api/webhooks/bold
```

**Eventos a Suscribir:**
- ✅ `payment.success`
- ✅ `transaction.approved`
- ✅ `payment.confirmed` (si está disponible)

**Estado:**
- ✅ Activo / Habilitado

### 4. Guardar y Verificar

1. Haz clic en **"Guardar"** o **"Crear"**
2. Bold puede enviar un request de prueba
3. Verifica que el webhook aparezca como **"Activo"**

---

## ✅ Verificar que Funciona

Después de configurar el webhook:

### Opción 1: Prueba Manual

```bash
curl -X POST https://celuvendo.com/api/webhooks/bold \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Respuesta esperada:** `{"success":true}`

### Opción 2: Ver Logs en Netlify

1. Ve a: https://app.netlify.com
2. Selecciona tu sitio
3. Ve a: **Functions** → **index** → **Function log**
4. Busca requests a `/api/webhooks/bold`

---

## 🧪 Después de Configurar

Una vez configurado el webhook, hacer una **compra de prueba**:

1. Ve a: https://celuvendo.com
2. Agrega productos al carrito
3. Completa el checkout con estos datos de prueba:
   ```
   Nombre: Juan Pérez Test
   Documento: CC - 123456789
   Dirección: Calle 123 #45-67
   Ciudad: Bogotá
   Teléfono: 3001234567
   Email: test@celuvendo.com
   ```
4. En Bold, usa la tarjeta de prueba:
   ```
   Número: 4242 4242 4242 4242
   Fecha: 12/25
   CVV: 123
   ```
5. Completa el pago

### Qué Verificar:

- [ ] Redirige a página de confirmación
- [ ] Muestra los datos de la orden
- [ ] Orden aparece en InstantDB
- [ ] Webhook recibido en Netlify Functions
- [ ] Datos enviados a n8n

---

## 🐛 Si Algo No Funciona

### El webhook no se recibe

**Verificar:**
1. La URL está correcta: `https://celuvendo.com/api/webhooks/bold`
2. El webhook está "Activo" en Bold
3. Los eventos están seleccionados correctamente
4. Ver logs en Netlify Functions

### La orden no se crea

**Verificar:**
1. Variables de entorno en Netlify
2. InstantDB está accesible
3. Ver logs en Netlify Functions
4. Ver consola del navegador (F12)

### No llegan datos a n8n

**Verificar:**
1. Variable `N8N_WEBHOOK_URL` en Netlify
2. Workflow de n8n está activo
3. Ver logs en Netlify Functions
4. Probar URL de n8n manualmente:
   ```bash
   curl -X POST https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

---

## 📞 Ayuda

Si necesitas ayuda:
- Ver **NETLIFY_DEPLOYMENT.md** (sección Troubleshooting)
- Ver **BOLD_SETUP.md** (documentación completa)
- Logs en Netlify: Functions → index → Function log

---

## 📋 Estado Actual

- ✅ Código desplegado en Netlify
- ✅ Variables de entorno configuradas
- ⏳ **PENDIENTE: Configurar webhook en Bold** ← **HACER ESTA NOCHE/MAÑANA**
- ⏳ Hacer prueba de pago
- ⏳ Verificar todo funcione

---

**URL del Webhook (copiar y pegar en Bold):**
```
https://celuvendo.com/api/webhooks/bold
```

**Eventos (seleccionar en Bold):**
```
payment.success
transaction.approved
```

---

¡Buena suerte! 🚀
