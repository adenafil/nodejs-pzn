import * as Winston from "winston";

test("create new logger with transport", () => {
    const logger = Winston.createLogger({
        "transports": [
            new Winston.transports.Console({})
        ]
    })

    logger.log({
        "level": "info",
        "message": "Hello Debuger",
    })
})