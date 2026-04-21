import winston from 'winston';
import path from 'path';
import fs from 'fs';
import config from '../config/environment.js';

const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta, null, 2)}`;
    }
    return msg;
  })
);

const logger = winston.createLogger({
  level: config.logLevel,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log')
    })
  ]
});

export const logRequest = (method, url, headers = {}, body = null) => {
  logger.info('API Request', {
    method,
    url,
    headers,
    body: body ? JSON.stringify(body, null, 2) : 'N/A'
  });
};

export const logResponse = (status, statusText, body = null, responseTime = null) => {
  const logData = {
    status,
    statusText,
    body: body ? JSON.stringify(body, null, 2) : 'N/A'
  };
  
  if (responseTime) {
    logData.responseTime = `${responseTime}ms`;
  }

  if (status >= 200 && status < 300) {
    logger.info('API Response', logData);
  } else if (status >= 400) {
    logger.error('API Response Error', logData);
  } else {
    logger.warn('API Response', logData);
  }
};

export const logError = (error, context = '') => {
  logger.error(`Error ${context}`, {
    message: error.message,
    stack: error.stack
  });
};

export default logger;
