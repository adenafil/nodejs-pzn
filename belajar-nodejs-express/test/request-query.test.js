import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello ' + req.query.firstName + " " + req.query.lastName);
})

test("Test Query Param", async () => {
    const response = await request(app).get('/').query({firstName: "ade", lastName: "firmansah"});
    expect(response.text).toBe('Hello ade firmansah');
    expect(response.status).toBe(200);
});