require('dotenv').config();

const rateLimit = require('express-rate-limit');
const validationErrors = require('celebrate').errors;
const http2 = require('http2');
const express = require('express');
const mongoose = require('mongoose'); //подключение БД Монго
const bodyParser = require('body-parser');  //подключение парсера
const cookieParser = require('cookie-parser');
const helmet = require('helmet'); //подключение заголовков защиты

/* Подключение роутов */
const rootRouter = require('./routes/index');

/* Подключение мидлваров */
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* Настройки сервера */
const { PORT, DATABASE } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config');

const app = express(); //создание точки входа

/* Подключение к БД */
const db = mongoose.connection;
mongoose.connect(/* DATABASE || */ DEFAULT_DATABASE, { authSource: 'admin' });
db.on('error', console.error.bind(console, 'ошибка подключения к movieDB'))

/* Включение парсеров */
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

/* Включение защиты */
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // за 15 минут
  max: 1000 // можно совершить максимум 100 запросов с одного IP
});

app.use(helmet());
app.use(limiter);

/* Включение логгера запросов */
app.use(requestLogger);

/* Подключение роутов */
app.use('/', rootRouter);

/* Включение логгера ошибок */
app.use(errorLogger);

/* Включение обработчиков оошибок */
app.use(validationErrors());
app.use(errorHandler);

app.listen(PORT || DEFAULT_PORT);