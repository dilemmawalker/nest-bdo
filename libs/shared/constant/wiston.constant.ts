export enum logLevel {
  error = 'error',
  debug = 'debug',
  warn = 'warn',
  info = 'info',
}
import path from 'path';

export const LOG_ERROR_PATH = 'error.log';
export const LOG_INFO_PATH = 'info.log';
export const LOG_DEBUG_PATH = 'debug.log';
export const LOG_WARN_PATH = 'warn.log';

export const LOG_PATH = path.join(__dirname, '../storage/logs/');
