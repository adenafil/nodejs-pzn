import {
    createTestAddress,
    createTestContact,
    createTestUser, getTestAddress, getTestContacts,
    removeAllTestAddresses,
    removeAllTestContact,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe("POST /api/contacts/:contactId/addresses", function() {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async function () {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can create new address", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id}/addresses`)
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "indonesia",
                postal_code: "234234"
            });

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");
    });

    it("should reject if address required is invalid", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id}/addresses`)
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "",
                postal_code: ""
            });

        console.log(result.body)

        expect(result.status).toBe(400);
    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id}2/addresses`)
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "",
                postal_code: ""
            });

        console.log(result.body)

        expect(result.status).toBe(404);
    });

})

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async function () {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can get contact", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");

    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}2/addresses/${testAddress.id}`)
            .set("Authorization", "test");

        expect(result.status).toBe(404);

    });

    it("should reject if address is not found", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}2`)
            .set("Authorization", "test");

        expect(result.status).toBe(404);

    });

})

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async function () {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can update address", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web).
        put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set("Authorization", "test")
            .send({
                street: "street",
                city: "city",
                province: "province",
                country: "indonesia",
                postal_code: "1111"
            });


        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testAddress.id);
        expect(result.body.data.street).toBe("street");
        expect(result.body.data.city).toBe("city");
        expect(result.body.data.province).toBe("province");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("1111");
    });

    it("should reject if request is invalid", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web).
        put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set("Authorization", "test")
            .send({
                street: "street",
                city: "city",
                province: "province",
                country: "",
                postal_code: ""
            });


        expect(result.status).toBe(400);
    });

    it("should reject if address is not found", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web).
        put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}1`)
            .set("Authorization", "test")
            .send({
                street: "street",
                city: "city",
                province: "province",
                country: "indonesia",
                postal_code: "1111"
            });

        expect(result.status).toBe(404);
    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContacts();
        const testAddress = await getTestAddress();

        const result = await supertest(web).
        put(`/api/contacts/${testContact.id}1/addresses/${testAddress.id}`)
            .set("Authorization", "test")
            .send({
                street: "street",
                city: "city",
                province: "province",
                country: "indonesia",
                postal_code: "1111"
            });

        expect(result.status).toBe(404);
    });

});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async function () {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can delete contact", async () => {
        const testContact = await getTestContacts();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set("Authorization", "test");


        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testAddress = await getTestAddress();

        expect(testAddress).toBeNull();
    });

    it("should reject if address is not found", async () => {
        const testContact = await getTestContacts();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}1`)
            .set("Authorization", "test");


        expect(result.status).toBe(404);

    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContacts();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}1/addresses/${testAddress.id}`)
            .set("Authorization", "test");


        expect(result.status).toBe(404);

    });

})

describe("GET/api/contacts/:contactId/addresses",() => {
    beforeEach(async function () {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async function () {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can list address", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/addresses")
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContacts();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "1/addresses")
            .set("Authorization", "test");

        expect(result.status).toBe(404);
    });

});