# Guía de Despliegue en Netlify - Celuvendo.com

Esta guía te ayudará a configurar y desplegar tu aplicación en Netlify con la pasarela de pagos Bold.

## 🚀 Paso 1: Configurar Variables de Entorno en Netlify

### Acceder a la Configuración

1. Ve a https://app.netlify.com
2. Selecciona tu sitio: **celuvendo.com**
3. Ve a **Site settings** → **Environment variables**

### Variables Requeridas

Agrega las siguientes variables de entorno (haz clic en **"Add a variable"** para cada una):

#### InstantDB (Base de Datos)
```
VITE_INSTANT_APP_ID = 7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_APP_ID = 7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_ADMIN_TOKEN = 7c799aa0-a50a-4000-9863-c3321f7f8de7
```

#### Servidor
```
NODE_ENV = production
APP_URL = https://celuvendo.com
SESSION_SECRET = be90bd64d81cb2018db3e4901de493970445a943fc754d5252fbdbba3e33f1a0
```

#### Bold Payment Gateway (Ambiente de PRUEBAS primero)
```
BOLD_ENV = test
BOLD_API_KEY = Iu2YwnF_G0gqnpUcqGJJW1Jz_5wrzyaYk21bYYM9bWs
BOLD_SECRET_KEY = sOwzS3EPJfdd6PL83_MPMw
```

#### n8n Webhook
```
N8N_WEBHOOK_URL = https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders
```

**⚠️ IMPORTANTE**:
- No uses comillas en los valores
- Copia y pega exactamente como están
- Asegúrate de guardar después de agregar cada variable

## 📦 Paso 2: Desplegar en Netlify

### Opción A: Despliegue desde Git (Recomendado)

Si tu código está en GitHub/GitLab/Bitbucket:

1. En Netlify, ve a **Deploys** → **Trigger deploy** → **Deploy site**
2. O simplemente haz `git push` a tu repositorio
3. Netlify detectará automáticamente los cambios y desplegará

### Opción B: Despliegue Manual

```bash
# 1. Instalar Netlify CLI (si no lo tienes)
npm install -g netlify-cli

# 2. Login en Netlify
netlify login

# 3. Vincular tu proyecto
netlify link

# 4. Desplegar
netlify deploy --prod
```

### Verificar el Build

1. Ve a **Deploys** en tu dashboard de Netlify
2. Espera a que el deploy termine (suele tomar 2-5 minutos)
3. Busca el mensaje: **"Site is live"** ✅
4. Si hay errores, revisa los logs del build

## 🔧 Paso 3: Configurar Webhook de Bold

### URL del Webhook para Netlify

```
https://celuvendo.com/api/webhooks/bold
```

### Configurar en Bold Dashboard

1. Ve a: https://dashboard.bold.co/ (o https://sandbox.bold.co/ para pruebas)
2. Navega a **Webhooks** o **Integraciones**
3. Haz clic en **"Agregar Webhook"**
4. Configura:
   - **URL**: `https://celuvendo.com/api/webhooks/bold`
   - **Eventos**:
     - ✅ `payment.success`
     - ✅ `transaction.approved`
   - **Activo**: ✅ Sí
5. Guarda la configuración

### Verificar el Webhook

Bold enviará un request de prueba. Puedes verificar en:
- Netlify: **Functions** → **index** → Ver logs
- Bold Dashboard: Ver el estado del webhook

## 🧪 Paso 4: Probar el Flujo Completo

### 1. Verificar que el Sitio Esté Live

```bash
# Verificar endpoint de productos
curl https://celuvendo.com/api/products
```

Debes recibir una respuesta JSON con los productos.

### 2. Probar Compra Completa

1. **Agregar al carrito**
   - Ve a: https://celuvendo.com/productos
   - Selecciona un producto
   - Agrega al carrito
   - ✅ El contador debe actualizarse

2. **Ver carrito**
   - Ve a: https://celuvendo.com/carrito
   - ✅ Los productos deben aparecer
   - ✅ Los totales deben ser correctos

3. **Checkout**
   - Haz clic en "Proceder al Pago"
   - Llena el formulario:
     ```
     Nombre: Juan Pérez
     Documento: CC - 123456789
     Dirección: Calle 123 #45-67
     Ciudad: Bogotá
     Teléfono: 3001234567
     Email: test@celuvendo.com
     ```
   - Haz clic en "Proceder al Pago"

4. **Pago en Bold**
   - Serás redirigido a Bold
   - Usa tarjeta de prueba:
     ```
     Número: 4242 4242 4242 4242
     Fecha: 12/25
     CVV: 123
     ```
   - Completa el pago

5. **Confirmación**
   - Serás redirigido a: https://celuvendo.com/payment/confirmation
   - ✅ Debes ver el mensaje de éxito
   - ✅ Debes ver los detalles de tu orden

