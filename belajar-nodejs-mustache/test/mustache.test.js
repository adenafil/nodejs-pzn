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

test("Inverted Section", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {})

    console.log(data);

    expect(data).toContain("Hello Guest");
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

test("List", async () => {
    const helloTemplate = await fs.readFile("./templates/hobbies.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {
        hobbies: [
            "Catur", "Programming", "Sejarah"
        ]
    })

    console.log(data);

    expect(data).toContain("Catur");
})

test("List Object", async () => {
    const helloTemplate = await fs.readFile("./templates/students.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(helloTemplate, {
        students: [
            {name: "Ade", value: 100},
            {name: "Nafil", value: 100},
        ]
    })

    console.log(data);

    expect(data).toContain("Ade");
})

test("Functions", async () => {
    const parameter = {
        name: "Ade",
        upper: () => {
            return (text, render) => {
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);

    console.log(data);

    expect(data).toContain("ade".toUpperCase());
})

test("Comment", async () => {
    const helloTemplate = await fs.readFile("./templates/comment.mustache")
        .then((data) => data.toString());
    ;
    const data = Mustache.render(helloTemplate, {
        title: "Ade",
    })

    console.info(data);
    expect(data).toContain("Ade");
    expect(data).not.toContain("komentar");
});

test("Partials", async () => {
    const header = await fs.readFile("./templates/header.mustache")
        .then((data) => data.toString());
    const footer = await fs.readFile("./templates/footer.mustache")
        .then((data) => data.toString());
    const content = await fs.readFile("./templates/content.mustache")
        .then((data) => data.toString());

    const data = Mustache.render(content, {
        title: "Ade",
        content: "Ade",
    }, {
        header: header,
        footer: footer
    })

    console.info(data);
    expect(data).toContain("Ade");
})