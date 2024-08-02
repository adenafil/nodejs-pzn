import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser("RAHASIADONG"));
app.use(express.json());

app.get('/', (req, res) => {
    // const name = req.query.name;
    // or
    const name = req.signedCookies['Login'];
    res.send(`Hello ${name}`);
})

app.post('/', (req, res) => {
    const name = req.body.name;
    res.cookie('Login', name, {path: '/', signed: true});
    res.send(`Hello ${name}`);
})

test("Test Cookie Read", async () => {
    const response = await request(app).get('/')
        .set("Cookie", "Login=s%3AAde.2164oYbfkQoTLZQAwPjty8sMdnT8BiFK77gpgaEHem8; Path=/");
    expect(response.text).toBe('Hello Ade');
});

test("Test Cookie Write", async () => {
    const response = await request(app).post('/')
        .send({
            name: "Ade"
        });
    console.log(response.get('Set-Cookie').toString())
    expect(response.text).toBe('Hello Ade');
    expect(response.get('Set-Cookie').toString()).toContain('Ade');
});

