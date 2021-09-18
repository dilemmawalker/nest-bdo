import * as winston from "winston";
const path = require("path");
export function wistonConfig(): object {
    return {
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.File({
            dirname: path.join(__dirname, '../storage/logs/'), 
            filename: 'debug.log',
            level: 'debug',
          }),
          new winston.transports.File({
            dirname: path.join(__dirname, '../storage/logs/'),
            filename: 'error.log',
            level: 'error',
          }),
        ],
      }
}