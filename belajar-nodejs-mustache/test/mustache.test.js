import Mustache from 'mustache';

test("Menggunakan Mustache", () => {
    const data = Mustache.render("Hello, {{name}}", {
        name: "Ade"
    })
    expect(data).toEqual("Hello, Ade");
})

test("Menggunakan Mustache Cache", () => {
    Mustache.parse("Hello, {{name}}");

    const data = Mustache.render("Hello, {{name}}", {
        name: "Ade"
    })
    expect(data).toEqual("Hello, Ade");
})

test("Tags", () => {
    const data = Mustache.render("Hello, {{name}} and hobby is {{{hobby}}}", {
        name: "Ade",
        hobby: "</p>Mengkodong Mengkagtur</p>"
    });
    console.log(data);
    expect(data).toEqual("Hello, Ade and hobby is </p>Mengkodong Mengkagtur</p>");
})

test("Nested Object", () => {
    const data = Mustache.render("Hello, {{person.name}}", {
        person: {
            name: "Ade",
        }
    })
    expect(data).toEqual("Hello, Ade");
})
