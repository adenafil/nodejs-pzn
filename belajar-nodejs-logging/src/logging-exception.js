import Winston from "winston";

const logger = Winston.createLogger({
    level: "silly",
    handleExceptions: true,
    transports: [
        new Winston.transports.File({
            handleExceptions: true,
            level: "silly",
        filename: "exception.log"
    }),
        new Winston.transports.Console({
            handleExceptions: true,
        }),
    ]
})

hello();