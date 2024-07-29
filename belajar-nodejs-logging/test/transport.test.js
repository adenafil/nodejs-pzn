import * as Winston from "winston";
import TransportStream from "winston-transport";
import {info} from "winston";

test("create new logger with transport", () => {
    class MyTransport extends TransportStream {
        constructor(option) {
            super(option);
        }

        log(info, next) {
            console.log(`${new Date()} : ${info.level.toUpperCase()}: ${info.message}`);
            next();
        }


    }

    const logger = Winston.createLogger({
        "level": "silly",
        "transports": [
            new MyTransport({})
        ]
    })

    logger.error("Hello Error");
    logger.warn("Hello warn");
    logger.info("Hello info");
    logger.http("Hello http");
    logger.verbose("Hello verbose");
    logger.debug("Hello debug");
    logger.silly("Hello silly");
})