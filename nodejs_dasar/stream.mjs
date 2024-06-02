import fs from 'fs';

const writer = fs.createWriteStream('target.log');

writer.write('Ade\n');
writer.write('Nafil\n');
writer.write('Firmansah\n');
writer.end();

const reader = fs.createReadStream('target.log')
reader.addListener('data', (data) => {
    console.log(data.toString());
})