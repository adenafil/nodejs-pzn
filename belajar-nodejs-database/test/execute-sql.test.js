import {prismaClient} from "../src/prisma-client.js";

describe("Prisma client", () => {
    it("should be able to execute sql", async () => {
        const id = 1;
        const name = "Ade Firmansah";

        const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES(${id}, ${name});`;
        expect(impacted).toBe(1);
    })
})