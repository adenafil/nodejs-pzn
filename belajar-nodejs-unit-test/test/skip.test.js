test("1", () => console.info("test 1"));
test("5", () => console.info("test 5"));
test("4", () => console.info("test 4"));
test.skip("3", () => console.info("test 3"));
test("2", () => console.info("test 2"));