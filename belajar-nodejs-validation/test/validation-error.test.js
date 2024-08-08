import Joi from "joi";

describe("Joi", () => {
    it("should return validation error", () => {
        const usernameSchema = Joi.string().min(5).email().required();

        const result = usernameSchema.validate("ups", {
            abortEarly: false,
        });
        console.info(result);

        if (result.error) {
            result.error.details.forEach(detail => {
                console.info(`${detail.path} = ${detail.message}`);
            })
        }
    })
})