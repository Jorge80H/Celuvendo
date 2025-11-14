import { db } from "./instant";

// Helper function to update Infinix product images and colors
export async function updateInfinixProduct() {
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
      return;
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
  }
}

// Make it available in the browser console for debugging
if (typeof window !== 'undefined') {
  (window as any).updateInfinixProduct = updateInfinixProduct;
}
