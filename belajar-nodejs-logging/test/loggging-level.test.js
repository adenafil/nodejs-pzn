import * as Winston from "winston";

test("logging with level", () => {
    const logger = Winston.createLogger({
        level: "warn",
        transports: [new Winston.transports.Console()]
    })

    logger.log({"level":"error", "message":"Error Message"})
    logger.log({"level":"warn", "message":"warn Message"})
    logger.log({"level":"info", "message":"info Message"})
    logger.log({"level":"http", "message":"http Message"})
    logger.log({"level":"verbose", "message":"verbose Message"})
    logger.log({"level":"debug", "message":"debug Message"})
    logger.log({"level":"silly", "message":"silly Message"})
})

test("logging with level and shortcut", () => {
    const logger = Winston.createLogger({
        level: "debug",
        transports: [new Winston.transports.Console()]
    })

    logger.error("Hello Error");
    logger.warn("Hello warn");
    logger.info("Hello info");
    logger.http("Hello http");
    logger.verbose("Hello verbose");
    logger.debug("Hello debug");
    logger.silly("Hello silly");
})