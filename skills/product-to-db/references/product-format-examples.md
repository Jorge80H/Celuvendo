# Product Format Examples

This document provides complete examples of correctly formatted product objects for the Celuvendo e-commerce system.

## Example 1: Budget 4G Phone (Motorola Moto G06)

```typescript
{
  sku: "MOT-G06-4-256",
  name: "Motorola Moto G06 256GB | 4GB RAM",
  slug: "motorola-moto-g06-256gb-4gb",
  description: "El smartphone perfecto para quien busca calidad sin comprometer su presupuesto. Pantalla gigante de 6.9\" HD+ a 120Hz, batería 5200mAh que dura 2+ días, y 256GB de almacenamiento.",
  longDescription: `Descubre el Motorola Moto G06, el smartphone perfecto para quien busca calidad sin comprometer su presupuesto. Su espectacular pantalla HD+ de 6.9 pulgadas con 120Hz es la más grande de su categoría, ofreciendo experiencia inmersiva con brillo de hasta 600 nits y tecnología Water Touch para usar incluso con manos mojadas.

Equipado con procesador MediaTek Helio G81 Extreme y 4GB de RAM (expandibles hasta 12GB con RAM Boost), el Moto G06 maneja multitarea y aplicaciones con fluidez en Android 15. Su generoso almacenamiento de 256GB (expandible a 1TB) guarda todas tus fotos, videos y apps sin preocupaciones.

La cámara 50MP con IA optimiza automáticamente retratos y capturas nocturnas con tecnología Quad Pixel, mientras que la cámara frontal de 8MP asegura selfies claras. La batería de 5200mAh está diseñada para conservar el 80% de su capacidad después de 5 años de uso, ofreciendo hasta 2 días completos de autonomía.

Disfruta de audio Dolby Atmos con parlantes estéreo, protección IP64 contra salpicaduras, vidrio Corning Gorilla Glass 3, y acabado premium en cuero vegano resistente a huellas. Con cargador incluido y NFC para pagos móviles, el Moto G06 es valor completo desde el día uno.`,
  brand: "Motorola",
  price: 479000,
  compareAtPrice: 479900,
  currency: "COP",
  images: [
    "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
  ],
  specifications: {
    screen: {
      size: "6.9\"",
      type: "IPS LCD",
      resolution: "720 x 1640 (HD+)",
      refreshRate: "120Hz",
    },
    processor: "MediaTek Helio G81 Extreme",
    ram: "4GB LPDDR4X + 8GB virtual",
    storage: "256GB",
    expandableStorage: "Hasta 1TB microSD",
    camera: {
      main: "50MP f/1.8 Quad Pixel",
      front: "8MP",
      features: [
        "Quad Pixel 4-en-1",
        "IA optimización",
        "Modo retrato AI",
        "Modo noche",
        "HDR",
        "Video 1080p @30fps",
      ],
    },
    battery: {
      capacity: "5200mAh",
      charging: "Cargador estándar incluido",
    },
    connectivity: [
      "4G LTE",
      "Wi-Fi 5 (2.4GHz + 5GHz)",
      "Bluetooth 5.3",
      "NFC para pagos",
      "GPS",
      "USB Type-C",
      "Jack 3.5mm",
    ],
    security: ["Huella lateral"],
    os: "Android 15, MyUX",
    dimensions: "167.3 x 76.4 x 8.2 mm",
    weight: "192g",
    resistance: "IP64 (superior a IP54)",
    updates: "3 años de parches de seguridad",
  },
  colors: [
    { name: "Starry Blue", code: "#4682B4" },
    { name: "Pastel Orange", code: "#FFB347" },
    { name: "Dove Grey", code: "#808080" },
  ],
  features: [
    "Pantalla gigante 6.9\" 120Hz",
    "Batería 5200mAh (2+ días)",
    "256GB almacenamiento",
    "Cargador incluido",
    "RAM expandible hasta 12GB",
    "Cuero vegano premium",
    "IP64 resistente",
    "NFC para pagos",
    "Dolby Atmos estéreo",
    "Android 15 puro",
  ],
  highlights: {
    pros: [
      "Mejor relación precio/valor",
      "Pantalla gigante 6.9\"",
      "Batería ultra duradera (5 años)",
      "Incluye cargador (ahorro $35K)",
      "256GB doble que competencia",
      "Cuero vegano premium",
    ],
    cons: [
      "Solo 4G (no 5G)",
      "Pantalla HD+ (no FHD+)",
      "Solo 4GB RAM física",
      "Procesador gama entrada",
      "Carga estándar (no rápida)",
    ],
  },
  boxContents: {
    included: [
      "Smartphone Motorola Moto G06",
      "Cargador",
      "Cable USB Type-C",
      "Herramienta SIM",
      "Guía rápida",
      "Funda transparente",
    ],
    notIncluded: [
      "Audífonos",
    ],
  },
  promotion: {
    active: false,
    title: "",
    description: "",
    expired: false,
  },
  stock: 30,
  isActive: true,
  isFeatured: true,
  rating: 4.2,
  reviewCount: 0,
}
```

