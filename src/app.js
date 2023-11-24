require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors: celebrateErrors } = require('celebrate');

const app = express();
const routes = require('./routes');

const limiter = require('./middlewares/limiter');

const { PORT, DATABASE, NODE_ENV } = require('./utils/config');

console.log(`БД адрес = ${DATABASE}`);
console.log(`Порт = ${PORT}`);
console.log('Node_ENV', NODE_ENV);
const errors = require('./middlewares/errors');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DATABASE, { authSource: 'admin' })
  .then(() => {
    console.log('mongoDB connected');
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
