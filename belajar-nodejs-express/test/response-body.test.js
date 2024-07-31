import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.set('content-type', 'text/html');
    res.send('<html><body>Hello World!</body></html>');
})

test("Test Response", async () => {
    const response = await request(app).get('/');
    expect(response.get('content-type')).toContain('text/html; charset=utf-8');
    expect(response.text).toBe('<html><body>Hello World!</body></html>');
    expect(response.status).toBe(200);
});