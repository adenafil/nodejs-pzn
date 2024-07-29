import * as Winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

test("logging with daily rotate file", () => {
    const logger = Winston.createLogger({
        level: "info",
        "transports": [
            new Winston.transports.Console({}),
            new DailyRotateFile({
                filename: "app-%DATE%.log",
                zippedArchive: true,
                maxSize: "100m",
                maxFiles: '14d',
            }),
        ]
    })

    for (let i = 0; i < 100_000; i++) {
        logger.info("Hello world " + i);
    }
})