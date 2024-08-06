import {prismaClient} from "../src/prisma-client.js";

describe("prisma client", () => {
    it("shloud can do paging", async () => {
        const page1 = await prismaClient.customer.findMany({
            skip: 0,
            take: 1
        })
        console.log(page1)
        expect(page1.length).toBe(1);

        const page2 = await prismaClient.customer.findMany({
            skip: 1,
            take: 1
        })

        expect(page2.length).toBe(1);
        console.log(page2);

        const page3 = await prismaClient.customer.findMany({
            skip: 2,
            take: 1
        })

        expect(page3.length).toBe(1);
        console.log(page3)
    })
})