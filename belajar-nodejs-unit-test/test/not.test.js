test("string.not", () => {
    const name = "Ade Nafil Firmansah";

    expect(name).not.toEqual("Ade Bayor Firmansah");
    expect(name).not.toBe("Bayor");
    expect(name).not.toMatch(/Bayor Firmansah/);
});

test("", () => {
    const value = 2 + 2; // 4
    // 4 != 10
    expect(value).not.toBe(10);
    expect(value).not.toBeGreaterThan(6);
    expect(value).not.toBeLessThan(2)
});