import { init, id } from "@instantdb/core";
import schema from "../shared/instant-schema";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// You need to get your APP_ID from https://instantdb.com/dash
const APP_ID = process.env.VITE_INSTANT_APP_ID || "__APP_ID__";

if (APP_ID === "__APP_ID__") {
  console.error("❌ Please set VITE_INSTANT_APP_ID environment variable");
  console.error("   Get your app ID from https://instantdb.com/dash");
  process.exit(1);
}

const db = init({ appId: APP_ID, schema });

// Productos únicamente de las fichas completadas (11 productos totales)
const products = [
  // Samsung Products (4 productos)
  {
    id: id(),
    sku: "SAM-A06-4-128",
    name: "Samsung Galaxy A06 128GB 4GB RAM",
    slug: "samsung-galaxy-a06-128gb",
    description: "Tu compañero ideal para el día a día. Expande tu visión con una gran pantalla de 6.7\" HD+ y captura fotos de nivel profesional con la cámara principal de 50MP. Batería de 5000mAh.",
    brand: "Samsung",
    price: 550000,
    compareAtPrice: null,
    currency: "COP",
    images: ["/api/placeholder/samsung-a06-1.jpg"],
    specifications: {
      screen: { size: "6.7\"", type: "PLS LCD", resolution: "720 x 1600", refreshRate: "60Hz" },
      processor: "MediaTek Helio G85",
      ram: "4GB",
      storage: "128GB",
      camera: { main: "50MP", front: "8MP", features: ["HDR", "Modo retrato"] },
      battery: { capacity: "5000mAh", charging: "25W compatible" },
      connectivity: ["4G LTE", "WiFi 5", "Bluetooth 5.3"],
      os: "Android 14 (One UI 6.1)"
    },
    features: ["Pantalla 6.7\"", "Cámara 50MP", "Samsung Knox", "Jack 3.5mm"],
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
    name: "Samsung Galaxy A07 128GB 4GB RAM",
    slug: "samsung-galaxy-a07-128gb",
    description: "Eleva tu experiencia con pantalla de 6.7\" a 90Hz, procesador Helio G99, cámara 50MP y batería 5000mAh. Diseño premium con 6 años de actualizaciones garantizadas.",
    brand: "Samsung",
    price: 650000,
    compareAtPrice: null,
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
    features: ["90Hz display", "6 años actualizaciones", "Samsung Knox", "Cámara 50MP"],
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
    name: "Samsung Galaxy A16 5G 256GB 8GB RAM",
    slug: "samsung-galaxy-a16-5g-256gb",
    description: "Conectividad 5G con pantalla Super AMOLED de 6.7\" a 90Hz, Exynos 1330, cámara triple 50MP y batería 5000mAh. 6 años de actualizaciones garantizadas.",
    brand: "Samsung",
    price: 1022050,
    compareAtPrice: null,
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
    features: ["5G connectivity", "Super AMOLED 90Hz", "6 años actualizaciones", "Triple cámara 50MP"],
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
    name: "Samsung Galaxy M55 5G 256GB 8GB RAM",
    slug: "samsung-galaxy-m55-5g-256gb",
    description: "AGOTADO - Flagship killer con Snapdragon 7 Gen 1, pantalla Super AMOLED Plus de 120Hz, cámara triple 50MP con OIS, selfie cam 50MP y carga súper rápida 45W. IP67 resistente al agua.",
    brand: "Samsung",
    price: 950000,
    compareAtPrice: null,
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
    features: ["Selfie cam 50MP", "Carga 45W", "IP67", "Dolby Atmos", "Ultra delgado 7.8mm"],
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
    name: "TECNO Camon 40 256GB 8GB RAM",
    slug: "tecno-camon-40-256gb",
    description: "Cámara profesional 50MP con OIS, pantalla AMOLED de 120Hz, batería 5200mAh con carga rápida 45W. Resistencia IP66 y parlantes estéreo duales.",
    brand: "TECNO",
    price: 889000,
    compareAtPrice: null,
    currency: "COP",
    images: ["/api/placeholder/tecno-camon40-1.jpg"],
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
    features: ["Cámara OIS", "Cargador 45W incluido", "IP66", "Parlantes estéreo", "Panda King Glass"],
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
    name: "TECNO Camon 40 Pro 5G 256GB 8GB RAM",
    slug: "tecno-camon-40-pro-5g-256gb",
    description: "Versión Pro con cámara frontal 50MP PDAF, pantalla AMOLED curva 144Hz, Dimensity 7300 5G, resistencia IP68/IP69, audio Dolby Atmos y Gorilla Glass 7i.",
    brand: "TECNO",
    price: 1599900,
    compareAtPrice: null,
    currency: "COP",
    images: ["/api/placeholder/tecno-camon40pro-1.jpg"],
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
    features: ["Selfie 50MP PDAF", "144Hz líder", "IP68/IP69", "Dolby Atmos", "Gorilla Glass 7i"],
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
    name: "Infinix Note 50S 5G 256GB 8GB RAM",
    slug: "infinix-note-50s-5g-256gb",
    description: "Gaming phone con pantalla AMOLED curva 144Hz, Dimensity 7300 Ultimate, 16GB RAM total (8+8 virtual), cámara 64MP, batería 5200mAh con carga 45W. Audio JBL Dual Stereo y tecnología Scent-Tech aromática.",
    brand: "Infinix",
    price: 599900,
    compareAtPrice: null,
    currency: "COP",
    images: ["/api/placeholder/infinix-note50s-1.jpg"],
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
    features: ["144Hz líder", "JBL Audio", "Scent-Tech", "Gorilla Glass 5", "Cargador 45W incluido"],
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
    name: "Motorola Moto G06 256GB 4GB RAM",
    slug: "motorola-moto-g06-256gb",
    description: "Valor imbatible con pantalla gigante 6.9\" 120Hz, batería 5200mAh ultra duradera, 256GB almacenamiento y cargador incluido. Cuero vegano premium e IP64 resistente.",
    brand: "Motorola",
    price: 479000,
    compareAtPrice: null,
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
    features: ["Pantalla 6.9\" líder", "Cargador incluido", "NFC", "IP64", "Cuero vegano", "Dolby Atmos"],
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
    name: "Motorola Moto G55 5G 256GB 8GB RAM",
    slug: "motorola-moto-g55-5g-256gb",
    description: "El Motorola Moto G55 5G redefine la gama media con Dimensity 7025 5G, pantalla FHD+ de 120Hz, cámara dual 50MP con OIS, batería 5000mAh con carga 30W. Incluye cargador y jack 3.5mm.",
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
    features: ["Cámara OIS", "Cargador 30W incluido", "Jack 3.5mm", "Dolby Atmos", "Cuero vegano"],
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
    name: "OPPO A5 5G 256GB 8GB RAM",
    slug: "oppo-a5-5g-256gb",
    description: "El teléfono más resistente: batería gigante 6000mAh, certificación IP65 + Grado Militar SGS, carga rápida SUPERVOOC 45W, pantalla 120Hz de 1000 nits. Incluye cargador 45W y funda.",
    brand: "OPPO",
    price: 949000,
    compareAtPrice: null,
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
    features: ["Batería 6000mAh líder", "IP65 + Grado Militar", "Cargador 45W incluido", "Funda incluida", "Jack 3.5mm"],
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
    name: "OPPO A60 256GB 8GB RAM",
    slug: "oppo-a60-256gb",
    description: "Rendimiento 4G confiable con Snapdragon 680, parlantes estéreo, carga rápida SUPERVOOC 45W, resistencia IP54 y brillo de 950 nits. Incluye cargador 45W.",
    brand: "OPPO",
    price: 1120000,
    compareAtPrice: null,
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
    features: ["Parlantes estéreo", "Snapdragon 680", "Cargador 45W incluido", "IP54", "Jack 3.5mm"],
    stock: 19,
    isActive: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 42,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

async function seedDatabase() {
  console.log("🌱 Seeding InstantDB with products...");
  console.log("   ONLY products from completed fichas (11 total)\n");

  try {
    // Insert products one by one
    for (const product of products) {
      console.log(`   Adding: ${product.name}...`);

      // Remove null values from product (InstantDB doesn't accept null for optional fields)
      const cleanProduct = Object.fromEntries(
        Object.entries(product).filter(([_, v]) => v !== null)
      );

      await db.transact([
        db.tx.products[product.id].update(cleanProduct)
      ]);
    }

    console.log(`\n✅ Successfully seeded ${products.length} products!`);
    console.log("\n📦 Products added:");
    products.forEach(p => {
      console.log(`   - ${p.name} (${p.brand}) - $${p.price.toLocaleString()} COP`);
    });

    console.log("\n🎉 Database seeded successfully! You can now run 'npm run dev' to see your products.");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    console.error("\nTroubleshooting:");
    console.error("1. Make sure your VITE_INSTANT_APP_ID is correct");
    console.error("2. Check that you created the app at https://instantdb.com/dash");
    console.error("3. Verify your internet connection");
    process.exit(1);
  }
}

seedDatabase();
