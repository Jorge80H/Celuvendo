import { init } from "@instantdb/core";
import dotenv from "dotenv";

dotenv.config();

const APP_ID = process.env.VITE_INSTANT_APP_ID!;

if (!APP_ID) {
  console.error("❌ VITE_INSTANT_APP_ID not found in .env file");
  process.exit(1);
}

const db = init({ appId: APP_ID });

async function updateInfinixProduct() {
  try {
    console.log("🔍 Finding Infinix product...");

    // Query for the Infinix product
    const { data } = await db.queryOnce({
      products: {
        $: {
          where: {
            slug: "infinix-note-50s-5g-256gb-8gb"
          }
        }
      }
    });

    if (!data?.products || data.products.length === 0) {
      console.error("❌ Infinix product not found");
      process.exit(1);
    }

    const infinixProduct = data.products[0];
    console.log("✅ Found product:", infinixProduct.name);

    // Update with new images and colors
    console.log("🔄 Updating images and colors...");

    await db.transact([
      db.tx.products[infinixProduct.id].update({
        images: [
          "/assets/generated_images/INFINIX_Note_50S_Flyer.webp",
          "/assets/generated_images/INFINIX_Note_50S_negro.webp",
          "/assets/generated_images/INFINIX_Note_50S_azul.webp",
          "/assets/generated_images/INFINIX_Note_50S_gris.webp"
        ],
        colors: [
          { name: "Negro", code: "#000000" },
          { name: "Azul", code: "#4169E1" },
          { name: "Gris", code: "#808080" }
        ]
      })
    ]);

    console.log("✅ Successfully updated Infinix product!");
    console.log("\nNew images:");
    console.log("  - Flyer");
    console.log("  - Negro");
    console.log("  - Azul");
    console.log("  - Gris");

    console.log("\nNew colors:");
    console.log("  - Negro (#000000)");
    console.log("  - Azul (#4169E1)");
    console.log("  - Gris (#808080)");

  } catch (error) {
    console.error("❌ Error updating product:", error);
    process.exit(1);
  }
}

updateInfinixProduct();
