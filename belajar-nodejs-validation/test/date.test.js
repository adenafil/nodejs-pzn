import Joi from "joi";

describe('Joi', () => {
    it("shloud can validate date", () => {
        const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

        const result =  birthDateSchema.validate("1-1-1987");
        console.info(result);

        const result2 =  birthDateSchema.validate("12-25-1990");
        console.info(result2);

        const result3 =  birthDateSchema.validate("12-25-2027");
        console.info(result3);

    })
})