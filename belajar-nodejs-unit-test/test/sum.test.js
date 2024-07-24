import {sum} from "../src/sum.js";

test("test some function", () => {

    const result = sum(2, 3);

    expect(result).toEqual(5);
})