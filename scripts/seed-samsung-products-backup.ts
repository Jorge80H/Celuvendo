import { id, init } from "@instantdb/core";
import type { Schema } from "../shared/instant-schema";

const APP_ID = "7d176ba5-60f3-4385-a6e7-bf8bd7944993";
const db = init<Schema>({ appId: APP_ID });

const samsungProducts = [
  {
    id: id(),
    sku: "SAM-A06-4-128",
    name: "Samsung Galaxy A06 128GB | 4GB RAM",
    slug: "samsung-galaxy-a06-128gb-4gb",
    description: "Tu compañero ideal para el día a día. Expande tu visión con una gran pantalla de 6.7\" HD+ y captura fotos de nivel profesional con la cámara principal de 50MP. Batería de 5000mAh.",
    longDescription: `El Samsung Galaxy A06 es tu puerta de entrada al ecosistema Samsung con calidad y confiabilidad garantizada. Diseñado para uso diario, este smartphone ofrece todo lo esencial sin compromisos.

Su gran pantalla PLS LCD de 6.7" es ideal para ver contenido multimedia, navegar en redes sociales y disfrutar de tus series favoritas. El rendimiento está a cargo del procesador MediaTek Helio G85, una mejora significativa para juegos casuales y multitarea fluida.

Cámara de 50MP que captura fotos nítidas y detalladas, incluso en condiciones de poca luz. El sistema de cámara dual incluye un sensor de profundidad de 2MP para retratos con efecto bokeh profesional.

La batería de 5000mAh asegura energía para todo el día de uso intenso, compatible con carga rápida de 25W (cargador vendido por separado). Incluye sensor de huella lateral para desbloqueo rápido y seguro, Jack 3.5mm para tus audífonos favoritos, y la seguridad robusta de Samsung Knox Vault.

Con Android 14 y One UI 6.1, obtienes una experiencia de usuario intuitiva y el respaldo de actualizaciones de seguridad regulares de Samsung.`,
    brand: "Samsung",
    price: 550000,
    compareAtPrice: 399050,
    currency: "COP",
    images: [
      "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
    ],
    specifications: {
      screen: {
        size: "6.7\"",
        type: "PLS LCD",
        resolution: "720 x 1600 (HD+)",
        refreshRate: "60Hz",
      },
      processor: "MediaTek Helio G85",
      ram: "4GB",
      storage: "128GB",
      expandableStorage: "Hasta 1TB microSD",
      camera: {
        main: "50MP f/1.8",
        depth: "2MP",
        front: "8MP",
        features: ["HDR", "Panorama", "Modo retrato", "Video HD"],
      },
      battery: {
        capacity: "5000mAh",
        charging: "25W (cargador no incluido)",
      },
      connectivity: ["4G LTE", "Wi-Fi 5", "Bluetooth 5.3", "GPS", "Jack 3.5mm"],
      security: ["Huella lateral", "Desbloqueo facial", "Samsung Knox"],
      os: "Android 14, One UI 6.1",
      dimensions: "164.2 x 77.3 x 8.0 mm",
      weight: "189g",
      resistance: "Sin certificación IP",
      updates: "2 años Android + 4 años seguridad",
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Azul Claro", code: "#87CEEB" },
      { name: "Verde Claro", code: "#90EE90" },
      { name: "Dorado", code: "#FFD700" },
    ],
    features: [
      "Pantalla grande de 6.7\" PLS LCD",
      "Cámara principal de 50MP",
      "Procesador MediaTek Helio G85",
      "Batería de 5000mAh con carga rápida 25W",
      "Sensor de huella lateral",
      "Jack 3.5mm para audífonos",
      "Samsung Knox Vault",
      "One UI 6.1",
      "Almacenamiento expandible hasta 1TB",
      "4 colores disponibles",
    ],
    highlights: {
      pros: [
        "Marca Samsung confiable",
        "Pantalla grande de 6.7\"",
        "Cámara de 50MP",
        "Batería de 5000mAh",
        "Jack 3.5mm",
        "Samsung Knox",
      ],
      cons: [
        "⚠️ Cargador NO incluido",
        "Pantalla HD+ (no FHD+)",
        "60Hz (no 90-120Hz)",
        "Sin NFC",
        "Sin resistencia al agua",
      ],
    },
    boxContents: {
      included: [
        "Teléfono Samsung Galaxy A06",
        "Cable USB Type-C",
        "Herramienta de expulsión SIM",
        "Guía de inicio rápido",
        "Tarjeta de garantía",
      ],
      notIncluded: [
        "⚠️ Cargador de pared",
        "Audífonos",
        "Funda protectora",
      ],
    },
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: id(),
    sku: "SAM-A07-4-128",
    name: "Samsung Galaxy A07 128GB | 4GB RAM",
    slug: "samsung-galaxy-a07-128gb-4gb",
    description: "Un salto en rendimiento y longevidad. Disfruta de una pantalla fluida de 6.7\" a 90Hz, un potente procesador MediaTek G99 y una cámara profesional de 50MP. Con 6 años de actualizaciones.",
    longDescription: `El Samsung Galaxy A07 es una de las opciones más inteligentes del segmento de entrada, combinando características premium con un precio accesible. Este dispositivo representa un upgrade significativo sobre el modelo anterior.

Diseño elegante y delgado: Con solo 7.6mm de grosor, el Galaxy A07 es uno de los smartphones más delgados de su categoría, ofreciendo un manejo cómodo y ergonómico en tres colores modernos.

Su pantalla inmersiva de 6.7" con tasa de refresco de 90Hz ofrece una experiencia visual mucho más fluida que los modelos tradicionales de 60Hz, ideal para desplazarte por redes sociales, ver videos y jugar.

Rendimiento excepcional: El procesador MediaTek Helio G99 fabricado en proceso de 6nm (mejora sobre el G85 del modelo anterior) ofrece un rendimiento superior. Las aplicaciones se inician más rápido, los juegos funcionan con mayor fluidez y puedes realizar multitarea sin interrupciones, todo mientras disfrutas de mayor eficiencia energética.

Cámara profesional de 50MP: Corrigiendo el error del catálogo distribuidor (que indicaba 13MP), el Galaxy A07 cuenta con una cámara principal de 50MP que captura fotos nítidas con colores intensos y detalles precisos, incluso en condiciones de luz desafiantes.

Longevidad incomparable: Samsung promete 6 actualizaciones del sistema operativo y 6 años de actualizaciones de seguridad (hasta agosto 2031), una garantía de futuro inaudita en este rango de precio. Tu inversión estará protegida por años.

Resistencia IP54: Tu teléfono repele el polvo y resiste salpicaduras y rociado de agua en 360°, ideal para uso diario sin preocupaciones.`,
    brand: "Samsung",
    price: 650000,
    compareAtPrice: 529050,
    currency: "COP",
    images: [
      "/assets/generated_images/Samsung_flagship_phone_product_aa170b09.png",
    ],
    specifications: {
      screen: {
        size: "6.7\"",
        type: "PLS LCD",
        resolution: "720 x 1600 (HD+)",
        refreshRate: "90Hz",
      },
      processor: "MediaTek Helio G99",
      ram: "4GB",
      storage: "128GB",
      storageAvailable: "109.5GB",
      expandableStorage: "Hasta 2TB microSD",
      camera: {
        main: "50MP f/1.8",
        depth: "2MP f/2.4",
        front: "8MP f/2.0",
        features: [
          "HDR",
          "Panorama",
          "Modo retrato",
          "Video FHD @30fps",
          "Cámara lenta 120fps",
          "Zoom digital 10x",
        ],
      },
      battery: {
        capacity: "5000mAh",
        charging: "25W (carga completa en 1h 26min)",
        chargerIncluded: false,
      },
      connectivity: [
        "4G LTE",
        "Wi-Fi 5 (2.4GHz + 5GHz)",
        "Bluetooth 5.3",
        "GPS, Glonass, Beidou, Galileo",
        "Jack 3.5mm estéreo",
        "Dual SIM + MicroSD",
      ],
      security: ["Huella lateral", "Desbloqueo facial", "Samsung Knox"],
      os: "Android 15, One UI 7.0",
      dimensions: "167.4 x 77.4 x 7.6 mm",
      weight: "184g",
      resistance: "IP54 (polvo y salpicaduras)",
      updates: "6 años Android + 6 años seguridad (hasta 2031)",
    },
    colors: [
      { name: "Negro", code: "#000000" },
      { name: "Violeta Claro", code: "#DDA0DD" },
      { name: "Verde", code: "#228B22" },
    ],
    features: [
      "Pantalla 90Hz (50% más fluida)",
      "Procesador Helio G99 de 6nm",
      "Cámara principal de 50MP real",
      "Ultra delgado: solo 7.6mm",
      "Resistencia IP54 certificada",
      "6 años de actualizaciones hasta 2031",
      "Batería 5000mAh con carga rápida 25W",
      "One UI 7.0 con Android 15",
      "Dual SIM + MicroSD (3 ranuras)",
      "Jack 3.5mm estéreo",
    ],
    highlights: {
      pros: [
        "6 años de actualizaciones (hasta 2031)",
        "Pantalla fluida 90Hz",
        "Procesador G99 eficiente (6nm)",
        "Diseño ultra delgado (7.6mm)",
        "Resistencia IP54",
        "Cámara 50MP confirmada",
      ],
      cons: [
        "⚠️ Cargador NO incluido",
        "Pantalla HD+ (no FHD+)",
        "Solo 4GB RAM",
        "Sin NFC",
        "Solo 109.5GB disponibles",
      ],
    },
    boxContents: {
      included: [
        "Teléfono Samsung Galaxy A07",
        "Cable USB Type-C",
        "Herramienta de expulsión SIM",
        "Guía de inicio rápido",
        "Tarjeta de garantía",
      ],
      notIncluded: [
        "⚠️ Cargador de pared",
        "Audífonos",
        "Funda protectora",
      ],
    },
    promotion: {
      active: false,
      title: "🎁 Cargador 25W GRATIS",
      description: "Promoción especial en Alkosto (10-16 Nov 2025)",
      expired: true,
    },
    stock: 20,
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

async function seedSamsungProducts() {
  console.log("🌱 Iniciando seed de productos Samsung...");

  try {
    for (const product of samsungProducts) {
      console.log(`📱 Agregando ${product.name}...`);

      await db.transact([
        db.tx.products[product.id].update(product),
      ]);

      console.log(`✅ ${product.name} agregado exitosamente`);
    }

    console.log("\n🎉 Todos los productos Samsung fueron agregados exitosamente!");
    console.log("\nProductos agregados:");
    samsungProducts.forEach((p) => {
      console.log(`- ${p.name} (${p.sku}) - $${p.price.toLocaleString()}`);
    });
  } catch (error) {
    console.error("❌ Error al agregar productos:", error);
    throw error;
  }
}

// Ejecutar el seed
seedSamsungProducts()
  .then(() => {
    console.log("\n✨ Seed completado");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
