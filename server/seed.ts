import { db } from "./db";
import { products } from "@shared/schema";

const productData = [
  {
    sku: "SAM-S24U-256-BLK",
    name: "Samsung Galaxy S24 Ultra 5G 256GB",
    slug: "samsung-galaxy-s24-ultra-256gb",
    description: "El buque insignia de Samsung con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X de 6.8 pulgadas. Procesador Snapdragon 8 Gen 3 para máximo rendimiento.",
    brand: "Samsung",
    price: "3299000",
    compareAtPrice: "3899000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/samsung-s24-ultra-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.8\"", type: "Dynamic AMOLED 2X", resolution: "1440 x 3120", refreshRate: "120Hz" },
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "200MP", front: "12MP", features: ["Zoom óptico 10x", "Modo nocturno", "8K video"] },
      battery: { capacity: "5000mAh", charging: "45W carga rápida" },
      connectivity: ["5G", "WiFi 7", "Bluetooth 5.3", "NFC"],
      os: "Android 14"
    }),
    features: JSON.stringify(["S Pen incluido", "Resistente al agua IP68", "Carga inalámbrica", "Samsung DeX"]),
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: "4.8",
    reviewCount: 324
  },
  {
    sku: "XIA-RN13P-128-BLU",
    name: "Xiaomi Redmi Note 13 Pro 5G 128GB",
    slug: "xiaomi-redmi-note-13-pro-128gb",
    description: "Excelente relación calidad-precio con cámara de 200MP, pantalla AMOLED de 120Hz y carga rápida de 67W. Ideal para usuarios que buscan rendimiento sin gastar de más.",
    brand: "Xiaomi",
    price: "899000",
    compareAtPrice: "1099000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/xiaomi-note13-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.67\"", type: "AMOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 7s Gen 2",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "200MP", front: "16MP", features: ["OIS", "Modo nocturno mejorado"] },
      battery: { capacity: "5100mAh", charging: "67W carga rápida" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 13 (MIUI 14)"
    }),
    features: JSON.stringify(["Carga súper rápida", "Pantalla curva", "Sensor de huellas en pantalla"]),
    stock: 28,
    isActive: true,
    isFeatured: true,
    rating: "4.6",
    reviewCount: 187
  },
  {
    sku: "MOT-E40N-256-GRY",
    name: "Motorola Edge 40 Neo 256GB",
    slug: "motorola-edge-40-neo-256gb",
    description: "Diseño premium con pantalla pOLED curva de 144Hz, cámara de 50MP con OIS y carga inalámbrica. Android puro sin bloatware para mejor experiencia.",
    brand: "Motorola",
    price: "1199000",
    compareAtPrice: "1399000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/motorola-edge40-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.55\"", type: "pOLED", resolution: "1080 x 2400", refreshRate: "144Hz" },
      processor: "MediaTek Dimensity 7030",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "50MP", front: "32MP", features: ["OIS", "Ultra gran angular"] },
      battery: { capacity: "5000mAh", charging: "68W TurboPower" },
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "NFC"],
      os: "Android 13"
    }),
    features: JSON.stringify(["Carga inalámbrica 15W", "Android puro", "Ready For", "IP68"]),
    stock: 12,
    isActive: true,
    isFeatured: true,
    rating: "4.5",
    reviewCount: 95
  },
  {
    sku: "OPP-R11-256-WHT",
    name: "OPPO Reno 11 5G 256GB",
    slug: "oppo-reno-11-256gb",
    description: "Enfocado en fotografía con cámara frontal de 32MP y sistema trasero de 50MP. Carga rápida de 67W y diseño elegante ultradelgado.",
    brand: "Oppo",
    price: "1599000",
    compareAtPrice: null,
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/oppo-reno11-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.7\"", type: "AMOLED", resolution: "1080 x 2412", refreshRate: "120Hz" },
      processor: "MediaTek Dimensity 7050",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "50MP", front: "32MP", features: ["Ultra estabilización", "Modo retrato AI"] },
      battery: { capacity: "5000mAh", charging: "67W SUPERVOOC" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (ColorOS 14)"
    }),
    features: JSON.stringify(["Cámara selfie excepcional", "Diseño premium", "Carga rápida"]),
    stock: 20,
    isActive: true,
    isFeatured: false,
    rating: "4.7",
    reviewCount: 142
  },
  {
    sku: "INF-N30P-256-BLU",
    name: "Infinix Note 30 Pro 256GB",
    slug: "infinix-note-30-pro-256gb",
    description: "Increíble relación calidad-precio con pantalla AMOLED de 120Hz, cámara de 108MP y batería de 5000mAh. Perfecto para usuarios conscientes del presupuesto.",
    brand: "Infinix",
    price: "699000",
    compareAtPrice: "799000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/infinix-note30-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.78\"", type: "AMOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "MediaTek Helio G99",
      ram: "8GB",
      storage: "256GB",
      camera: { main: "108MP", front: "32MP", features: ["Modo nocturno", "Ultra gran angular"] },
      battery: { capacity: "5000mAh", charging: "68W carga rápida" },
      connectivity: ["4G", "WiFi 5", "Bluetooth 5.0"],
      os: "Android 13 (XOS 13)"
    }),
    features: JSON.stringify(["Mejor precio", "Batería duradera", "Pantalla AMOLED"]),
    stock: 35,
    isActive: true,
    isFeatured: true,
    rating: "4.3",
    reviewCount: 76
  },
  {
    sku: "SAM-A54-128-VIO",
    name: "Samsung Galaxy A54 5G 128GB",
    slug: "samsung-galaxy-a54-128gb",
    description: "Gama media premium de Samsung con pantalla Super AMOLED de 120Hz, cámara estabilizada de 50MP y resistencia al agua. Actualizaciones garantizadas por 4 años.",
    brand: "Samsung",
    price: "1299000",
    compareAtPrice: "1499000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/samsung-a54-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.4\"", type: "Super AMOLED", resolution: "1080 x 2340", refreshRate: "120Hz" },
      processor: "Exynos 1380",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "50MP", front: "32MP", features: ["OIS", "Modo nocturno"] },
      battery: { capacity: "5000mAh", charging: "25W" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (One UI 6)"
    }),
    features: JSON.stringify(["IP67", "4 años de actualizaciones", "Pantalla premium"]),
    stock: 18,
    isActive: true,
    isFeatured: false,
    rating: "4.6",
    reviewCount: 211
  },
  {
    sku: "XIA-13T-256-BLK",
    name: "Xiaomi 13T 256GB",
    slug: "xiaomi-13t-256gb",
    description: "Flagship killer con cámara Leica, procesador MediaTek Dimensity 8200-Ultra y carga ultra rápida de 67W. Pantalla AMOLED de 144Hz para gaming.",
    brand: "Xiaomi",
    price: "1899000",
    compareAtPrice: null,
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/xiaomi-13t-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.67\"", type: "AMOLED", resolution: "1220 x 2712", refreshRate: "144Hz" },
      processor: "MediaTek Dimensity 8200-Ultra",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "50MP Leica", front: "20MP", features: ["Leica optics", "8K video"] },
      battery: { capacity: "5000mAh", charging: "67W" },
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.4", "NFC"],
      os: "Android 14 (HyperOS)"
    }),
    features: JSON.stringify(["Cámara Leica", "Pantalla 144Hz", "Carga rápida 67W"]),
    stock: 9,
    isActive: true,
    isFeatured: false,
    rating: "4.7",
    reviewCount: 158
  },
  {
    sku: "MOT-G84-256-BLU",
    name: "Motorola Moto G84 5G 256GB",
    slug: "motorola-moto-g84-256gb",
    description: "Excelente gama media con pantalla pOLED de 120Hz, sonido estéreo Dolby Atmos y Android limpio. Gran equilibrio entre precio y características.",
    brand: "Motorola",
    price: "999000",
    compareAtPrice: "1149000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/motorola-g84-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.55\"", type: "pOLED", resolution: "1080 x 2400", refreshRate: "120Hz" },
      processor: "Snapdragon 695",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "50MP", front: "16MP", features: ["OIS", "Ultra gran angular"] },
      battery: { capacity: "5000mAh", charging: "33W TurboPower" },
      connectivity: ["5G", "WiFi 5", "Bluetooth 5.1", "NFC"],
      os: "Android 13"
    }),
    features: JSON.stringify(["Dolby Atmos", "Pantalla pOLED", "Android puro"]),
    stock: 22,
    isActive: true,
    isFeatured: false,
    rating: "4.5",
    reviewCount: 103
  },
  {
    sku: "OPP-A78-128-GRN",
    name: "OPPO A78 5G 128GB",
    slug: "oppo-a78-128gb",
    description: "Entrada a 5G accesible con pantalla de 90Hz, batería de 5000mAh y carga rápida. Ideal para quienes dan el salto a la nueva tecnología.",
    brand: "Oppo",
    price: "799000",
    compareAtPrice: "899000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/oppo-a78-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.56\"", type: "IPS LCD", resolution: "720 x 1612", refreshRate: "90Hz" },
      processor: "MediaTek Dimensity 700",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "50MP", front: "8MP", features: ["AI Beauty"] },
      battery: { capacity: "5000mAh", charging: "33W SUPERVOOC" },
      connectivity: ["5G", "WiFi 5", "Bluetooth 5.3"],
      os: "Android 13 (ColorOS 13)"
    }),
    features: JSON.stringify(["5G económico", "Batería grande", "Carga rápida"]),
    stock: 31,
    isActive: true,
    isFeatured: false,
    rating: "4.4",
    reviewCount: 89
  },
  {
    sku: "INF-Z30-256-SLV",
    name: "Infinix Zero 30 5G 256GB",
    slug: "infinix-zero-30-256gb",
    description: "Potente cámara de 108MP con zoom óptico, pantalla AMOLED curva de 144Hz y carga ultra rápida de 68W. Flagship accesible con excelentes características.",
    brand: "Infinix",
    price: "1099000",
    compareAtPrice: null,
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/infinix-zero30-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.78\"", type: "AMOLED", resolution: "1080 x 2400", refreshRate: "144Hz" },
      processor: "MediaTek Dimensity 8020",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "108MP", front: "50MP", features: ["OIS", "Zoom 3x"] },
      battery: { capacity: "5000mAh", charging: "68W" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
      os: "Android 13 (XOS 13)"
    }),
    features: JSON.stringify(["Cámara frontal 50MP", "Pantalla curva 144Hz", "Carga 68W"]),
    stock: 14,
    isActive: true,
    isFeatured: false,
    rating: "4.5",
    reviewCount: 67
  },
  {
    sku: "SAM-M34-128-BLU",
    name: "Samsung Galaxy M34 5G 128GB",
    slug: "samsung-galaxy-m34-128gb",
    description: "Gran batería de 6000mAh con pantalla Super AMOLED de 120Hz. Diseñado para durar todo el día y más. Perfecto para usuarios intensivos.",
    brand: "Samsung",
    price: "899000",
    compareAtPrice: "999000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/samsung-m34-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.5\"", type: "Super AMOLED", resolution: "1080 x 2340", refreshRate: "120Hz" },
      processor: "Exynos 1280",
      ram: "8GB",
      storage: "128GB",
      camera: { main: "50MP", front: "13MP", features: ["Modo nocturno"] },
      battery: { capacity: "6000mAh", charging: "25W" },
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (One UI 6)"
    }),
    features: JSON.stringify(["Batería 6000mAh", "Pantalla AMOLED", "4 años de actualizaciones"]),
    stock: 25,
    isActive: true,
    isFeatured: false,
    rating: "4.4",
    reviewCount: 145
  },
  {
    sku: "XIA-PX6P-256-YLW",
    name: "Xiaomi Poco X6 Pro 5G 256GB",
    slug: "xiaomi-poco-x6-pro-256gb",
    description: "Bestia de rendimiento con Snapdragon 8 Gen 2, pantalla Flow AMOLED de 120Hz y carga ultra rápida de 67W. El mejor gaming en su rango de precio.",
    brand: "Xiaomi",
    price: "1399000",
    compareAtPrice: "1599000",
    currency: "COP",
    images: JSON.stringify(["/api/placeholder/xiaomi-pocox6-1.jpg"]),
    specifications: JSON.stringify({
      screen: { size: "6.67\"", type: "Flow AMOLED", resolution: "1220 x 2712", refreshRate: "120Hz" },
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      camera: { main: "64MP", front: "16MP", features: ["OIS", "8K video"] },
      battery: { capacity: "5000mAh", charging: "67W" },
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "NFC"],
      os: "Android 14 (HyperOS)"
    }),
    features: JSON.stringify(["Snapdragon 8 Gen 2", "Gaming pro", "Pantalla 1.5K"]),
    stock: 16,
    isActive: true,
    isFeatured: true,
    rating: "4.7",
    reviewCount: 198
  }
];

async function seed() {
  console.log("Seeding database with Colombian phone products...");
  
  try {
    for (const product of productData) {
      await db.insert(products).values(product);
      console.log(`✓ Added: ${product.name}`);
    }
    
    console.log("\n✅ Database seeded successfully!");
    console.log(`Total products: ${productData.length}`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().catch(console.error);
