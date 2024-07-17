import fs from 'fs/promises';

const buffer = await fs.readFile('file-systems.mjs');

console.info(buffer.toString());

await fs.writeFile('temp.txt', 'Hello Ade');