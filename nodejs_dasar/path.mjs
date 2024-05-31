import path from 'path';

const file = 'c:/nodejs/npx.cmd';

console.info(path.dirname(file));
console.info(path.basename(file));
console.info(path.extname(file));