## Example 2: Mid-Range 5G Phone (Motorola Moto G55 5G)

```typescript
{
  sku: "MOT-G55-8-256",
  name: "Motorola Moto G55 5G 256GB | 8GB RAM",
  slug: "motorola-moto-g55-5g-256gb-8gb",
  description: "Todo lo que necesitas, incluido en la caja. Cargador 30W, jack de audio 3.5mm, cámara 50MP con OIS, pantalla FHD+ 120Hz y Android puro. El equilibrio perfecto entre rendimiento y precio.",
  longDescription: `Descubre el Motorola Moto G55 5G, el smartphone que combina lo mejor de Motorola: diseño elegante, rendimiento confiable y precio accesible. Su procesador MediaTek Dimensity 7025 (6nm) con velocidades de hasta 2.5GHz ofrece potencia para gaming y multitarea fluida, respaldado por 8GB de RAM y hasta 256GB de almacenamiento expandible a 1TB.

La pantalla FHD+ de 6.49 pulgadas con 120Hz ofrece imágenes ultrasuaves, protegida por Corning Gorilla Glass 5. El sistema de cámara dual destaca con sensor principal de 50MP con estabilización óptica (OIS) para fotos nítidas y video 4K estable, complementado por ultra gran angular de 8MP. La cámara frontal de 16MP captura selfies de calidad.

Con batería de 5000mAh y carga rápida de 30W (cargador incluido), olvídate de la ansiedad de batería. Disfruta de audio Dolby Atmos con parlantes estéreo, conectividad 5G ultrarrápida, y la comodidad del jack de audio 3.5mm (ausente en muchos competidores).

El diseño premium incluye opciones con cuero vegano en parte posterior, certificación IP54 contra salpicaduras, y lector de huellas lateral. Con Android 14 puro de Motorola, obtén experiencia limpia sin bloatware, con garantía de 3 años de actualizaciones de seguridad.

El Moto G55 5G no es solo un teléfono, es la elección inteligente para quien valora calidad sin pagar flagship.`,
  brand: "Motorola",
  price: 729000,
  compareAtPrice: 729050,
  currency: "COP",
  images: [
    "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
  ],
  specifications: {
    screen: {
      size: "6.49\"",
      type: "IPS LCD",
      resolution: "1080 x 2400 (FHD+)",
      refreshRate: "120Hz",
    },
    processor: "MediaTek Dimensity 7025 (6nm)",
    ram: "8GB LPDDR4X + 8GB virtual",
    storage: "256GB UFS 2.2",
    expandableStorage: "Hasta 1TB microSD (ranura dedicada)",
    camera: {
      main: "50MP f/1.8 OIS PDAF Samsung JN1",
      ultrawide: "8MP f/2.2 118°",
      front: "16MP f/2.4",
      features: [
        "Estabilización óptica (OIS)",
        "Quad Pixel binning",
        "Modo noche Night Vision",
        "HDR10",
        "Portrait mode",
        "Macro vía ultra gran angular",
        "Video 4K @30fps OIS",
        "Slow motion 120fps",
      ],
    },
    battery: {
      capacity: "5000mAh",
      charging: "30W TurboPower incluido",
    },
    connectivity: [
      "5G Sub-6GHz",
      "4G LTE",
      "Wi-Fi 5 (2.4GHz + 5GHz)",
      "Bluetooth 5.3 A2DP LE",
      "NFC pagos contactless",
      "GPS L1+L5, GLONASS, Galileo, BeiDou",
      "USB Type-C 2.0",
      "Jack 3.5mm estéreo",
      "Radio FM",
      "eSIM compatible",
      "Dual Nano-SIM + microSD (3 slots)",
    ],
    security: ["Huella lateral capacitivo", "Desbloqueo facial"],
    os: "Android 14, MyUX",
    dimensions: "161.5 x 73.8 x 8.1 mm",
    weight: "179g",
    resistance: "IP54 (resistente a salpicaduras y polvo)",
    updates: "1 generación Android + 3 años seguridad",
  },
  colors: [
    { name: "Forest Grey", code: "#556B2F" },
    { name: "Twilight Purple", code: "#9370DB" },
    { name: "Smoky Green", code: "#8FBC8F" },
  ],
  features: [
    "Dimensity 7025 5G eficiente",
    "Pantalla 120Hz FHD+",
    "Cámara 50MP con OIS",
    "Cargador 30W incluido",
    "Jack de audio 3.5mm",
    "Dolby Atmos estéreo",
    "Cuero vegano premium",
    "5000mAh batería",
    "Android puro sin bloatware",
    "IP54 resistente",
  ],
  highlights: {
    pros: [
      "Cargador 30W incluido",
      "Jack 3.5mm",
      "Pantalla 120Hz FHD+",
      "RAM expandible hasta 16GB",
      "Triple slot (2 SIM + microSD)",
      "Cámara OIS en gama media",
    ],
    cons: [
      "Solo 1+3 años soporte",
      "Pantalla LCD (no AMOLED)",
      "Sin carga inalámbrica",
      "Peso 179g ligero pero estándar",
      "Carga 30W (vs 45W competencia)",
    ],
  },
  boxContents: {
    included: [
      "Smartphone Motorola Moto G55 5G",
      "Cargador TurboPower 30W",
      "Cable USB Type-C a Type-C",
      "Herramienta de extracción de SIM",
      "Guía de inicio rápido",
      "Información de garantía",
      "Funda protectora transparente",
    ],
    notIncluded: [
      "Audífonos",
    ],
  },
  promotion: {
    active: false,
    title: "",
    description: "",
    expired: false,
  },
  stock: 22,
  isActive: true,
  isFeatured: true,
  rating: 4.5,
  reviewCount: 0,
}
```

