import {sum} from "../src/sum.js";

// kalau ada code async, maka setup closuer diberi asncy di closurenya
beforeAll(() => {
    console.log("beforeAll");
});

afterAll(() => {
    console.log("afterAll");
});

beforeEach(() => {
   console. info("Before Each");
});

afterEach(() => {
    console.info("After Each");
})

test("first test", () => {
    expect(sum(1, 2)).toBe(3);
    console.info("First test");
});

test("second test", () => {
    expect(sum(1, 2)).toBe(3);
    console.info("Second test");
});