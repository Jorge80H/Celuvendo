# Celuvendo.com - E-commerce de Celulares

Plataforma e-commerce para venta de celulares en Colombia, construida con React, Vite e InstantDB.

## Configuración de InstantDB

Este proyecto usa [InstantDB](https://www.instantdb.com/) como base de datos en tiempo real.

### Pasos para configurar:

1. **Crear cuenta en InstantDB**:
   - Ve a https://www.instantdb.com/
   - Crea una cuenta gratuita
   - Crea una nueva app

2. **Obtener el APP_ID**:
   - En el dashboard de InstantDB, copia tu `APP_ID`

3. **Configurar variables de entorno**:

   **Localmente** (crear archivo `.env` en la raíz del proyecto):
   ```
   VITE_INSTANT_APP_ID=tu_app_id_aqui
   ```

   **En Netlify**:
   - Ve a Site configuration → Environment variables
   - Agrega: `VITE_INSTANT_APP_ID` con tu APP_ID

4. **Poblar la base de datos**:
   ```bash
   npm run seed
   ```

## Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Poblar base de datos con productos
npm run seed

# Verificar tipos TypeScript
npm run check
```

## Despliegue en Netlify

1. Conecta tu repositorio de GitHub en Netlify
2. Netlify detectará automáticamente la configuración de `netlify.toml`
3. Agrega la variable de entorno `VITE_INSTANT_APP_ID`
4. Deploy!

## Arquitectura

- **Frontend**: React 18 + Vite
- **Base de datos**: InstantDB (tiempo real)
- **UI**: Tailwind CSS + shadcn/ui
- **Routing**: Wouter
- **Hosting**: Netlify

## Estructura del Proyecto

```
CeluvendoEcom/
├── client/               # Frontend React
│   └── src/
│       ├── components/   # Componentes reutilizables
│       ├── pages/        # Páginas de la aplicación
│       └── lib/          # Utilidades (InstantDB client)
├── shared/               # Código compartido
│   └── instant-schema.ts # Schema de InstantDB
├── scripts/              # Scripts de utilidades
│   └── seed-instant.ts   # Script para poblar BD
└── attached_assets/      # Imágenes y assets
```

## Características

- ✅ Catálogo de productos en tiempo real
- ✅ Carrito de compras
- ✅ Filtros por marca, precio, RAM, almacenamiento
- ✅ Diseño responsive (mobile-first)
- ✅ Localización para Colombia (precios en COP)
- ✅ Imágenes optimizadas

## Licencia

MIT
