import * as axios from 'axios';

describe("HTTP Client", () => {
    it("should be supported by axios", async () => {
        const httpClient = axios.create({
            timeout: 5000,
            baseURL: "http://www.programmerzamannow.com/"
        });
        expect(httpClient).toBeDefined();

    })
})

describe("HTTP Method", () => {
    const httpClient = axios.create({
        baseURL: "https://enajdec1qsqs7.x.pipedream.net",
        timeout: 5000,
    })

    it("support GET Method", async () => {
        const response = await httpClient.get("/");
        expect(response.status).toBe(200);
    })

    it("should support GET Method with config", async () => {
         const response = await httpClient.get("/", {
             params: {
                 name: "Ade"
             },
             headers: {
                 "Accept": "application/json"
             }
         });

         expect(response.status).toBe(200);
         expect(response.statusText).toBe("OK");
         expect(response.data.success).toBe(true);
    })
})