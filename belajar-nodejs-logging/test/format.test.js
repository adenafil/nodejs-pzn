import * as Winston from "winston";

test("Logging with format", () => {
    const logger = Winston.createLogger({
        level: "info",
        format: Winston.format.logstash(),
        "transports": [
            new Winston.transports.Console({})
        ]
    })

    logger.log({
        "level": "info",
        "message": "Hello Debuger",
    })
})

test("Logging with format prinft", () => {
    const logger = Winston.createLogger({
        level: "info",
        format: Winston.format.printf(adeLog => {
            return `${new Date()} : ${adeLog.level.toUpperCase()} : ${adeLog.message}`
        }),
        "transports": [
            new Winston.transports.Console({})
        ]
    })

    logger.info("Logging with format prinft");
    logger.error("Logging with format prinft");
    logger.warn("Logging with format prinft");
})