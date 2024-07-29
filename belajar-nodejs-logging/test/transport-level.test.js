import * as Winston from "winston";

test("create new logger with transport console and file", () => {
    const logger = Winston.createLogger({
        level: "info",
        "transports": [
            new Winston.transports.Console({}),
            new Winston.transports.File({
                filename: "application.log",
            }),
            new Winston.transports.File({
                level: "error",
                filename: "application-error.log",
            }),
        ]
    })

    logger.info("Hello Info");
    logger.info("Hello Info");
    logger.info("Hello Info");
    logger.info("Hello Info");
    logger.error("Hello Error");
    logger.error("Hello Error");
    logger.error("Hello Error");
})