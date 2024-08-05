import {prismaClient} from "../src/prisma-client.js";

describe("Prisma client", () => {
    it("should be able to query sql", async () => {
        const id = 1;

        const samples = await prismaClient.$queryRaw`select * from sample where id = ${id}`;

        for (const sample of samples) {
            console.info(`Result sample id = ${sample.id} and name = ${sample.name}`);
        }
    })
})