## Example 3: Premium Phone with AGOTADO Status (Samsung M55 5G)

```typescript
{
  sku: "SAM-M55-5G-12-256",
  name: "Samsung Galaxy M55 5G 256GB | 12GB RAM",
  slug: "samsung-galaxy-m55-5g-256gb-12gb",
  description: "Potencia de gama alta con conectividad 5G. Pantalla Super AMOLED+ de 6.7\" a 120Hz, procesador Snapdragon 7 Gen 1, cámara triple de 50MP con OIS y carga ultrarrápida de 45W.",
  longDescription: `El Samsung Galaxy M55 5G lleva el rendimiento al siguiente nivel. Con un procesador Snapdragon 7 Gen 1 de Qualcomm y 12GB de RAM, este smartphone está diseñado para gaming intensivo, multitarea extrema y productividad sin límites.

Su espectacular pantalla Super AMOLED+ de 6.7 pulgadas con tasa de refresco de 120Hz ofrece una experiencia visual fluida y vibrante, perfecta para contenido multimedia y gaming. La tecnología Vision Booster asegura visibilidad excepcional incluso bajo la luz solar directa.

Sistema de cámara triple profesional: Cámara principal de 50MP con estabilización óptica (OIS) para fotos nítidas y video estable, ultra gran angular de 8MP para paisajes completos, y sensor macro de 2MP para detalles extremos. La cámara frontal de 50MP es ideal para selfies de alta calidad y videollamadas profesionales.

Con batería de 5000mAh y carga ultrarrápida de 45W, recupera energía en minutos. La conectividad 5G te prepara para el futuro, mientras que 256GB de almacenamiento expandible guarda todo tu contenido sin preocupaciones.

