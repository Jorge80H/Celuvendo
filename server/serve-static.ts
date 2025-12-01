import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function serveStatic(app: Express) {
  // In Netlify Functions, we need to use a different approach
  // The static files are in dist/public, relative to the project root
  let distPath: string;

  // Try to use import.meta.dirname if available (Node 20.11+)
  if (typeof import.meta.dirname !== 'undefined') {
    distPath = path.resolve(import.meta.dirname, "public");
  } else if (typeof import.meta.url !== 'undefined') {
    // Fallback for older Node versions or bundled code
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    distPath = path.resolve(__dirname, "public");
  } else {
    // Last resort: assume we're in a Netlify Function context
    // Static files are served by Netlify directly, not by the function
    console.warn("serveStatic called in serverless context - static files served by Netlify");
    return;
  }

  console.log("Attempting to serve static files from:", distPath);

  if (!fs.existsSync(distPath)) {
    console.warn(
      `Could not find the build directory: ${distPath}. In Netlify, static files are served automatically.`
    );
    return;
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
