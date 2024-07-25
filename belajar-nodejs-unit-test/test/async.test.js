import {sayHelloAsync} from "../src/async.js";

test("test async function", async () => {
    const result = await sayHelloAsync("Ade");
    expect(result).toBe("Hello Ade");
});

test("test async matcher", async () => {
    await expect(sayHelloAsync("Ade")).resolves.toBe("Hello Ade");
    await expect(sayHelloAsync()).rejects.toBe("Name is empty");
    await expect(sayHelloAsync()).rejects.not.toBe("Duhgeduhgeduh");
});