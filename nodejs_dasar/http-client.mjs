import https from 'https';

const endpoint = "https://belajar-node-js.free.beeceptor.com";
const request = https.request(endpoint, {
    method: "POST",
    headers: {
        contentType: "application/json",
        accept: "application/json",
    }
}, (response) => {
    response.addListener('data', (data) => {
        console.log("Receive data : " + data.toString());
    })
});

const body = JSON.stringify({
   firstName: "John",
   lastName: "Doe",
});
request.write(body);
request.end()

