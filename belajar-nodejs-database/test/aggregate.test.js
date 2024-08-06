import {prismaClient} from "../src/prisma-client.js";

describe("prisma client", () => {
    it("shloud can do aggregate function", async () => {
        const results = await prismaClient.product.aggregate({
            _min:{
                price:true,
                stock: true
            },
            _max:{
                price:true,
                stock: true
            },
            _avg:{
                price:true,
                stock: true
            },
        });

        console.info(results);
    });

    it("shloud can do aggregate function with group by", async () => {
        const results = await prismaClient.product.groupBy({
            by: ["category"],
            _min:{
                price:true,
                stock: true
            },
            _max:{
                price:true,
                stock: true
            },
            _avg:{
                price:true,
                stock: true
            },
        });

        console.info(results);
    });

    it("shloud can do aggregate function with group by and having", async () => {
        const results = await prismaClient.product.groupBy({
            by: ["category"],
            _min:{
                price:true,
                stock: true
            },
            _max:{
                price:true,
                stock: true
            },
            _avg:{
                price:true,
                stock: true
            },
            having: {
                price: {
                    _avg: {
                        gte: 2000
                    }
                }
            }
        });

        console.info(results);
    });

})