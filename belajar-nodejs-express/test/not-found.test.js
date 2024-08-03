import express from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})


test("test response not found", async () => {
    const response = await request(app).get('/halaman-tidak ada');
    expect(response.text).toBe('404 Not Found');
})

test("test response", async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!');
})



