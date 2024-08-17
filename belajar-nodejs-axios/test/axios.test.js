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