Diseño premium delgado con vidrio Corning Gorilla Glass 5 y marco de aluminio. Samsung Knox protege tus datos con seguridad de nivel defensa. El Galaxy M55 5G es la elección perfecta para quienes buscan especificaciones de flagship sin el precio premium.`,
  brand: "Samsung",
  price: 950000,
  compareAtPrice: null,
  currency: "COP",
  images: [
    "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
  ],
  specifications: {
    screen: {
      size: "6.7\"",
      type: "Super AMOLED+",
      resolution: "1080 x 2400 (FHD+)",
      refreshRate: "120Hz",
    },
    processor: "Qualcomm Snapdragon 7 Gen 1 (4nm)",
    ram: "12GB",
    storage: "256GB",
    expandableStorage: "Hasta 1TB microSD",
    camera: {
      main: "50MP f/1.8 OIS PDAF",
      ultrawide: "8MP f/2.2",
      macro: "2MP f/2.4",
      front: "50MP f/2.2",
      features: [
        "Estabilización óptica (OIS)",
        "HDR10+",
        "Modo noche con IA",
        "Panorama",
        "Video 4K @30fps",
        "Slow motion 240fps",
        "Modo Pro",
      ],
    },
    battery: {
      capacity: "5000mAh",
      charging: "45W Super Fast Charging",
      chargerIncluded: false,
    },
    connectivity: [
      "5G Sub-6GHz",
      "4G LTE",
      "Wi-Fi 6 (802.11ax)",
      "Bluetooth 5.2",
      "NFC",
      "GPS, Glonass, Beidou, Galileo",
      "USB Type-C 2.0",
      "Dual SIM + MicroSD",
    ],
    security: ["Huella en pantalla (óptico)", "Desbloqueo facial", "Samsung Knox"],
    os: "Android 14, One UI 6.1",
    dimensions: "163.9 x 76.5 x 7.8 mm",
    weight: "180g",
    resistance: "Sin certificación IP oficial",
    updates: "4 generaciones Android + 5 años seguridad",
  },
  colors: [
    { name: "Negro", code: "#000000" },
    { name: "Azul", code: "#4169E1" },
    { name: "Verde Menta", code: "#98FF98" },
  ],
  features: [
    "Procesador Snapdragon 7 Gen 1 (4nm)",
    "12GB RAM para multitarea extrema",
    "Pantalla Super AMOLED+ 120Hz",
    "Cámara 50MP con OIS",
    "Cámara frontal 50MP",
    "Carga ultrarrápida 45W",
    "Conectividad 5G",
    "256GB almacenamiento expandible",
    "Diseño premium delgado 7.8mm",
    "Samsung Knox seguridad",
  ],
  highlights: {
    pros: [
      "Procesador Snapdragon potente",
      "12GB RAM (más que gama media)",
      "Pantalla Super AMOLED+ 120Hz premium",
      "Cámara con OIS para fotos estables",
      "Carga ultrarrápida 45W",
      "Conectividad 5G preparada para futuro",
    ],
    cons: [
      "⚠️ AGOTADO - No disponible actualmente",
      "⚠️ Cargador 45W NO incluido",
      "Sin certificación IP",
      "Sin jack 3.5mm",
      "Peso 180g (ligero pero sin ventaja)",
    ],
  },
  boxContents: {
    included: [
      "Smartphone Samsung Galaxy M55 5G",
      "Cable USB Type-C",
      "Herramienta de extracción de SIM",
      "Guía de inicio rápido",
      "Información de garantía",
    ],
    notIncluded: [
      "⚠️ Cargador 45W (debe comprarse por separado)",
      "Audífonos",
      "Funda protectora",
    ],
  },
  promotion: {
    active: false,
    title: "",
    description: "",
    expired: false,
  },
  stock: 0,
  isActive: false,
  isFeatured: false,
  rating: 4.5,
  reviewCount: 0,
}
```

## Key Formatting Rules

### SKU Format
- Pattern: `BRAND-MODEL-RAM-STORAGE`
- Always UPPERCASE
- Use dashes to separate components
- Examples: `MOT-G06-4-256`, `SAM-A16-5G-8-256`, `XIAOMI-14C-8-256`

### Slug Format
- Lowercase version of name
- Replace spaces with hyphens
- Remove special characters
- Example: "Motorola Moto G06 256GB | 4GB RAM" → `motorola-moto-g06-256gb-4gb`

### Prices
- Always numbers (no quotes, no thousand separators)
- In Colombian Pesos (COP)
- `price: 479000` ✅
- `price: "479.000"` ❌
- `compareAtPrice: null` if no comparison price

### Long Description
- Use template literals (backticks)
- Separate paragraphs with blank lines
- Keep it concise but informative (3-5 paragraphs)

### Colors
- Array of objects with `name` and `code`
- Hex codes must start with `#`
- Use proper capitalization for names

### Features Array
- 8-12 key features maximum
- Short, concise statements
- Highlight what makes the product special

### Highlights (Pros/Cons)
- 4-6 pros maximum
- 4-6 cons maximum
- Be honest and specific
- Use ⚠️ emoji for important warnings in cons

### Stock Status
- `stock: 0` + `isActive: false` + `isFeatured: false` = AGOTADO
- `stock: 15-30` + `isActive: true` = Available
- `isFeatured: true` for premium/5G phones, `false` for budget

### Rating
- 4.0-4.3 for budget phones
- 4.3-4.5 for mid-range phones
- 4.5-4.7 for premium phones
- Always set `reviewCount: 0` for new products

## Common Pitfalls to Avoid

1. ❌ Using quotes for numbers: `price: "479000"`
2. ❌ Missing commas between array items
3. ❌ Forgetting to close template literals with backtick
4. ❌ Using lowercase in SKU: `mot-g06-4-256`
5. ❌ Missing required fields (check SKILL.md for complete list)
6. ❌ Inconsistent indentation (use 2 spaces)
7. ❌ Forgetting final comma after object (except last one before `];`)