### 3. Verificar en InstantDB

1. Ve a: https://instantdb.com/dash
2. Selecciona tu app
3. Ve a **Data** → **orders**
4. ✅ Debes ver la orden creada con:
   - `paymentStatus: "paid"`
   - `orderStatus: "processing"`
   - Todos los datos del cliente
   - Items comprados

### 4. Verificar en n8n

1. Ve a: https://n8n.srv942208.hstgr.cloud
2. Abre tu workflow de Celuvendo
3. Ve a **Executions**
4. ✅ Debes ver una nueva ejecución con todos los datos

## 📊 Monitorear en Netlify

### Ver Logs de las Funciones

1. En Netlify, ve a **Functions**
2. Haz clic en **index**
3. Ve a **Function log**
4. Aquí verás todos los requests que llegan a tu API

**Busca estos mensajes importantes**:
- ✅ `POST /api/orders/create 200`
- ✅ `POST /api/webhooks/bold 200`
- ✅ `Payment confirmed for order CEL-...`
- ✅ `Data sent to n8n successfully`

### Revisar Deploys

- **Deploys** → Ver historial de despliegues
- **Deploy log** → Ver logs completos del build

## 🐛 Troubleshooting en Netlify

### Error: "Function not found"

**Causa**: Las funciones serverless no se están construyendo correctamente.

**Solución**:
1. Verifica que `netlify.toml` esté configurado correctamente
2. Verifica que `dist/server` se esté generando en el build
3. Verifica los logs del deploy en Netlify

### Error: "Environment variable not defined"

**Causa**: Falta alguna variable de entorno.

**Solución**:
1. Ve a **Site settings** → **Environment variables**
2. Verifica que todas las variables estén configuradas
3. Re-despliega el sitio: **Deploys** → **Trigger deploy**

### Error: Webhook no se recibe

**Causa**: El redirect en Netlify no está funcionando.

**Solución**:
1. Verifica `netlify.toml` (ya actualizado)
2. Verifica en **Functions** → **index** → logs
3. Prueba el endpoint manualmente:
   ```bash
   curl -X POST https://celuvendo.com/api/webhooks/bold \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

### Error: "Cannot find module" en producción

**Causa**: Dependencias no están instaladas correctamente.

**Solución**:
1. Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`)
2. Verifica `package.json`
3. Re-despliega

### Error en InstantDB

**Causa**: Schema no está actualizado o credenciales incorrectas.

**Solución**:
1. Verifica las variables de entorno en Netlify
2. El schema se actualizará automáticamente en el primer uso
3. Verifica en https://instantdb.com/dash

## 🔄 Actualizar a Producción (Pagos Reales)

Cuando todo funcione con las llaves de TEST:

### 1. Actualizar Variables en Netlify

Ve a **Site settings** → **Environment variables** y cambia:

```
BOLD_ENV = production
BOLD_API_KEY = MdG8AUR_EQ6MeT_WvDVkAIhbspC4EOgWyPTLyMW8eh0
BOLD_SECRET_KEY = 8ss8oSlI8reH8LVOcty39g
```

### 2. Actualizar Webhook en Bold

1. Ve al dashboard de **producción** de Bold (no sandbox)
2. Configura el mismo webhook: `https://celuvendo.com/api/webhooks/bold`
3. Activa los eventos: `payment.success` y `transaction.approved`

### 3. Re-desplegar

```bash
netlify deploy --prod
```

O simplemente:
- **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### 4. Probar con Pago Real

Haz una compra de prueba con una tarjeta real (puede ser por un monto pequeño).

## ✅ Checklist de Despliegue

Antes de considerar que está todo listo:

- [ ] Variables de entorno configuradas en Netlify
- [ ] Sitio desplegado sin errores
- [ ] Endpoint `/api/products` responde correctamente
- [ ] Webhook configurado en Bold dashboard
- [ ] Compra de prueba completada exitosamente
- [ ] Orden creada en InstantDB
- [ ] Datos recibidos en n8n
- [ ] Página de confirmación funcionando
- [ ] Logs en Netlify muestran requests exitosos

## 📞 Recursos

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/
- **Bold Developers**: https://developers.bold.co/
- **InstantDB**: https://instantdb.com/dash

## 🎯 URLs Importantes

- **Sitio**: https://celuvendo.com
- **Netlify Dashboard**: https://app.netlify.com
- **InstantDB Dashboard**: https://instantdb.com/dash
- **n8n**: https://n8n.srv942208.hstgr.cloud
- **Bold Dashboard**: https://dashboard.bold.co/

---

**¡Listo para desplegar!** 🚀

Si encuentras algún problema, revisa primero los logs en Netlify → Functions → index → Function log.
