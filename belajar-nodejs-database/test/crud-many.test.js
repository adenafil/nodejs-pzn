import {prismaClient} from "../src/prisma-client.js";

describe("Prisma Client", function() {
    it("should create many records", async function () {
        const {count} = await prismaClient.customer.createMany({
            data: [
                {
                    id: "ade",
                    name: "ade",
                    email: "ade@example.com",
                    phone: "1"
                },
                {
                    id: "budi",
                    name: "budi",
                    email: "budi@example.com",
                    phone: "111"
                }
            ]
        })

        expect(count).toBe(2);
    });


    it("should be able to update many", async function () {
        const {count} = await prismaClient.customer.updateMany({
            data: {
                email: "dirubah@example.com",
            },
            where: {
                id: "firmansah"
            }
        });
        expect(count).toBe(1);

    })

    it("should be able to delete many", async function () {
        const {count} = await prismaClient.customer.deleteMany({
            where: {
                id: "tidak Ada"
            }
        });
        expect(count).toBe(0);

    })


    it("should be able to read many", async function () {
        const customres = await prismaClient.customer.findMany({
        });
        console.info(customres);
        expect(customres.length).toBe(6);

    })

})