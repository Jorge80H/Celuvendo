# 🚀 Quick Start - Despliegue en Netlify

## ⚡ Pasos Rápidos (5 minutos)

### 1️⃣ Configurar Variables de Entorno en Netlify

Ve a: **https://app.netlify.com** → Tu sitio → **Site settings** → **Environment variables**

Agrega estas variables (copia y pega):

```
VITE_INSTANT_APP_ID = 7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_APP_ID = 7d176ba5-60f3-4385-a6e7-bf8bd7944993
INSTANT_ADMIN_TOKEN = 7c799aa0-a50a-4000-9863-c3321f7f8de7
NODE_ENV = production
APP_URL = https://celuvendo.com
SESSION_SECRET = be90bd64d81cb2018db3e4901de493970445a943fc754d5252fbdbba3e33f1a0
BOLD_ENV = test
BOLD_API_KEY = Iu2YwnF_G0gqnpUcqGJJW1Jz_5wrzyaYk21bYYM9bWs
BOLD_SECRET_KEY = sOwzS3EPJfdd6PL83_MPMw
N8N_WEBHOOK_URL = https://n8n.srv942208.hstgr.cloud/webhook/celuvendo-orders
```

### 2️⃣ Desplegar

Push a tu repositorio o en Netlify:
**Deploys** → **Trigger deploy** → **Deploy site**

### 3️⃣ Configurar Webhook en Bold

Dashboard de Bold → Webhooks → Agregar:
- **URL**: `https://celuvendo.com/api/webhooks/bold`
- **Eventos**: `payment.success` + `transaction.approved`

### 4️⃣ Probar

1. Ve a: https://celuvendo.com
2. Agrega productos al carrito
3. Completa checkout
4. Paga con: `4242 4242 4242 4242` (tarjeta de prueba)
5. ✅ Verifica la confirmación

---

## 📋 Checklist

- [ ] Variables en Netlify ✅
- [ ] Deploy exitoso ✅
- [ ] Webhook en Bold ✅
- [ ] Compra de prueba ✅

## 🆘 Problemas?

Ver logs: **Netlify** → **Functions** → **index** → **Function log**

Guía completa: Ver `NETLIFY_DEPLOYMENT.md`
