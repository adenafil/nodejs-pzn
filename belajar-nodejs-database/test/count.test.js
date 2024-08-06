import {prismaClient} from "../src/prisma-client.js";

describe("Prisma Client", () => {
    it("should can count", async () => {
        const count = await prismaClient.customer.count({
            where: {
                name: "ade"
            }
        });
        expect(count).toBe(1);
    })
})