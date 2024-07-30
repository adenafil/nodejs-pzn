import express from 'express';
import request from 'supertest';
import req from "express/lib/request.js";

const app = express();

app.get('/hello/world', (req, res) => {
    res.json({
       path: req.path,
       originalUrl: req.originalUrl,
       hostname: req.hostname,
       protocol: req.protocol,
        secure: req.secure,
    })
});

test("Test Request URL", async () => {
    const response = await request(app).get('/hello/world')
        .query({name: "ade"});

        expect(response.body)
        .toEqual({
           path: "/hello/world",
           originalUrl: "/hello/world?name=ade",
            hostname: "127.0.0.1",
            protocol: "http",
            secure: false,
        });
});