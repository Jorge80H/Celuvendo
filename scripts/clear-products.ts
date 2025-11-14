import { init } from "@instantdb/core";
import schema from "../shared/instant-schema";
import { config } from "dotenv";

config();

const APP_ID = process.env.VITE_INSTANT_APP_ID || "__APP_ID__";

if (APP_ID === "__APP_ID__") {
  console.error("❌ Please set VITE_INSTANT_APP_ID");
  process.exit(1);
}

const db = init({ appId: APP_ID, schema });

async function clearProducts() {
  console.log("🗑️  Clearing all products from InstantDB...\n");

  try {
    // Query all products
    const { data } = await db.query({ products: {} });

    if (!data?.products || data.products.length === 0) {
      console.log("✅ No products found. Database is already clean.");
      return;
    }

    console.log(`Found ${data.products.length} products to delete:\n`);

    // Delete each product
    for (const product of data.products) {
      console.log(`   Deleting: ${product.name} (${product.sku})...`);
      await db.transact([
        db.tx.products[product.id].delete()
      ]);
    }

    console.log(`\n✅ Successfully deleted ${data.products.length} products!`);

  } catch (error) {
    console.error("❌ Error clearing products:", error);
    process.exit(1);
  }
}

clearProducts();
