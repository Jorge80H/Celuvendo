import { cpSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create dist directory
mkdirSync('./dist/server', { recursive: true });
mkdirSync('./dist/shared', { recursive: true });

// Copy server files to dist/server
cpSync('./server', './dist/server', { recursive: true });

// Copy shared files to dist/shared (so ../shared/... imports work)
cpSync('./shared', './dist/shared', { recursive: true });

console.log('✓ Server and shared files copied to dist/');
