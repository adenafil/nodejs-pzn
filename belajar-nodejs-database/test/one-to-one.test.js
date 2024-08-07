import {prismaClient} from "../src/prisma-client.js";

describe("Prisma Client", () => {
    it("shloud can create one to one relation", async () => {
        const walet = await prismaClient.wallet.create({
            data: {
                id: "ade",
                "customer_id": "ade",
                "balance": 1000000
            },
            include: {
                customer: true
            }
        });

        console.info(walet);
    });

    it("shloud can create one to one with relation", async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: "nafil",
                name: "nafil",
                email: "nafil@example.com",
                phone: "1",
                wallet: {
                    create: {
                        id: "nafil",
                        balance: 1_000_000
                    }
                }
            },
            include: {
                wallet: true
            }
        })

        console.info(customer);
    })

    it("shloud be able to find one to one", async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: "ade"
            },
            include: {
                wallet: true
            }
        })

        console.info(customer);
    })

    it("should be able to find one to one by filtering", async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                wallet: {
                    isNot: null
                }
            },
            include: {
                wallet: true
            }
        })

        console.info(customers);
    });
})