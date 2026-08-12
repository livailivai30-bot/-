import { mkdir, cp, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
await mkdir('dist', { recursive: true });
if (existsSync('public')) await cp('public', 'dist', { recursive: true });
await writeFile('dist/index.html', '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>HalalLens</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n');
console.log('Static shell written to dist/. Install dependencies to run the full Vite production bundle.');
