beforeAll(() => console.info("Before All Outer"));
afterAll(() => console.info("After All Outer"));
beforeEach(() => console.info("Before Each Outer"));
afterEach(() => console.info("After Each Outer"));

test("test outer", () => {
    console.info("Test outer");
})

describe("inner", () => {
    beforeAll(() => console.info("Before All Inner"));
    afterAll(() => console.info("After All Inner"));
    beforeEach(() => console.info("Before Each Inner"));
    afterEach(() => console.info("After Each Inner"));

    test("Test Inner", () => console.info("TestInner"));

});