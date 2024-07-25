import {sum, sumAll} from "../src/sum.js";

test("test some function 1", () => {

    const result = sum(2, 3);

    expect(result).toEqual(5);
})

test("test some function 2", () => {

    const result = sum(2, 3);

    expect(result).toEqual(5);
})

test("test some function 3", () => {

    const result = sum(2, 3);

    expect(result).toEqual(5);
})

test("test sum all", () => {
    const numbers = [1,1 ,1, 1, 1, 1];
    expect(sumAll(numbers)).toBe(6);
})