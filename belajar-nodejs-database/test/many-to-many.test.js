import {prismaClient} from "../src/prisma-client.js";

describe('prisma client', function () {
    it("should can insert many to many relation", async () => {
        const like = await prismaClient.like.create({
            data: {
                product_id: "P0001",
                customer_id: "nafil",
            },
            include: {
                customer: true,
                product: true
            }
        });

        console.info(like);
    });

    it("should can find one with many to many relation", async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: "ade"
            },
            include: {
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        });

        console.info(JSON.stringify(
            customer,
            null,
            2
        ));
    });

    it("should can find many with many to many relation", async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                likes: {
                    some: {
                        product: {
                            name: {
                                contains: "A"
                            }
                        }
                    }
                }
            },
            include: {
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        });

        console.info(JSON.stringify(
            customers,
            null,
            2
        ));
    });

    it("should can create implicit relation", async () => {
        const customers = await prismaClient.customer.update({
            where: {
                id: "ade"
            },
            data : {
                loves: {
                    connect: [
                        {
                            id: "P0005"
                        },
                        {
                            id: "P0002"
                        }

                    ]
                }
            },
            include: {
                loves: true
            }
        })

        console.info(JSON.stringify(
            customers,
            null,
            2
        ));

    });

    it("should can find many implict relation", async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                loves: {
                    some: {
                        name: {
                            contains: "A"
                        }
                    }
                }
            },
            include: {
                loves: true
            }
        })
        
        console.info(JSON.stringify(
            customers,
            null,
            2
        ));


    })
})