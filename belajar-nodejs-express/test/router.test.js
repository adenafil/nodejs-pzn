import express from 'express';
import request from 'supertest';

const app = express();

const router = express.Router();

router.use((request, response, next) => {
    console.log(`Received ${request.originalUrl}`);
    next();
})

router.get('/feature/a', (req, res) => {
    res.send("feature a");
})

test("Test Router Disabled", async () => {
    let response = await request(app).get('/feature/a');
    expect(response.status).toBe(404);

});

test("Test Router Enabled", async () => {
    app.use(router);
    let response = await request(app).get('/feature/a');
    expect(response.text).toBe('feature a');
})