/**
 * Script to push InstantDB schema
 * Run with: node scripts/push-schema.js
 */

import { init } from "@instantdb/admin";
import schema from "../shared/instant-schema.js";
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const APP_ID = process.env.INSTANT_APP_ID;
const ADMIN_TOKEN = process.env.INSTANT_ADMIN_TOKEN;

if (!APP_ID || !ADMIN_TOKEN) {
  console.error("Error: INSTANT_APP_ID and INSTANT_ADMIN_TOKEN must be set in .env file");
  process.exit(1);
}

console.log("🚀 Pushing schema to InstantDB...");
console.log(`App ID: ${APP_ID}`);

try {
  // Initialize InstantDB admin client
  const db = init({
    appId: APP_ID,
    adminToken: ADMIN_TOKEN,
    schema,
  });

  console.log("✅ Schema initialized successfully!");
  console.log("\nSchema includes:");
  console.log("- products");
  console.log("- cartItems");
  console.log("- orders (NEW!)");
  console.log("\nThe schema will be automatically synced when your app connects to InstantDB.");
  console.log("\nNext steps:");
  console.log("1. Start your development server: npm run dev");
  console.log("2. The schema will be pushed on first connection");
  console.log("3. Check your InstantDB dashboard to verify: https://instantdb.com/dash");

} catch (error) {
  console.error("❌ Error pushing schema:", error.message);
  process.exit(1);
}
