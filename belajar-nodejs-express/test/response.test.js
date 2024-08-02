import express from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressFileUpload());

app.post('/json', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`,
    })
})

app.post('/form', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`,
    })
})

app.post('/file', async (req, res) => {
    const textFile = req.files.article;
    await textFile.mv(__dirname + "/upload/" + textFile.name)

    res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

test("Test Request File Upload", async () => {
    const response = await request(app).post('/file')
        .set({'content-type': 'multipart/form-data'})
        .field("name", "ade")
        .attach("article", __dirname + "/contoh.txt")
    ;
    expect(response.text).toBe('Hello ade, you uploaded contoh.txt');
});


test("Test Request JSON", async () => {
    const response = await request(app).post('/json')
        .set({'content-type': 'application/json'})
        .send({name: "world"})
    ;
    expect(response.body).toEqual({
        hello: `Hello world`,
    });
});

test("Test Request Form", async () => {
    const response = await request(app).post('/form')
        .set({'content-type': 'application/x-www-form-urlencoded'})
        .send("name=world")
    ;
    expect(response.body).toEqual({
        hello: `Hello world`,
    });
});