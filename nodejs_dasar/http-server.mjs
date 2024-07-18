import http from 'http';

const server = http.createServer((req, res) => {
    console.log(`Server started: ${req.url}`);
    console.log(`${req.method}`);


    if (req.method === 'POST') {
        req.on('data', (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.write(data);
            res.end();
        })
    } else {
        if (req.url === '/ade') {
            res.write(`Hello ade`);
        } else {
            res.write(`Hello HTTP`);
        }
        res.end();
    }


})

server.listen(3000);