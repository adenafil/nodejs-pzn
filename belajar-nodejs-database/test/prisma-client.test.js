import {PrismaClient} from "@prisma/client";

describe("PrismaClient", () => {
    it("should be able to connect to database", async () => {
        const prisma = new PrismaClient();
        await prisma.$connect()

        // do something
        await prisma.$disconnect();
    })
})