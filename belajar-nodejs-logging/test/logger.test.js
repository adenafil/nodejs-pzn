import * as Winston from "winston";

test("create new logger", () => {
    const logger = Winston.createLogger({})

    logger.log({
        "level": "info",
        "message": "Hello Debuger",
    })
})