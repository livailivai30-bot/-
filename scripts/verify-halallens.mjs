import { readFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const required = ['build', 'lint'];
const missing = required.filter((name) => !pkg.scripts?.[name]);
if (missing.length) {
  throw new Error(`Missing npm scripts: ${missing.join(', ')}`);
}
console.log('HalalLens project verification: required npm scripts are present.');
