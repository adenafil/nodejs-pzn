import {createTestUser, removeAllTestContact, removeTestUser} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";

describe("POST /api/contacts", function () {
    beforeEach(async function () {
        await createTestUser();
    })

    afterEach(async function () {
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can create new contact", async function () {
        const result = await supertest(web)
            .post('/api/contacts')
            .set("Authorization", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@pzn.com",
                phone: "0809000000"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@pzn.com");
        expect(result.body.data.phone).toBe("0809000000");
    });

    it("should reject if request is invalid", async function () {
        const result = await supertest(web)
            .post('/api/contacts')
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "080943243243432000000"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


})