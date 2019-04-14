const winston = require("winston");
const format = winston.format;
const Logger = winston.createLogger({
  level: "debug",
  format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.colorize(),
        format.simple()
      ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "./logs/combined.log" })
  ]
});

if (process.env.NODE_ENV !== "production") {
  Logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = Logger;
