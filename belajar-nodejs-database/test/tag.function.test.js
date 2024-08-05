function tagFunction(array, ...args) {
    console.info(array);
    console.info(args);
}

test("tag function", () => {
    const name = "Ade";
    const lastName = "Firmansah"

    tagFunction`Hello ${name} ${lastName}!, How are you?`;
    tagFunction`Bye ${name} ${lastName}!, See you later`;
});

test("tag function sql", () => {
    const name = "Ade";
    const age = 21;

    tagFunction`select * from users where name = ${name} and age = ${age}`;
});