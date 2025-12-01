import { init } from "@instantdb/admin";
import "dotenv/config";

const adminDb = init({
  appId: process.env.VITE_INSTANT_APP_ID || "7d176ba5-60f3-4385-a6e7-bf8bd7944993",
  adminToken: process.env.INSTANT_APP_ADMIN_TOKEN || "",
});

async function queryProducts() {
  try {
    const result = await adminDb.query({
      products: {},
    });

    console.log("=== PRODUCTS IN DATABASE ===");
    console.log("Total products:", result.products?.length || 0);

    if (result.products && result.products.length > 0) {
      console.log("\nProducts:");
      result.products.forEach((p: any) => {
        console.log(`- ${p.name} (${p.brand}) - ${p.price} - Stock: ${p.stock} - Active: ${p.isActive}`);
        if (p.colors) {
          console.log(`  Colors:`, p.colors);
        }
      });
    } else {
      console.log("\n❌ NO PRODUCTS FOUND IN DATABASE");
      console.log("You need to add products to InstantDB");
    }
  } catch (error) {
    console.error("Error querying products:", error);
  }
}

queryProducts();
