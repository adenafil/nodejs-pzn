import * as Winston from "winston";
import winston from "winston";

test("Logging with format combine", () => {
    const logger = Winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.json(),
                winston.format.timestamp(),
            winston.format.ms(),
        ),
        "transports": [
            new Winston.transports.Console({})
        ]
    })

    logger.info("Logging with format prinft");
    logger.error("Logging with format prinft");
    logger.warn("Logging with format prinft");
})