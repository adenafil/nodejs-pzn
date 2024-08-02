import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    // const name = req.query.name;
    // or
    const name = req.cookies['name'];
    res.send(`Hello ${name}`);
})

app.post('/', (req, res) => {
    const name = req.body.name;
    res.cookie('Login', name, {path: '/'});
    res.send(`Hello ${name}`);
})

test("Test Cookie Read", async () => {
    const response = await request(app).get('/')
        .set("Cookie", "name=ade;author=ade nafil firmansah");
    expect(response.text).toBe('Hello ade');
});

test("Test Cookie Write", async () => {
    const response = await request(app).post('/')
        .send({
            name: "Ade"
        })
    expect(response.text).toBe('Hello Ade');
    expect(response.get('Set-Cookie').toString()).toBe('Login=Ade; Path=/');
});

