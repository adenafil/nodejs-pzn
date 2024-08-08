import Joi from "joi";

describe("Joi", () => {
    it("Should validate object", () => {
        const loginSchema = Joi.object({
            username: Joi.string().email().min(3).max(100).required(),
            password: Joi.string().min(6).max(100).required()
        });

        const request = {
            username: "Ade@pzn.com",
            password: "rahasia"
        };

        const result = loginSchema.validate(request, {
            abortEarly: false,
            allowUnknown: true
        });

        console.info(JSON.stringify(result, null, 2));
    });

    it("should can validate nested objects", () => {
        const createUserSchema = Joi.object({
            id: Joi.string().required().max(100),
            name: Joi.string().required().max(100),
            address: Joi.object({
                street: Joi.string().required().max(200),
                city: Joi.string().required().max(100),
                country: Joi.string().required().max(100),
                zipcode: Joi.string().required().max(10),
            }).required()
        })

        const request = {
            address: {

            }
        };

        const result = createUserSchema.validate(request, {
            abortEarly: false,
        })

        // console.info(JSON.stringify(result, null, 2));

        if (result.error) {
            result.error.details.forEach(value => {
                console.info(`${value.path} = ${value.message}`);
            })

        }
    })
})