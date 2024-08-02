import express from 'express';
import request from 'supertest';

const app = express();

const errorMiddlware = (err, req, res, next) => {
    res.status(500).send("Terjadi Error : " + err.message);
}

app.get('/', (req, res) => {
    throw new Error("Ups");
})

app.use(errorMiddlware); // tolong paling bawah karena handle error

test("Test Response Error", async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Terjadi Error : Ups');
});
