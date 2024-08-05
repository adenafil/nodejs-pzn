import {prismaClient} from "../src/prisma-client.js";

describe("prisma client", () => {
    it("should can execute sequential transactions", async () => {
        const [nafil, firmansah] = await prismaClient.$transaction([
            prismaClient.customer.create({
                data: {
                    id: "nafill",
                    email: "nafill@gmail.com",
                    name: 'nafill',
                    phone: "2"
                }
            }),
            prismaClient.customer.create({
                data: {
                    id: "firmansah",
                    email: "firmansah@gmail.com",
                    name: 'firmansah',
                    phone: "3"
                }
            }, {
                timeout: 5
            }),
        ]);

        expect(nafil.phone).toBe("2");
        expect(firmansah.phone).toBe("3");
    });

    it("should can execute interactive transactions", async () => {
        const [nafil, firmansah] = await prismaClient.$transaction(async (prisma) => {
            const nafil = await prisma.customer.create({
                data: {
                    id: "nafill1",
                    email: "nafill1@gmail.com",
                    name: 'nafill1',
                    phone: "21"
                }
            })
            const firmansah = await prisma.customer.create({
                data: {
                    id: "firmansah1",
                    email: "firmansah1@gmail.com",
                    name: 'firmansah1',
                    phone: "31"
                }
            })

            return [nafil, firmansah];
        }, {
            timeout: 5
        });

        expect(nafil.phone).toBe("21");
        expect(firmansah.phone).toBe("31");
    })

});