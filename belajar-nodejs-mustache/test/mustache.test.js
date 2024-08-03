import Mustache from 'mustache'
import fs from 'fs/promises'

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

test("Mustache File", async () => {
    const helloTemplate = await fs.readFile("./templates/hello.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {
        title: "Ade Nafil F"
    })

    console.log(data);

    expect(data).toContain("Ade");
});

test("Section Not Shown", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {})

    console.log(data);

    expect(data).not.toContain("Ade");
})

test("Section Shown", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "Ade",
        }
    })

    console.log(data);

    expect(data).toContain("Ade");
})

