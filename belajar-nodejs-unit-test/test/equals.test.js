test("test toBe", () => {
    let name = "Ade";
    let hello = `Hello ${name}`;
    expect(hello).toBe("Hello Ade");
});

test("test toEquals", () => {
   let person = {id: "ade"};
   Object.assign(person, {name: "Ade"})

    expect(person).toEqual({
        id: "ade",
        name: "Ade",
    });

});