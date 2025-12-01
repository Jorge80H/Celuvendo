import { cpSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create dist directories
mkdirSync('./dist/server', { recursive: true });
mkdirSync('./dist/shared', { recursive: true });
mkdirSync('./dist/functions', { recursive: true });

// Copy ALL server files to dist/server (for imports)
cpSync('./server', './dist/server', { recursive: true });

// Copy shared files to dist/shared (so ../shared/... imports work)
cpSync('./shared', './dist/shared', { recursive: true });

// Copy ONLY netlify.ts to dist/functions (the actual Netlify Function entry point)
cpSync('./server/netlify.ts', './dist/functions/netlify.ts');

console.log('✓ Server files copied to dist/server');
console.log('✓ Shared files copied to dist/shared');
console.log('✓ Netlify function copied to dist/functions');
