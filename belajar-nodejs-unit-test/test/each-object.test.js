import {sumAll} from "../src/sum.js";

const table = [
    {
        numbers: [0],
        expected: 0
    },
    {
        numbers: [10],
        expected: 10
    },    {
        numbers: [10, 10, 10],
        expected: 30
    },    {
        numbers: [10, 10, 10, 10, 10],
        expected: 50
    },    {
        numbers: [10, 10, 10, 10, 10, 10, 10],
        expected: 70
    },
];

it.each(table)("test sumAll($numbers) should result $expected", ({numbers, expected}) => {
    expect(sumAll(numbers)).toBe(expected);
})
