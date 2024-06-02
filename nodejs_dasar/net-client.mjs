import net from 'net';

const client = net.createConnection({
   'port': 3000,
   'host': 'localhost',
});

// client.addListener
client.on('data', (data) => {
   console.info(`Receive data from server : ${data.toString()}`);
});

setInterval(() => {
    client.write(`Ade\r\n`);
}, 2000);