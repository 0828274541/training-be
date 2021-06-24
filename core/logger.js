import winston from 'winston';

const logger = new winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.File({ filename: 'logger.log' })
  ]
});

export default logger;
