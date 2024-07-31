import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello response');
})

test("Test Response", async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello response');
    expect(response.status).toBe(200);
});