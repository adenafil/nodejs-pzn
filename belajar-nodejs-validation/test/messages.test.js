import Joi from "joi";

describe("Joi", () => {
    it("should can use custom messages", () => {
        const schema = Joi.string().min(3).max(10).required()
            .messages({
                'string.min': '{{#label}} panjang harus minimal {{#limit}} karakter',
                'string.max': '{{#label}} panjang harus makimal {{#limit}} karakter'
            })
        ;

        const requst = "dfsdfsdfsdfsdfA";

        const result = schema.validate(requst);

        console.info(result);

    });

    it("should can use custome messages in object validation", () => {
        const schema = Joi.object({
            username: Joi.string().required().email().messages({
                "any.required": "Email Harus Diisi",
                "string.email": "Email Harus Valid"
            }),
            password: Joi.string().required().min(6).max(10).messages({
                "any.required": "Password Harus Diisi",
                "string.min": "Password minimal {{#limit}} karakter",
                "string.max": "Password maksimal {{#limit}} karakter"
            })
        });

        const request = {
            username: "ade@nafil.com",
            password: "ade1234"
        }

        const result = schema.validate(request, {
            abortEarly: false,
        })

        console.info(result);
    })
});