import { init } from "@instantdb/core";
import type { Schema } from "../shared/instant-schema";

const APP_ID = "7d176ba5-60f3-4385-a6e7-bf8bd7944993";
const db = init<Schema>({ appId: APP_ID });

async function updateTecnoImages() {
  console.log("🖼️  Actualizando imágenes de productos TECNO...\n");

  try {
    // Primero, consultar los productos TECNO existentes
    const { data, error } = await db.query({
      products: {
        $: {
          where: {
            brand: "TECNO"
          }
        }
      }
    });

    if (error) {
      console.error("Error al consultar productos:", error);
      return;
    }

    if (!data || !data.products || data.products.length === 0) {
      console.log("⚠️  No se encontraron productos TECNO en la base de datos");
      console.log("   Por favor, ejecuta el seed completo primero");
      return;
    }

    console.log(`📦 Se encontraron ${data.products.length} productos TECNO\n`);

    // Actualizar cada producto
    for (const product of data.products) {
      let newImages: string[] = [];

      if (product.slug === "tecno-camon-40-256gb-8gb") {
        newImages = [
          "/assets/generated_images/Tecno40flyer.avif",
          "/assets/generated_images/Tecno40negro.webp",
          "/assets/generated_images/Tecno40blanco.webp",
          "/assets/generated_images/Tecno40verde.webp",
        ];
        console.log("📱 Actualizando TECNO Camon 40...");
      } else if (product.slug === "tecno-camon-40-pro-5g-256gb-8gb" || product.slug === "tecno-camon-40-pro-256gb-8gb") {
        newImages = [
          "/assets/generated_images/Tecno40PROflyer.avif",
          "/assets/generated_images/Tecno40PROnegro.webp",
          "/assets/generated_images/Tecno40PROblanco.webp",
          "/assets/generated_images/Tecno40PROverde.webp",
        ];
        console.log("📱 Actualizando TECNO Camon 40 Pro...");
      }

      if (newImages.length > 0) {
        await db.transact([
          db.tx.products[product.id].merge({ images: newImages })
        ]);
        console.log(`   ✅ Imágenes actualizadas: ${newImages.length} archivos\n`);
      }
    }

    console.log("🎉 ¡Actualización completada exitosamente!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

// Ejecutar
updateTecnoImages()
  .then(() => {
    console.log("\n✨ Proceso completado");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
