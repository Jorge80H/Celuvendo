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

const products = [
  {
    id: id(),
    sku: "SAM-S24U-256-BLK",
    name: "Samsung Galaxy S24 Ultra 5G 256GB",
    slug: "samsung-galaxy-s24-ultra-256gb",
    description: "El buque insignia de Samsung con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X de 6.8 pulgadas. Procesador Snapdragon 8 Gen 3 para máximo rendimiento.",
    brand: "Samsung",
    price: 3299000,
    compareAtPrice: 3899000,
    currency: "COP",
    images: ["/api/placeholder/samsung-s24-ultra-1.jpg"],
    specifications: {
      screen: { size: "6.8\"", type: "Dynamic AMOLED 2X", resolution: "1440 x 3120", refreshRate: "120Hz" },
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "200MP", front: "12MP", features: ["Zoom óptico 10x", "Modo nocturno", "8K video"] },
      battery: { capacity: "5000mAh", charging: "45W carga rápida" },
      connectivity: ["5G", "WiFi 7", "Bluetooth 5.3", "NFC"],
      os: "Android 14"
    },
    features: ["S Pen incluido", "Resistente al agua IP68", "Carga inalámbrica", "Samsung DeX"],
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 324,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "XIA-RN13P-128-BLU",
    name: "Xiaomi Redmi Note 13 Pro 5G 128GB",
    slug: "xiaomi-redmi-note-13-pro-128gb",
    description: "Excelente relación calidad-precio con cámara de 200MP, pantalla AMOLED de 120Hz y carga rápida de 67W. Ideal para usuarios que buscan rendimiento sin gastar de más.",
    brand: "Xiaomi",
    price: 899000,
    compareAtPrice: 1099000,
    currency: "COP",
    images: ["/api/placeholder/xiaomi-note13-1.jpg"],
    specifications: {
      screen: { size: "6.67\"", type: "AMOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 7s Gen 2",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "200MP", front: "16MP", features: ["OIS", "Modo nocturno mejorado"] },
      battery: { capacity: "5100mAh", charging: "67W carga rápida" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 13 (MIUI 14)"
    },
    features: ["Carga rápida 67W", "Pantalla AMOLED 120Hz", "Cámara 200MP"],
    stock: 42,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 187,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "MOT-EDGE40-256-GRY",
    name: "Motorola Edge 40 Pro 256GB",
    slug: "motorola-edge-40-pro-256gb",
    description: "Smartphone premium con pantalla pOLED curva de 165Hz, cámara de 50MP y carga turbo de 125W. Android puro sin bloatware.",
    brand: "Motorola",
    price: 2199000,
    compareAtPrice: 2599000,
    currency: "COP",
    images: ["/api/placeholder/moto-edge40-1.jpg"],
    specifications: {
      screen: { size: "6.67\"", type: "pOLED", resolution: "1080 x 2400", refreshRate: "165Hz" },
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "50MP", front: "60MP", features: ["OIS", "Ultra gran angular", "Macro"] },
      battery: { capacity: "4600mAh", charging: "125W TurboPower" },
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "NFC"],
      os: "Android 13"
    },
    features: ["Android puro", "Carga 125W", "Pantalla 165Hz", "Ready For"],
    stock: 28,
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 93,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "OPP-RENO10-256-PRP",
    name: "Oppo Reno 10 Pro+ 5G 256GB",
    slug: "oppo-reno-10-pro-256gb",
    description: "Diseño elegante con cámara periscópica de 64MP, pantalla AMOLED de 120Hz y carga SuperVOOC de 100W. Perfecto para fotografía.",
    brand: "Oppo",
    price: 1899000,
    compareAtPrice: 2299000,
    currency: "COP",
    images: ["/api/placeholder/oppo-reno10-1.jpg"],
    specifications: {
      screen: { size: "6.74\"", type: "AMOLED", resolution: "1240 x 2772", refreshRate: "120Hz" },
      processor: "Snapdragon 8+ Gen 1",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "50MP", front: "32MP", features: ["Periscopio 64MP", "Ultra gran angular", "OIS"] },
      battery: { capacity: "4700mAh", charging: "100W SuperVOOC" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 13 (ColorOS 13.1)"
    },
    features: ["Cámara periscópica", "Carga 100W", "Diseño premium"],
    stock: 19,
    isActive: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 76,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "INF-NOTE30-256-BLK",
    name: "Infinix Note 30 Pro 5G 256GB",
    slug: "infinix-note-30-pro-256gb",
    description: "Excelente opción económica con pantalla AMOLED de 120Hz, cámara de 108MP y batería de 5000mAh. Gran rendimiento por su precio.",
    brand: "Infinix",
    price: 699000,
    compareAtPrice: 899000,
    currency: "COP",
    images: ["/api/placeholder/infinix-note30-1.jpg"],
    specifications: {
      screen: { size: "6.78\"", type: "AMOLED", resolution: "1080 x 2460", refreshRate: "120Hz" },
      processor: "MediaTek Dimensity 8050",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "108MP", front: "32MP", features: ["OIS", "Modo nocturno"] },
      battery: { capacity: "5000mAh", charging: "68W carga rápida" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 13 (XOS 13)"
    },
    features: ["Cámara 108MP", "Batería 5000mAh", "Mejor relación calidad-precio"],
    stock: 56,
    isActive: true,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 142,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "SAM-A54-128-BLU",
    name: "Samsung Galaxy A54 5G 128GB",
    slug: "samsung-galaxy-a54-128gb",
    description: "Gama media de Samsung con cámara de 50MP, pantalla Super AMOLED de 120Hz y resistencia al agua IP67. Ideal para uso diario.",
    brand: "Samsung",
    price: 1299000,
    compareAtPrice: 1599000,
    currency: "COP",
    images: ["/api/placeholder/samsung-a54-1.jpg"],
    specifications: {
      screen: { size: "6.4\"", type: "Super AMOLED", resolution: "1080 x 2340", refreshRate: "120Hz" },
      processor: "Exynos 1380",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "50MP", front: "32MP", features: ["OIS", "Modo nocturno"] },
      battery: { capacity: "5000mAh", charging: "25W carga rápida" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 13 (One UI 5.1)"
    },
    features: ["Resistente al agua IP67", "4 años de actualizaciones", "Samsung Knox"],
    stock: 38,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 256,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "XIA-POCO-X5P-256-YEL",
    name: "Xiaomi POCO X5 Pro 5G 256GB",
    slug: "xiaomi-poco-x5-pro-256gb",
    description: "Rendimiento gaming con Snapdragon 778G, pantalla AMOLED de 120Hz y carga rápida de 67W. Excelente para juegos y multimedia.",
    brand: "Xiaomi",
    price: 1099000,
    compareAtPrice: 1399000,
    currency: "COP",
    images: ["/api/placeholder/poco-x5-1.jpg"],
    specifications: {
      screen: { size: "6.67\"", type: "AMOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 778G",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "108MP", front: "16MP", features: ["Modo nocturno", "Ultra gran angular"] },
      battery: { capacity: "5000mAh", charging: "67W carga rápida" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 12 (MIUI 14)"
    },
    features: ["Rendimiento gaming", "Carga 67W", "Pantalla AMOLED 120Hz"],
    stock: 31,
    isActive: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 168,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "MOT-G84-256-VIO",
    name: "Motorola Moto G84 5G 256GB",
    slug: "motorola-moto-g84-256gb",
    description: "Gama media con pantalla pOLED de 120Hz, cámara de 50MP y sonido estéreo Dolby Atmos. Android casi puro.",
    brand: "Motorola",
    price: 999000,
    compareAtPrice: 1199000,
    currency: "COP",
    images: ["/api/placeholder/moto-g84-1.jpg"],
    specifications: {
      screen: { size: "6.55\"", type: "pOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 695",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP", front: "16MP", features: ["OIS", "Modo nocturno"] },
      battery: { capacity: "5000mAh", charging: "30W TurboPower" },
      connectivity: ["5G", "WiFi 5", "Bluetooth 5.1", "NFC"],
      os: "Android 13"
    },
    features: ["Android puro", "Sonido Dolby Atmos", "Diseño delgado"],
    stock: 24,
    isActive: true,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 112,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

async function seedDatabase() {
  console.log("🌱 Seeding InstantDB with products...");

  try {
    // Insert products one by one
    for (const product of products) {
      console.log(`   Adding: ${product.name}...`);
      await db.transact([
        db.tx.products[product.id].update(product)
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
