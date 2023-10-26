const winston = require('winston');
const expressWinston = require('express-winston');

/* Обработчик запросов к API*/
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
      maxsize: '1000000',
      maxFiles: '5',
    }),
  ],
  format: winston.format.json(),
});

/* Обработчик ошибок, которые возвращает API */
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ //
      filename: 'logs/error.log',
      maxsize: '1000000',
      maxFiles: '5',
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};