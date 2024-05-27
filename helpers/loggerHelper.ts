const winston = require("winston");
import path = require("path");

const { format } = require("winston");
const { combine, timestamp, printf } = format;

const logsPath = path.join("..", "..", "Logs");

var options = {
    fileError: {
        filename: path.join(__dirname, logsPath, "Error.log"),
        level: "error",
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5
    },
    fileInfo: {
        filename: path.join(__dirname, logsPath, "Info.log"),
        level: "info",
        maxsize: 1024 * 1024, // 1MB
        maxFiles: 10
    },
    fileDebug: {
        filename: path.join(__dirname, logsPath, "Debug.log"),
        level: "debug",
        maxsize: 1024 * 1024, // 1MB
        maxFiles: 10,

    },
    fileHTTP: {
        filename: path.join(__dirname, logsPath, "http.log"),
        level: "http",
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5
    },
    console: {
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    },
    uncaughtExceptions: {
        filename: path.join(__dirname, logsPath, "Exceptions.log"),
    },
};

const customFormat = printf(({ timestamp, level, message }: { timestamp: string, level: string, message: string }) => {
    let printMsg = `${timestamp} ${level}: ${message}`;
    console.log(printMsg);
    return printMsg;
});



export interface ILogger {
    debug(msg: string): void;
    info(msg: string): void;
    http(msg: string): void;
    error(msg: string): void;
}


const logger: ILogger = winston.createLogger({
    format: combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.File(options.fileDebug),
        new winston.transports.File(options.fileInfo),
    ],
    exceptionHandlers: [
        new winston.transports.File(options.uncaughtExceptions)
    ],
    exitOnError: false
});

module.exports = logger as ILogger;
module.exports.stream = {
    write: function (message: any, encoding: any) {
        logger.http(message);
    }
};