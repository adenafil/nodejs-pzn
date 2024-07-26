import {sayHello} from "../src/sayHello.js";

test.concurrent("sayHello success", () => {
    expect(sayHello("Ade")).toBe("Hello Ade");
});

test.concurrent.failing("sayHello success", () => {
    sayHello(null);
});

test.concurrent("sayHello error matcher", () => {
    expect(() => sayHello(null)).toThrow();
});