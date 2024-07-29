import Winston from "winston";


async function callAsync() {
    return Promise.reject("Ups");
}

const logger = Winston.createLogger({
    level: "silly",
    handleExceptions: true,
    handleRejections: true,
    transports: [
        new Winston.transports.File({
            handleExceptions: true,
            handleRejections: true,
            level: "silly",
            filename: "exception.log"
        }),
        new Winston.transports.Console({
            handleExceptions: true,
            handleRejections: true,
        }),
    ]
})


callAsync();