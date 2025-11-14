import { id } from "@/lib/instant";

// Productos únicamente de las fichas completadas (11 productos totales)
export const allProducts = [
  // Samsung Products (4 productos)
  {
    id: id(),
    sku: "SAM-A06-4-128",
    name: "Samsung Galaxy A06 128GB | 4GB RAM",
    slug: "samsung-galaxy-a06-128gb-4gb",
    description: "Tu compañero ideal para el día a día. Expande tu visión con una gran pantalla de 6.7\" HD+ y captura fotos de nivel profesional con la cámara principal de 50MP. Batería de 5000mAh.",
    longDescription: "El Samsung Galaxy A06 es tu puerta de entrada al ecosistema Samsung con calidad y confiabilidad garantizada. Diseñado para uso diario, este smartphone ofrece todo lo esencial sin compromisos. Su gran pantalla PLS LCD de 6.7\" es ideal para ver contenido multimedia, navegar en redes sociales y disfrutar de tus series favoritas.",
    brand: "Samsung",
    price: 550000,
    compareAtPrice: 399050,
    currency: "COP",
    images: ["/api/placeholder/samsung-a06-1.jpg"],
    specifications: {
      screen: { size: "6.7\"", type: "PLS LCD", resolution: "720 x 1600 (HD+)", refreshRate: "60Hz" },
      processor: "MediaTek Helio G85",
      ram: "4GB",
      storage: "128GB",
      camera: { main: "50MP", front: "8MP", features: ["HDR", "Modo retrato"] },
      battery: { capacity: "5000mAh", charging: "25W compatible" },
      connectivity: ["4G LTE", "WiFi 5", "Bluetooth 5.3"],
      os: "Android 14 (One UI 6.1)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul Claro", code: "#87CEEB" }
    ],
    features: ["Pantalla 6.7\" PLS LCD", "Cámara 50MP", "Samsung Knox", "Jack 3.5mm", "Batería 5000mAh"],
    highlights: {
      pros: ["Marca Samsung confiable", "Pantalla grande 6.7\"", "Cámara 50MP", "Jack 3.5mm"],
      cons: ["Cargador NO incluido", "Pantalla HD+ (no FHD+)", "60Hz", "Sin NFC"]
    },
    boxContents: {
      included: ["Teléfono Samsung Galaxy A06", "Cable USB Type-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Cargador", "Audífonos", "Funda"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 30,
    isActive: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 45,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "SAM-A07-4-128",
    name: "Samsung Galaxy A07 128GB | 4GB RAM",
    slug: "samsung-galaxy-a07-128gb-4gb",
    description: "Eleva tu experiencia con pantalla de 6.7\" a 90Hz, procesador Helio G99, cámara 50MP y batería 5000mAh. Diseño premium con 6 años de actualizaciones garantizadas.",
    longDescription: "El Samsung Galaxy A07 mejora la propuesta del A06 con pantalla de 90Hz más fluida, mejor procesador Helio G99 y diseño premium. Incluye 6 años de actualizaciones garantizadas para mayor longevidad.",
    brand: "Samsung",
    price: 650000,
    currency: "COP",
    images: ["/api/placeholder/samsung-a07-1.jpg"],
    specifications: {
      screen: { size: "6.7\"", type: "PLS LCD", resolution: "720 x 1600", refreshRate: "90Hz" },
      processor: "MediaTek Helio G99",
      ram: "4GB",
      storage: "128GB",
      camera: { main: "50MP", front: "8MP", features: ["HDR", "Modo retrato", "Nightography"] },
      battery: { capacity: "5000mAh", charging: "25W compatible" },
      connectivity: ["4G LTE", "WiFi 5", "Bluetooth 5.3"],
      os: "Android 15 (One UI 6.1)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Verde", code: "#90EE90" }
    ],
    features: ["90Hz display", "6 años actualizaciones", "Samsung Knox", "Cámara 50MP", "Helio G99"],
    highlights: {
      pros: ["Pantalla 90Hz", "6 años de soporte", "Mejor procesador", "Samsung Knox"],
      cons: ["Cargador NO incluido", "HD+ resolución", "Sin NFC"]
    },
    boxContents: {
      included: ["Teléfono Samsung Galaxy A07", "Cable USB Type-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Cargador", "Audífonos", "Funda"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 25,
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 38,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "SM-A166M/DS",
    name: "Samsung Galaxy A16 5G 256GB | 8GB RAM",
    slug: "samsung-galaxy-a16-5g-256gb-8gb",
    description: "Conectividad 5G con pantalla Super AMOLED de 6.7\" a 90Hz, Exynos 1330, cámara triple 50MP y batería 5000mAh. 6 años de actualizaciones garantizadas.",
    longDescription: "El Samsung Galaxy A16 5G es la puerta de entrada al 5G de Samsung con pantalla Super AMOLED premium, procesador eficiente y el mejor soporte a largo plazo: 6 años de actualizaciones garantizadas.",
    brand: "Samsung",
    price: 1022050,
    currency: "COP",
    images: ["/api/placeholder/samsung-a16-1.jpg"],
    specifications: {
      screen: { size: "6.7\"", type: "Super AMOLED", resolution: "1080 x 2340", refreshRate: "90Hz" },
      processor: "Exynos 1330",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP", ultrawide: "5MP", macro: "2MP", front: "13MP", features: ["HDR", "Night mode"] },
      battery: { capacity: "5000mAh", charging: "25W compatible" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 15 (One UI 6.1)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul", code: "#4169E1" },
      { name: "Verde", code: "#90EE90" }
    ],
    features: ["5G connectivity", "Super AMOLED 90Hz", "6 años actualizaciones", "Triple cámara 50MP", "NFC"],
    highlights: {
      pros: ["Conectividad 5G", "Super AMOLED premium", "6 años soporte", "NFC incluido", "Triple cámara"],
      cons: ["Cargador NO incluido", "Exynos puede ser menos potente que Snapdragon"]
    },
    boxContents: {
      included: ["Teléfono Samsung Galaxy A16 5G", "Cable USB Type-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Cargador", "Audífonos", "Funda"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 18,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 62,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "SAM-M55-8-256",
    name: "Samsung Galaxy M55 5G 256GB | 8GB RAM",
    slug: "samsung-galaxy-m55-5g-256gb-8gb",
    description: "AGOTADO - Flagship killer con Snapdragon 7 Gen 1, pantalla Super AMOLED Plus de 120Hz, cámara triple 50MP con OIS, selfie cam 50MP y carga súper rápida 45W. IP67 resistente al agua.",
    longDescription: "El Samsung Galaxy M55 5G es un flagship killer que combina rendimiento premium con precio accesible. Destaca por su cámara frontal de 50MP, carga rápida de 45W y certificación IP67. ACTUALMENTE AGOTADO.",
    brand: "Samsung",
    price: 950000,
    currency: "COP",
    images: ["/api/placeholder/samsung-m55-1.jpg"],
    specifications: {
      screen: { size: "6.7\"", type: "Super AMOLED Plus", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 7 Gen 1",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP OIS", ultrawide: "8MP", macro: "2MP", front: "50MP", features: ["OIS", "4K video", "Nightography"] },
      battery: { capacity: "5000mAh", charging: "45W Super Fast Charging" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 14 (One UI 6.0)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Verde Claro", code: "#90EE90" }
    ],
    features: ["Selfie cam 50MP", "Carga 45W", "IP67", "Dolby Atmos", "Ultra delgado 7.8mm", "Snapdragon premium"],
    highlights: {
      pros: ["Selfie 50MP líder", "Carga súper rápida 45W", "IP67 sumergible", "Snapdragon 7 Gen 1", "OIS cámara principal"],
      cons: ["AGOTADO", "Cargador NO incluido"]
    },
    boxContents: {
      included: ["Teléfono Samsung Galaxy M55 5G", "Cable USB Type-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Cargador 45W", "Audífonos", "Funda"]
    },
    promotion: { active: false, title: "⚠️ AGOTADO", description: "Sin stock disponible", expired: true },
    stock: 0,
    isActive: false,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 89,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // TECNO Products (2 productos)
  {
    id: id(),
    sku: "TEC-C40-8-256",
    name: "TECNO Camon 40 256GB | 8GB RAM",
    slug: "tecno-camon-40-256gb-8gb",
    description: "Cámara profesional 50MP con OIS, pantalla AMOLED de 120Hz, batería 5200mAh con carga rápida 45W. Resistencia IP66 y parlantes estéreo duales.",
    longDescription: "El TECNO Camon 40 redefine la fotografía en gama media con cámara de 50MP con estabilización óptica OIS, pantalla AMOLED de 120Hz y batería de larga duración. Incluye cargador de 45W en la caja.",
    brand: "TECNO",
    price: 889000,
    currency: "COP",
    images: [
      "/assets/generated_images/Tecno40flyer.avif",
      "/assets/generated_images/Tecno40negro.webp",
      "/assets/generated_images/Tecno40blanco.webp",
      "/assets/generated_images/Tecno40verde.webp",
    ],
    specifications: {
      screen: { size: "6.78\"", type: "AMOLED", resolution: "1080 x 2436", refreshRate: "120Hz" },
      processor: "MediaTek Helio G100 Ultra",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP OIS", ultrawide: "8MP", front: "32MP", features: ["OIS", "HDR", "Modo nocturno AI"] },
      battery: { capacity: "5200mAh", charging: "45W fast charging" },
      connectivity: ["4G LTE", "WiFi", "Bluetooth", "NFC"],
      os: "Android 15 (HiOS 15)"
    },
    colors: [
      { name: "Blanco Glaciar", code: "#F0F8FF" },
      { name: "Negro Galaxia", code: "#000000" }
    ],
    features: ["Cámara OIS", "Cargador 45W incluido", "IP66", "Parlantes estéreo", "Panda King Glass", "AMOLED 120Hz"],
    highlights: {
      pros: ["Cámara 50MP con OIS", "Cargador 45W INCLUIDO", "Parlantes estéreo", "AMOLED 120Hz", "IP66 resistente"],
      cons: ["Solo 4G (sin 5G)", "Marca menos conocida en Colombia"]
    },
    boxContents: {
      included: ["Teléfono TECNO Camon 40", "Cargador 45W", "Cable USB-C", "Herramienta SIM", "Funda", "Protector pantalla", "Guía rápida"],
      notIncluded: ["Audífonos"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 22,
    isActive: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 56,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "TEC-C40P-8-256",
    name: "TECNO Camon 40 Pro 5G 256GB | 8GB RAM",
    slug: "tecno-camon-40-pro-5g-256gb-8gb",
    description: "Versión Pro con cámara frontal 50MP PDAF, pantalla AMOLED curva 144Hz, Dimensity 7300 5G, resistencia IP68/IP69, audio Dolby Atmos y Gorilla Glass 7i.",
    longDescription: "El TECNO Camon 40 Pro 5G lleva la gama media al siguiente nivel con pantalla curva de 144Hz (la más rápida), cámara frontal de 50MP con PDAF, resistencia IP68/IP69 extrema y conectividad 5G. Incluye cargador de 45W.",
    brand: "TECNO",
    price: 1599900,
    currency: "COP",
    images: [
      "/assets/generated_images/Tecno40PROflyer.avif",
      "/assets/generated_images/Tecno40PROnegro.webp",
      "/assets/generated_images/Tecno40PROblanco.webp",
      "/assets/generated_images/Tecno40PROverde.webp",
    ],
    specifications: {
      screen: { size: "6.78\"", type: "AMOLED curva", resolution: "1080 x 2436", refreshRate: "144Hz" },
      processor: "MediaTek Dimensity 7300",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP OIS", ultrawide: "8MP AF", front: "50MP PDAF", features: ["OIS", "PDAF frontal", "HDR10+"] },
      battery: { capacity: "5200mAh", charging: "45W fast charging" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.4", "NFC"],
      os: "Android 15 (HiOS 15)"
    },
    colors: [
      { name: "Verde Lago Esmeralda", code: "#50C878" },
      { name: "Negro Galaxia", code: "#000000" },
      { name: "Blanco Glaciar", code: "#F0F8FF" }
    ],
    features: ["Selfie 50MP PDAF", "144Hz líder", "IP68/IP69", "Dolby Atmos", "Gorilla Glass 7i", "5G", "Cargador incluido"],
    highlights: {
      pros: ["Pantalla 144Hz más rápida", "Selfie 50MP con PDAF", "Resistencia IP68/IP69 extrema", "Cargador 45W INCLUIDO", "5G", "Gorilla Glass 7i"],
      cons: ["Precio elevado", "Marca menos conocida"]
    },
    boxContents: {
      included: ["Teléfono TECNO Camon 40 Pro 5G", "Cargador 45W", "Cable USB-C", "Herramienta SIM", "Funda", "Protector pantalla", "Guía rápida"],
      notIncluded: ["Audífonos"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 47,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // Infinix Products (1 producto)
  {
    id: id(),
    sku: "INF-NOTE50S-8-256",
    name: "Infinix Note 50S 5G 256GB | 8GB RAM",
    slug: "infinix-note-50s-5g-256gb-8gb",
    description: "Gaming phone con pantalla AMOLED curva 144Hz, Dimensity 7300 Ultimate, 16GB RAM total (8+8 virtual), cámara 64MP, batería 5200mAh con carga 45W. Audio JBL Dual Stereo y tecnología Scent-Tech aromática.",
    longDescription: "El Infinix Note 50S 5G es un gaming phone premium con pantalla AMOLED curva de 144Hz, procesador Dimensity 7300 Ultimate, audio JBL estéreo y la innovadora tecnología Scent-Tech que libera aroma. Incluye cargador de 45W.",
    brand: "Infinix",
    price: 599900,
    currency: "COP",
    images: [
      "/assets/generated_images/INFINIX_Note_50S_Flyer.webp",
      "/assets/generated_images/INFINIX_Note_50S_negro.webp",
      "/assets/generated_images/INFINIX_Note_50S_azul.webp",
      "/assets/generated_images/INFINIX_Note_50S_gris.webp"
    ],
    specifications: {
      screen: { size: "6.78\"", type: "AMOLED 3D Curvo", resolution: "1080 x 2436", refreshRate: "144Hz" },
      processor: "MediaTek Dimensity 7300 Ultimate",
      ram: "16GB (8GB + 8GB virtual)",
      storage: "256GB UFS 3.1",
      camera: { main: "64MP", depth: "2MP", front: "13MP", features: ["Quad Pixel", "Modo noche AI", "4K video"] },
      battery: { capacity: "5200mAh", charging: "45W incluido" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (XOS 14)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul", code: "#4169E1" },
      { name: "Gris", code: "#808080" }
    ],
    features: ["144Hz gaming", "JBL Audio", "Scent-Tech aromático", "Gorilla Glass 5", "Cargador 45W incluido", "16GB RAM total"],
    highlights: {
      pros: ["Mejor valor calidad-precio", "144Hz gaming", "JBL audio", "Scent-Tech único", "Cargador INCLUIDO", "16GB RAM expandible"],
      cons: ["Marca menos conocida", "Cámara 64MP vs 50MP competencia"]
    },
    boxContents: {
      included: ["Teléfono Infinix Note 50S 5G", "Cargador 45W", "Cable USB-C", "Herramienta SIM", "Funda", "Protector pantalla", "Guía rápida"],
      notIncluded: ["Audífonos"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 28,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 71,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // Motorola Products (2 productos)
  {
    id: id(),
    sku: "MOT-G06-4-256",
    name: "Motorola Moto G06 256GB | 4GB RAM",
    slug: "motorola-moto-g06-256gb-4gb",
    description: "Valor imbatible con pantalla gigante 6.9\" 120Hz, batería 5200mAh ultra duradera, 256GB almacenamiento y cargador incluido. Cuero vegano premium e IP64 resistente.",
    longDescription: "El Motorola Moto G06 ofrece el mejor valor con su pantalla gigante de 6.9\", batería masiva de 5200mAh, 256GB de almacenamiento y diseño en cuero vegano. Incluye cargador y ofrece experiencia Android limpia.",
    brand: "Motorola",
    price: 479000,
    currency: "COP",
    images: ["/api/placeholder/motorola-g06-1.jpg"],
    specifications: {
      screen: { size: "6.9\"", type: "IPS LCD", resolution: "720 x 1640", refreshRate: "120Hz" },
      processor: "MediaTek Helio G81 Extreme",
      ram: "4GB (expandible +8GB virtual)",
      storage: "256GB",
      camera: { main: "50MP", front: "8MP", features: ["Quad Pixel", "HDR", "Modo nocturno AI"] },
      battery: { capacity: "5200mAh", charging: "Cargador incluido" },
      connectivity: ["4G LTE", "WiFi", "Bluetooth 5.3", "NFC"],
      os: "Android 15 (MyUX)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul", code: "#4169E1" }
    ],
    features: ["Pantalla 6.9\" líder", "Cargador incluido", "NFC", "IP64", "Cuero vegano", "Dolby Atmos", "256GB storage"],
    highlights: {
      pros: ["Pantalla más grande (6.9\")", "Mejor precio", "Cargador INCLUIDO", "256GB storage", "NFC incluido", "Dolby Atmos"],
      cons: ["Solo 4GB RAM", "Resolución HD+", "Procesador básico"]
    },
    boxContents: {
      included: ["Teléfono Motorola Moto G06", "Cargador", "Cable USB-C", "Herramienta SIM", "Funda", "Guía rápida"],
      notIncluded: ["Audífonos"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 35,
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 91,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "MOT-G55-8-256",
    name: "Motorola Moto G55 5G 256GB | 8GB RAM",
    slug: "motorola-moto-g55-5g-256gb-8gb",
    description: "El Motorola Moto G55 5G redefine la gama media con Dimensity 7025 5G, pantalla FHD+ de 120Hz, cámara dual 50MP con OIS, batería 5000mAh con carga 30W. Incluye cargador y jack 3.5mm.",
    longDescription: "El Motorola Moto G55 5G combina conectividad 5G, pantalla Full HD+ de 120Hz, cámara con OIS y Android limpio. Incluye jack 3.5mm y cargador de 30W en la caja. Diseño premium en cuero vegano.",
    brand: "Motorola",
    price: 729050,
    compareAtPrice: 899900,
    currency: "COP",
    images: ["/api/placeholder/motorola-g55-1.jpg"],
    specifications: {
      screen: { size: "6.49\"", type: "IPS LCD", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "MediaTek Dimensity 7025",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP OIS", ultrawide: "8MP", front: "16MP", features: ["OIS", "Ultra gran angular", "4K video"] },
      battery: { capacity: "5000mAh", charging: "30W TurboPower" },
      connectivity: ["5G", "WiFi 5", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (MyUX)"
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul", code: "#4169E1" }
    ],
    features: ["Cámara OIS", "Cargador 30W incluido", "Jack 3.5mm", "Dolby Atmos", "Cuero vegano", "5G", "FHD+ 120Hz"],
    highlights: {
      pros: ["5G incluido", "OIS cámara principal", "Cargador 30W INCLUIDO", "Jack 3.5mm", "Android limpio", "FHD+ resolución"],
      cons: ["Pantalla IPS LCD (no AMOLED)"]
    },
    boxContents: {
      included: ["Teléfono Motorola Moto G55 5G", "Cargador 30W", "Cable USB-C", "Herramienta SIM", "Funda", "Guía rápida"],
      notIncluded: ["Audífonos"]
    },
    promotion: { active: true, title: "Descuento especial", description: "Ahorra $170.850", expired: false },
    stock: 20,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 73,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // OPPO Products (2 productos)
  {
    id: id(),
    sku: "OPP-A5-8-256",
    name: "OPPO A5 5G 256GB | 8GB RAM",
    slug: "oppo-a5-5g-256gb-8gb",
    description: "El teléfono más resistente: batería gigante 6000mAh, certificación IP65 + Grado Militar SGS, carga rápida SUPERVOOC 45W, pantalla 120Hz de 1000 nits. Incluye cargador 45W y funda.",
    longDescription: "El OPPO A5 5G es el más resistente del catálogo con certificación IP65 + Grado Militar SGS, batería líder de 6000mAh y carga SUPERVOOC de 45W. Diseñado para trabajadores de campo y usuarios extremos. Incluye cargador y funda.",
    brand: "OPPO",
    price: 949000,
    currency: "COP",
    images: ["/api/placeholder/oppo-a5-1.jpg"],
    specifications: {
      screen: { size: "6.67\"", type: "IPS LCD", resolution: "1604 x 720", refreshRate: "120Hz" },
      processor: "MediaTek Dimensity 6300 5G",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP", mono: "2MP", front: "8MP", features: ["PDAF", "HDR", "Modo noche"] },
      battery: { capacity: "6000mAh", charging: "45W SUPERVOOC incluido" },
      connectivity: ["5G", "WiFi 5", "Bluetooth 5.0", "NFC"],
      os: "Android 15 (ColorOS 15)"
    },
    colors: [
      { name: "Verde", code: "#90EE90" },
      { name: "Blanco", code: "#FFFFFF" }
    ],
    features: ["Batería 6000mAh líder", "IP65 + Grado Militar", "Cargador 45W incluido", "Funda incluida", "Jack 3.5mm", "5G", "NFC"],
    highlights: {
      pros: ["Batería más grande (6000mAh)", "IP65 + Militar resistencia", "Cargador 45W INCLUIDO", "Funda INCLUIDA", "5G + NFC", "Brillo 1000 nits"],
      cons: ["Resolución HD+ solamente", "Cámara básica"]
    },
    boxContents: {
      included: ["Teléfono OPPO A5 5G", "Cargador 45W", "Funda protectora", "Cable USB-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Audífonos", "Protector pantalla"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 16,
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 54,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "OPP-A60-8-256",
    name: "OPPO A60 256GB | 8GB RAM",
    slug: "oppo-a60-256gb-8gb",
    description: "Rendimiento 4G confiable con Snapdragon 680, parlantes estéreo, carga rápida SUPERVOOC 45W, resistencia IP54 y brillo de 950 nits. Incluye cargador 45W.",
    longDescription: "El OPPO A60 ofrece rendimiento confiable con procesador Snapdragon 680, parlantes estéreo duales, resistencia IP54 y carga SUPERVOOC de 45W. Ideal para quienes no necesitan 5G pero quieren calidad. Incluye cargador.",
    brand: "OPPO",
    price: 1120000,
    currency: "COP",
    images: ["/api/placeholder/oppo-a60-1.jpg"],
    specifications: {
      screen: { size: "6.67\"", type: "IPS LCD", resolution: "1604 x 720", refreshRate: "60Hz" },
      processor: "Qualcomm Snapdragon 680",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP", depth: "2MP", front: "8MP", features: ["PDAF", "HDR", "Modo retrato"] },
      battery: { capacity: "5000mAh", charging: "45W SUPERVOOC incluido" },
      connectivity: ["4G LTE", "WiFi 5", "Bluetooth 5.0"],
      os: "Android 14 (ColorOS 14)"
    },
    colors: [
      { name: "Azul Ripple", code: "#4169E1" },
      { name: "Púrpura", code: "#9370DB" }
    ],
    features: ["Parlantes estéreo", "Snapdragon 680", "Cargador 45W incluido", "IP54", "Jack 3.5mm", "256GB storage"],
    highlights: {
      pros: ["Parlantes estéreo duales", "Snapdragon confiable", "Cargador 45W INCLUIDO", "IP54 resistente", "256GB storage"],
      cons: ["Solo 4G (sin 5G)", "Sin NFC", "Pantalla 60Hz"]
    },
    boxContents: {
      included: ["Teléfono OPPO A60", "Cargador 45W", "Cable USB-C", "Herramienta SIM", "Guía rápida"],
      notIncluded: ["Funda", "Audífonos", "Protector pantalla"]
    },
    promotion: { active: false, title: "", description: "", expired: false },
    stock: 19,
    isActive: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 42,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

async function seedAllProducts() {
  console.log("🌱 Iniciando seed de TODOS los productos de las fichas...");
  console.log(`   Total: ${allProducts.length} productos\n`);

  try {
    for (const product of allProducts) {
      console.log(`📱 Agregando ${product.name}...`);

      await db.transact([
        db.tx.products[product.id].update(product),
      ]);

      console.log(`✅ ${product.name} agregado exitosamente`);
    }

    console.log("\n🎉 Todos los productos fueron agregados exitosamente!");
    console.log("\n📦 Resumen de productos agregados:");
    console.log(`   - Samsung: 4 productos`);
    console.log(`   - TECNO: 2 productos`);
    console.log(`   - Infinix: 1 producto`);
    console.log(`   - Motorola: 2 productos`);
    console.log(`   - OPPO: 2 productos`);
    console.log(`   TOTAL: ${allProducts.length} productos`);
  } catch (error) {
    console.error("❌ Error al agregar productos:", error);
    throw error;
  }
}

// Ejecutar el seed
seedAllProducts()
  .then(() => {
    console.log("\n✨ Seed completado exitosamente");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
