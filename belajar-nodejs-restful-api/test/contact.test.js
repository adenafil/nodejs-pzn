import {
    createManyTestContact,
    createTestContact,
    createTestUser,
    getTestContacts,
    removeAllTestContact,
    removeTestUser
} from "./test-util.js";
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

describe("GET /api/contacts/:contactId", function () {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async function () {
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can get contact", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("Authorization", "test");


        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it("should return 404 if contact id is not found", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + 1)
            .set("Authorization", "test");


        expect(result.status).toBe(404);
    });

})

describe("PUT /api/contacts/:contactId", function () {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async function () {
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can update existing contact", async function () {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set("Authorization", "test")
            .send({
                first_name: "ade",
                last_name: "firmansah",
                email: "ade@pzn.com",
                phone: "1234"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("ade");
        expect(result.body.data.last_name).toBe("firmansah");
        expect(result.body.data.email).toBe("ade@pzn.com");
        expect(result.body.data.phone).toBe("1234");
    });

    it("should reject if request is invalid", async function () {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "firmansah",
                email: "adem",
                phone: "1234"
            });

        expect(result.status).toBe(400);
    });

    it("contact is not found", async function () {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + 1)
            .set("Authorization", "test")
            .send({
                first_name: "ade",
                last_name: "firmansah",
                email: "ade@f.com",
                phone: "1234"
            });

        expect(result.status).toBe(404);
    });

});

describe("DELETE /api/contacts/:contactId", function () {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async function () {
        await removeAllTestContact();
        await removeTestUser();
    })


    it("should can delete contact", async () => {
        let testContact = await getTestContacts();
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContacts();
        expect(testContact).toBeNull();
    });

    it("should reject if contact is not found", async () => {
        let testContact = await getTestContacts();
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id + 1)
            .set("Authorization", "test");

        expect(result.status).toBe(404);
    });

})

describe("GET /api/contacts?=", function () {
    beforeEach(async function () {
        await createTestUser();
        await createManyTestContact()
    })

    afterEach(async function () {
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can without parameters", async () => {
        const result = await supertest(web).get("/api/contacts")
            .set("Authorization", "test");

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it("should can search to page 2", async () => {
        const result = await supertest(web).get("/api/contacts")
            .query({
                page: 2
            })
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it("should can search using name", async () => {
        const result = await supertest(web).get("/api/contacts")
            .query({
                name: "test1"
            })
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it("should can search using email", async () => {
        const result = await supertest(web).get("/api/contacts")
            .query({
                email: "test1"
            })
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it("should can search using phone", async () => {
        const result = await supertest(web).get("/api/contacts")
            .query({
                phone: "0809000001"
            })
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

})