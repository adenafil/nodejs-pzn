import Mustache from 'mustache';

test("Menggunakan Mustache", () => {
    const data = Mustache.render("Hello, {{name}}", {
        name: "Ade"
    })
    expect(data).toEqual("Hello, Ade");
})