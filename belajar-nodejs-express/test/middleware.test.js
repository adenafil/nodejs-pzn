import express from 'express';
import request from 'supertest';
import {add} from "winston";

const logger = (req, res, next) => {
    console.log(`Receive request : ${req.method} ${req.originalUrl}`);
    next();
}

const addPoweredHeader = (req, res, next) => {
    res.set('X-Powered-By', 'Ade Nafil Firmansah');
    next();
}

const apiKeyMiddleware = (req, res, next) => {
    if (req.query.apiKey) {
        next()
    } else {
        res.status(401).end();
    }
}

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

const app = express();
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);


app.get('/', (req, res) => {
    res.send('Hello response');
})

app.get('/ade', (req, res) => {
    res.send('Hello Ade');
})

app.get('/time', (req, res) => {
    res.send(`Hello, Today is ${req.requestTime}`);
})


test("Test Response Middleware", async () => {
    const response = await request(app).get('/').query({apiKey: 123});
    expect(response.get('X-Powered-By')).toBe('Ade Nafil Firmansah');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello response")
});

test("Test Response Middleware 2", async () => {
    const response = await request(app).get('/ade').query({apiKey: 123});
    expect(response.get('X-Powered-By')).toBe('Ade Nafil Firmansah');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Ade")
});

test("Test Response Middleware Unauthorized", async () => {
    const response = await request(app).get('/ade');
    expect(response.status).toBe(401);
});

test("Test Response Middleware Time", async () => {
    const response = await request(app).get('/time').query({apiKey: 123});
    expect(response.get('X-Powered-By')).toBe('Ade Nafil Firmansah');
    expect(response.status).toBe(200);
    expect(response.text).toContain(`Hello, Today is`);
});
