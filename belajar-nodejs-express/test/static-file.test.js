import express from 'express';
import request from 'supertest';

const app = express();
// app.use(express.static(__dirname + '/static'))
app.use("/static", express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.send("Hello World!");
})

test("Test Static File", async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!');
});

test("Test Static File contoh.txt", async () => {
    const response = await request(app).get('/static/contoh.txt');
    expect(response.text).toBe('This is just sample text');
});