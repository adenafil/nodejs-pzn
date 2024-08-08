import Joi from "joi";

describe("Joi", () => {
    it("Should can validate array", () => {
        const hobbiesSchema = Joi.array().items(
            Joi.string().required().min(3).max(100)
        ).min(1).unique();

        const hobbies = ["chess", "programming", "history", "history"];

        const result = hobbiesSchema.validate(hobbies, {
            abortEarly: false
        });
        console.info(JSON.stringify(result, null, 2));

    });

    it("should can validate array of object", () => {
        const addressSchema = Joi.array().items(
            Joi.object({
                street: Joi.string().required().max(200),
                city: Joi.string().required().max(100),
                country: Joi.string().required().max(100),
                zipcode: Joi.string().required().max(10),
            })
        ).min(1);

        const adresses = [
            {street: "jensud"}
        ];

        const result = addressSchema.validate(adresses, {
            abortEarly: false
        });

        console.info(JSON.stringify(result, null, 2));
    })
})