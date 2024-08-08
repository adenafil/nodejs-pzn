import Joi from "joi";

describe("Joi", () => {
    it("Should can create custom validation", function () {
        const registerSchema = Joi.object({
            username: Joi.string().required().min(3).max(100).email(),
            password: Joi.string().required().min(6).max(100).custom((value, helpers) => {
                if (value.startsWith("ade")) {
                    return helpers.error("password.wrong");
                }
                return value;
            }).messages({
                "password.wrong": "password can't start with ade",
            }),
            confirmPassword: Joi.string().required().min(6).max(100),
        }).custom((value, helpers) => {
            if (value.password != value.confirmPassword) {
                return helpers.error("register.password.different");
            }
            return value;
        }).messages({
            "register.password.different": "Password and Confirm Password is different",
        });

        const request = {
            username: "ade@nafil.com",
            password: "12345ade",
            confirmPassword: "salah12345"
        };

        const result = registerSchema.validate(request, {
            abortEarly: false
        });

        console.info(JSON.stringify(result, null, 2));
    })
})