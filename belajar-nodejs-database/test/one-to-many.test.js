import {prismaClient} from "../src/prisma-client.js";

describe('Prisma Clinet', () => {
    it("shloud can insert and iclude", async () => {
        const comment = await prismaClient.comment.create({
            data: {
                customer_id: "ade",
                title: "Insert Comment",
                description: "Description Comment",
            },
            include: {
                customer: true
            }
        })

        console.info(comment);
    });

    it("shloud can insert and iclude with many data relation", async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: "alex",
                name: "alex",
                email: "alex@example.com",
                phone: "2323",
                comments: {
                    createMany: {
                        data: [
                            {
                                title: "Comment 1",
                                description: "Comment 1",
                            },
                            {
                                title: "Comment 2",
                                description: "Comment 2",
                            }
                        ]
                    }
                }
            },
            include: {
                comments: true
            }
        });

        console.info(customer);
    });

    it("shloud find many with filter relation", async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                comments: {
                    some: {
                        title: {
                            contains: "Comment"
                        }
                    }
                }
            },
            include: {
                comments: true
            }
        })

        console.info(customers);
    })
})