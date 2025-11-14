---
name: product-to-db
description: This skill should be used when the user wants to add a new product from a product ficha (markdown file) to the samsung-products.ts database file for the Celuvendo e-commerce system. It extracts product data from markdown fichas and formats it correctly for insertion into the TypeScript products array.
license: MIT
---

# Product to Database Skill

This skill automates the process of adding new products from markdown product fichas to the `samsung-products.ts` database file.

## When to Use This Skill

Use this skill when:
- The user provides a product ficha markdown file (e.g., `Fichas_Productos/XIAOMI-Redmi-14C.md`)
- The user wants to add a new product to the database
- The user says something like "add this product to the database" or "agregar este producto a samsung-products"

## How It Works

### Step 1: Read the Product Ficha

Read the product ficha markdown file provided by the user. The ficha is typically located in `Fichas_Productos/` directory and contains structured product information in Spanish.

### Step 2: Extract Product Data

Extract the following information from the ficha:

**From Section 1 (Información General):**
- SKU (from **SKU/Código Interno**)
- Brand (from **Marca**)
- Model name

**From Section 2 (Precio y Disponibilidad):**
- Price (from **Precio Celuvendo**)
- Compare at price (from price analysis section)

**From Section 3 (Colores Disponibles):**
- Color names and hex codes
- Format as array: `[{ name: "Color Name", code: "#HEXCODE" }]`

**From Section 4 (Descripción de Marketing):**
- Short description (Descripción Corta)
- Long description (Descripción Larga)

**From Section 5 (Especificaciones Técnicas):**
- Screen specifications (size, type, resolution, refresh rate)
- Processor
- RAM and storage
- Camera details (main, additional cameras, front camera, features)
- Battery (capacity, charging speed)
- Connectivity (network, Wi-Fi, Bluetooth, NFC, ports)
- Security features
- Operating system
- Dimensions and weight
- Resistance/IP rating
- Update policy

**From Section 6 (Contenido de la Caja):**
- Items included in box
- Items NOT included

**From Section 7 (Ventajas Competitivas):**
- Key strengths (pros)
- Limitations (cons)

**Additional fields:**
- Generate slug from name (lowercase, replace spaces with hyphens, remove special chars)
- Set stock to a reasonable number (15-30)
- Set isActive to true
- Set isFeatured based on product tier (true for premium/5G, false for budget)
- Set rating (4.0-4.7 based on product tier)
- Set reviewCount to 0 for new products

### Step 3: Format the Product Object

Create a TypeScript object following the exact format used in `samsung-products.ts`. The format is:

```typescript
{
  sku: "BRAND-MODEL-RAM-STORAGE",
  name: "Brand Model RAM | Storage",
  slug: "brand-model-ram-storage",
  description: "Short marketing description",
  longDescription: `Multi-line long description

  With paragraphs separated by blank lines.

  More details about the product.`,
  brand: "Brand Name",
  price: 000000,
  compareAtPrice: 000000,
  currency: "COP",
  images: [
    "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
  ],
  specifications: {
    screen: {
      size: "X.X\"",
      type: "LCD/AMOLED",
      resolution: "XXX x XXXX",
      refreshRate: "XXHz",
    },
    processor: "Processor Name",
    ram: "XGB",
    storage: "XXXGB",
    expandableStorage: "Up to XTB microSD",
    camera: {
      main: "XXM P f/X.X",
      // additional camera fields as needed
      front: "XXM P",
      features: ["Feature 1", "Feature 2"],
    },
    battery: {
      capacity: "XXXXmAh",
      charging: "XXW fast charging",
    },
    connectivity: ["4G/5G", "Wi-Fi", "Bluetooth", "NFC", "etc"],
    security: ["Fingerprint", "Face unlock"],
    os: "Android XX",
    dimensions: "XXX x XXX x XXX mm",
    weight: "XXXg",
    resistance: "IPXX or description",
    updates: "X years Android + X years security",
  },
  colors: [
    { name: "Color Name", code: "#HEXCODE" },
  ],
  features: [
    "Feature 1",
    "Feature 2",
    // ... up to 10 key features
  ],
  highlights: {
    pros: [
      "Pro 1",
      "Pro 2",
      // ... top 6 advantages
    ],
    cons: [
      "Con 1",
      "Con 2",
      // ... top 5 limitations
    ],
  },
  boxContents: {
    included: [
      "Item 1",
      "Item 2",
    ],
    notIncluded: [
      "Item 1",
      "Item 2",
    ],
  },
  promotion: {
    active: false,
    title: "",
    description: "",
    expired: false,
  },
  stock: 20,
  isActive: true,
  isFeatured: true/false,
  rating: 4.X,
  reviewCount: 0,
}
```

### Step 4: Add to samsung-products.ts

1. Read the current `client/src/data/samsung-products.ts` file
2. Add the new product object to the end of the `samsungProducts` array (before the closing `];`)
3. Ensure proper TypeScript formatting (commas, indentation)
4. Write the updated file

### Step 5: Confirm with User

After adding the product, inform the user:
- ✅ Product added successfully
- Show the SKU and name of the added product
- Remind them to go to `/seed` page to seed the database
- Mention that the seed will automatically detect it's a new product and only add it (not duplicate existing ones)

## Important Notes

### Price Handling
- Prices in fichas are in COP (Colombian Pesos)
- Remove thousand separators (dots or commas)
- Price field should be: `price: 599900` (no quotes, no separators)
- compareAtPrice can be null if no comparison price exists

### Image Placeholder
- All products currently use the same placeholder image
- Use: `"/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png"`
- This will be replaced with actual product images later

### Brand Names
- Samsung, Motorola, TECNO, Infinix, OPPO, Xiaomi, etc.
- Keep exact capitalization from ficha

### Common Patterns

**For 5G phones:**
- isFeatured: true
- rating: 4.5-4.7

**For 4G phones:**
- isFeatured: depends on specs
- rating: 4.2-4.5

**For budget phones (<500K):**
- isFeatured: false unless exceptional value
- rating: 4.0-4.4

### Error Handling

If the ficha is missing critical information:
1. Ask the user to provide the missing data
2. Use reasonable defaults where appropriate
3. Mark fields as "Por confirmar" if truly unknown

## Workflow Summary

```
User provides ficha → Read ficha → Extract data → Format TypeScript object →
Add to samsung-products.ts → Confirm success → User runs /seed
```

This skill makes adding new products a simple, repeatable process that takes a few seconds instead of manually copying and formatting data.
