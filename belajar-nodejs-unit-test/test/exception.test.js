import {callMe, MyException} from "../src/exception.js";

test("exception", () => {
    expect(() => {
        callMe("Ade")
    }).toThrow();
    expect(() => callMe("Ade")).toThrow(MyException);
    expect(() => callMe("Ade")).toThrow("Ups my exception happens");
});

test("exccption not happend", () => {
    expect(callMe("Nafil")).toBe("OK");
});