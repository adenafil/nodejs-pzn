const buffer = Buffer.from('Ade Nafil Firmansah', 'utf-8');

console.info(buffer.toString('base64'));
console.info(buffer.toString('hex'));

const buffer3 = Buffer.from('QWRlIE5hZmlsIEZpcm1hbnNhaA==\n', 'base64url');

console.log(buffer3.toString('utf8'))
console.log(buffer3.toString())