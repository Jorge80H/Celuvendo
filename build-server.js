import { cpSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create dist/server directory
mkdirSync('./dist/server', { recursive: true });

// Copy server files
cpSync('./server', './dist/server', { recursive: true });

// Copy shared files
cpSync('./shared', './dist/server/shared', { recursive: true });

console.log('✓ Server files copied to dist/server');
