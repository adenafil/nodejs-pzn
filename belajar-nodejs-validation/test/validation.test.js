import Joi from "joi";

describe("Joi", () => {
    it("should can create schema", function() {
        const schema = Joi.string().min(3).max(100).required();

        const result = schema.validate("ade");
        if (result.error) {
            console.log(result.error);
        }
    })

    it("should can validate basic data type", function() {
        const usernameSchema = Joi.string().email().required();
        const isAdminSchema = Joi.boolean().required();
        const priceSchema = Joi.number().required().min(1000).max(1_000_000);

        const resultUsername = usernameSchema.validate("ade@gmail.com");
        console.info(resultUsername);

        const resultIsAdmin = isAdminSchema.validate("false");
        console.info(resultIsAdmin);
        console.info(typeof resultIsAdmin.value);
        console.info(typeof resultIsAdmin.error);

        const resultPrice = priceSchema.validate(10_000);
        console.info(resultPrice);

    })
})