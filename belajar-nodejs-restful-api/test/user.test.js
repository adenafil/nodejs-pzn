import supertest from "supertest";
import {web} from "../src/application/web.js";
import {prismaClient} from "../src/application/database.js";

describe("POST /api/users", function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "ade"
            }
        });
    });

    it("should can register new user", async function () {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "ade",
                password: "123456",
                name: "ade"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("ade");
        expect(result.body.data.name).toBe("ade");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async function () {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "dff",
                password: "",
                name: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if username already registered", async function () {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "ade",
                password: "123456",
                name: "ade"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("ade");
        expect(result.body.data.name).toBe("ade");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "ade",
                password: "123456",
                name: "ade"
            });

        expect(result.body.errors).toBe("Username already exists");
        expect(result.status).toBe(400);

    });

})