import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.set({
        'X-Powered-by': "Ade Nafil Firmansah",
        'X-Author': "Ade Nafil Firmansah",
    });
    res.send('Hello World!');
})

test("Test Response Header", async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!');
    expect(response.get('X-Powered-by')).toBe('Ade Nafil Firmansah');
    expect(response.get('X-Author')).toBe('Ade Nafil Firmansah');
});