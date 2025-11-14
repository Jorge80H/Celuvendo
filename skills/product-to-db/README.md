# Product-to-DB Skill

Skill para agregar productos desde fichas de producto al archivo `samsung-products.ts` automáticamente.

## 📦 ¿Qué hace esta skill?

Esta skill automatiza completamente el proceso de:
1. Leer una ficha de producto en formato Markdown
2. Extraer toda la información del producto
3. Formatear correctamente en TypeScript
4. Agregar al archivo `samsung-products.ts`

## 🚀 Cómo usar

### Paso 1: Crear la ficha del producto

Crea un archivo markdown con la información completa del producto en:
```
Fichas_Productos/NOMBRE-DEL-PRODUCTO.md
```

### Paso 2: Usar la skill

Simplemente di:
```
"Agrega este producto a samsung-products.ts"
"Add this product ficha to the database"
"Toma la ficha de XIAOMI Redmi 14C y agrégala a samsung-products"
```

Y proporciona la ruta de la ficha o el @mention del archivo.

### Paso 3: Hacer seed

Una vez agregado el producto:
1. Ve a `http://localhost:5173/seed`
2. Click en "Seed Database"
3. El sistema automáticamente detectará que es un producto nuevo y solo agregará ese (no duplicará los existentes)

## ✨ Características

- ✅ **Automático**: Extrae y formatea toda la información
- ✅ **Inteligente**: Detecta campos opcionales y usa valores por defecto razonables
- ✅ **Seguro**: Valida que el formato sea correcto antes de agregar
- ✅ **Rápido**: En segundos tienes el producto listo para seed

## 📁 Contenido de la skill

```
product-to-db/
├── SKILL.md                              # Instrucciones principales
├── LICENSE.txt                           # Licencia MIT
├── README.md                            # Este archivo
├── references/
│   ├── seed-instructions.md             # Guía completa del sistema de seed
│   └── product-format-examples.md       # Ejemplos de productos correctos
└── scripts/
    └── validate_product.py              # Script para validar productos
```

## 📖 Documentación

- **SKILL.md**: Instrucciones completas para Claude sobre cómo usar la skill
- **seed-instructions.md**: Guía detallada del sistema de seed con detección de duplicados
- **product-format-examples.md**: Ejemplos completos de productos correctamente formateados

## 🎯 Ejemplo de uso

```
Usuario: "Tengo la ficha del Xiaomi Redmi 14C, agrégala a samsung-products"

Claude:
1. Lee Fichas_Productos/XIAOMI-Redmi-14C.md
2. Extrae: SKU, nombre, descripción, specs, colores, etc.
3. Formatea en TypeScript
4. Agrega al final de samsung-products.ts
5. Confirma: "✅ Producto agregado: XIAOMI-14C-8-256"

Usuario: Ve a /seed y da click en "Seed Database"

Sistema: "✅ 1 producto(s) nuevo(s) agregado(s)! 11 producto(s) ya existían."
```

## ⚙️ Script de validación

Puedes validar manualmente un producto con:

```bash
python skills/product-to-db/scripts/validate_product.py
```

Luego pega el objeto JSON del producto y el script validará todos los campos requeridos.

## 🔄 Workflow completo

```
Ficha MD → Skill extrae datos → Formatea TypeScript →
Agrega a samsung-products.ts → Usuario va a /seed →
Sistema detecta nuevo producto → Solo agrega el nuevo →
¡Listo!
```

## 💡 Tips

- La skill maneja automáticamente los formatos de precios colombianos
- Convierte colores a formato hexadecimal
- Genera slugs automáticamente
- Asigna stock y ratings razonables basados en el tier del producto
- Marca productos 5G como "featured" automáticamente

## 📝 Notas

- Todos los productos usan temporalmente la misma imagen placeholder
- Los precios deben estar en COP (pesos colombianos)
- El SKU debe seguir el formato: `MARCA-MODELO-RAM-STORAGE`
- La skill valida que no falten campos críticos

---

**Versión**: 1.0
**Fecha**: Noviembre 2025
**Licencia**: MIT
