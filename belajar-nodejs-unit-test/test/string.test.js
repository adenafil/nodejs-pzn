test("string test", () => {
    const name = "Ade Nafil Firmansah";
    expect(name).toBe("Ade Nafil Firmansah");
    expect(name).toEqual("Ade Nafil Firmansah");
    expect(name).toMatch(/afi/);
});