import supertest from "supertest";
import {web} from "../src/application/web.js";
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import {logger} from "../src/application/logging.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can register new user", async function () {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async function () {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
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
                username: "test",
                password: "rahasia",
                name: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test"
            });

        expect(result.body.errors).toBe("Username already exists");
        expect(result.status).toBe(400);

    });

})

describe("POST /api/users/login", function () {
    beforeEach(async () => {
        await createTestUser(test);
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it("should can login", async function () {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia",
            })

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it("should reject login if request is invalid", async function () {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: "",
            })

        logger.info(result.body)

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject login if password is wrong", async function () {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "adecapablanca",
            })

        logger.info(result.body)

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject login if username is wrong", async function () {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "adecapablanca",
                password: "adecapablanca",
            })

        logger.info(result.body)

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

});

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser(test);
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it("should can get current user", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

    it("should reject if token is invalid", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "adecapablanca");

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe("PATCH /api/users/current", function () {
    beforeEach(async () => {
        await createTestUser(test);
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it("should can update user", async function () {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", "test")
            .send({
                name: "ade",
                password: "rahasialagi",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("ade");

        const user = await getTestUser();

        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it("should can update user name", async function () {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", "test")
            .send({
                name: "ade",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("ade");

    });

    it("should can update user password", async function () {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", "test")
            .send({
                password: "rahasialagi",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();

        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it("should reject if request is invalid", async function () {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", "salah")
            .send({
            });

        expect(result.status).toBe(401);
    })

});

describe("DELETE /api/users/logout", function () {
    beforeEach(async () => {
        await createTestUser(test);
    })

    afterEach(async () => {
        await removeTestUser();
    })


    it("should can logout", async function () {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it("should reject logout if token  is invalid", async function () {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set("Authorization", "salah");

        expect(result.status).toBe(401);
        expect(result.body.data).toBeUndefined();
    });

});
