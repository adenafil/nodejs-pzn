import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    const type = req.get('Accept');
    res.send('Hello ' + type);
})

test("Test Query Param", async () => {
    const response = await request(app).get('/')
        .set("Accept", "text/plain");
    expect(response.text).toBe('Hello text/plain');
    expect(response.status).toBe(200);
});