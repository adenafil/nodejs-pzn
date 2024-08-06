import {prismaClient} from "../src/prisma-client.js";

describe("Prisma Client", () => {
    it("shloud can create and select fields", async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: "JOKO",
                email: "joko@gmail.com",
                phone: "22",
                name: "joko"
            },
            select: {
                id: true,
                name: true
            }
        })

        expect(customer.id).toBe("JOKO");
        expect(customer.name).toBe("joko");
        expect(customer.email).toBeUndefined();
        expect(customer.phone).toBeUndefined();
    });

    it("shloud be able to find many and select fields", async () => {
        const customers = await prismaClient.customer.findMany({
           select: {
                id: true,
                name: true
            }
        })

        for (const customer of customers) {
            expect(customer.id).toBeDefined();
            expect(customer.name).toBeDefined();
            expect(customer.email).toBeUndefined();
            expect(customer.phone).toBeUndefined();

        }

    });

})