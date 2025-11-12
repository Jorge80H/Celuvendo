import { init } from "@instantdb/react";
import schema, { type Schema } from "@shared/instant-schema";

// Get the app ID from environment variable
// You'll need to create an app at https://instantdb.com/dash
const APP_ID = import.meta.env.VITE_INSTANT_APP_ID || "7d176ba5-60f3-4385-a6e7-bf8bd7944993";

// Initialize InstantDB with schema
export const db = init<Schema>({ appId: APP_ID, schema });

// Generate unique IDs for new records
export function id() {
  return crypto.randomUUID();
}
