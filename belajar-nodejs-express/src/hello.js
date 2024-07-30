import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/ade', (req, res) => {
    res.send('Hello ade!');
})


app.get('/query', (req, res) => {
    res.send('Hello ' + req.query.name);
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
});