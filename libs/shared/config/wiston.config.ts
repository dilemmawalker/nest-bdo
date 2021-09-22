import * as winston from 'winston';
import * as path from 'path';

enum logLevel {
  error = 'error',
  debug = 'debug',
  warn = 'warn',
  info = 'info',
}
class WistonConfig {
  level: logLevel;
  filename: string;
  appendPath: string;

  constructor(level: logLevel, filename: string, appendPath = '') {
    this.level = level;
    this.filename = filename;
    this.appendPath = appendPath;
  }
}

export function getMaxLogFileSize(): any {
  const maxLogSize = process.env.MAX_LOG_FILE_SIZE || 1000000000;
  return maxLogSize;
}

export function wistonConfig(): any {
  const wistonMainConfig = [
    new WistonConfig(logLevel.error, 'error.log'),
    new WistonConfig(logLevel.debug, 'debug.log'),
    new WistonConfig(logLevel.info, 'info.log'),
  ];
  return getConfig(wistonMainConfig);
}

function getConfig(wistonConfig: WistonConfig[]): any {
  const transports = [];
  wistonConfig.forEach((element) => {
    transports.push(
      new winston.transports.File({
        dirname: path.join(__dirname, '../storage/logs/' + element.appendPath),
        filename: element.filename,
        level: element.level,
        maxsize: parseInt(getMaxLogFileSize()),
        maxFiles: 1,
      }),
    );
  });
  return {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: transports,
  };
}
