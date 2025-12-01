import { init } from "@instantdb/react";
import schema, { type Schema } from "@shared/instant-schema";

// Get the app ID from environment variable
// You'll need to create an app at https://instantdb.com/dash
// Set VITE_INSTANT_APP_ID in your .env file
const APP_ID = import.meta.env.VITE_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error(
    "VITE_INSTANT_APP_ID is not set. Please create an app at https://instantdb.com/dash and set VITE_INSTANT_APP_ID in your .env file."
  );
}

// Initialize InstantDB with schema
export const db = init<Schema>({ appId: APP_ID, schema });

// Generate unique IDs for new records
export function id() {
  return crypto.randomUUID();
}
