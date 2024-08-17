import * as axios from 'axios';
import * as fs from "node:fs";

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

    httpClient.interceptors.request.use(
        async (config) => {
            console.info(`Send request to ${config.baseURL}${config.url}`);
            return config;
        },
        async (error) => {
            console.error(`Request Error ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous: false
        }
    );

    httpClient.interceptors.response.use(
        async (response) => {
            const fullUrl = response.config.baseURL + response.config.url;
            console.info(`Receive response from ${fullUrl} with body : ${JSON.stringify(response.data)}`);
            return response;
        },
        async (error) => {
            console.error(`Response Error ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous: false
        }
    )


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
    });

    it("should support POST method with JSON request body", async () => {
        const json = {
            username: "ade",
            password: "rahasia"
        }

        const response = await httpClient.post("/", json, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        expect(response.status).toBe(200);
    });

    it("should support POST method with TEXT request body", async () => {
        const text = "Ade Nafil Firmansah";

        const response = await httpClient.post("/", text, {
            headers: {
                "Content-Type": "text/plain",
                "Accept": "text/plain"
            }
        });

        expect(response.status).toBe(200);
    });

    it("should support POST method with FORM request body", async () => {
        const form = {
            username: "ade",
            password: "rahasia"
        };

        const response = await httpClient.post("/", form, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        expect(response.status).toBe(200);
    });

    it("should support POST method with Multipart request body", async () => {
        const form = new FormData();
        form.append("username", "ade");
        form.append("password", "rahasia");

        const data = fs.readFileSync("image.jpeg");
        form.append("file", new Blob(data), "image.jpeg");

        const response = await httpClient.post("/", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        expect(response.status).toBe(200);

    })

})