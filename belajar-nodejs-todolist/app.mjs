import http from 'http';

const server = http.createServer((req, res) => {
    res.write("Todolist API");
    res.end();
})

server.listen(3000);