import zlib from 'zlib';
import fs from 'fs';

const source = fs.readFileSync('zlib-compress.mjs.txt');
const result = zlib.unzipSync(source);

console.info(result.toString());