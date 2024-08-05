import {prismaClient} from "../src/prisma-client.js";

describe("prisma client", () => {
    it("should be able to create customer", async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: "ade",
                name: "ade",
                email: "ade@example.com",
                phone: "1"
            }
        });

        expect(customer.id).toBe("ade");
        expect(customer.name).toBe("ade");
        expect(customer.email).toBe("ade@example.com");
        expect(customer.phone).toBe("1");
    });

    it("should be able to update customer", async () => {
        const customer = await prismaClient.customer.update({
            data: {
                name: "nafil",
            },
            where: {
                id: "ade"
            }
        });

        expect(customer.id).toBe("ade");
        expect(customer.name).toBe("nafil");
        expect(customer.email).toBe("ade@example.com");
        expect(customer.phone).toBe("1");
    });

    it("should be able to read customer", async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: "ade"
            }
        });

        expect(customer.id).toBe("ade");
        expect(customer.name).toBe("nafil");
        expect(customer.email).toBe("ade@example.com");
        expect(customer.phone).toBe("1");
    });

    it("should be able to delete customer", async () => {
        const customer = await prismaClient.customer.delete({
            where: {
                id: "ade"
            }
        });

        expect(customer.id).toBe("ade");
        expect(customer.name).toBe("nafil");
        expect(customer.email).toBe("ade@example.com");
        expect(customer.phone).toBe("1");
    });

})