const bcrypt = require('bcryptjs');
const http2 = require('http2');

const { ValidationError } = require('mongoose').Error;
const IncorrectDataError = require('../errors/incorrectDataError');
const ConflictError = require('../errors/conflictError');

const User = require('../models/users');

/* Регистрация пользователя */
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name
    }))
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError({ message: `Произошла ошибка: ${err.name}: ${err.message}`}));
      } else if (err.code === 11000) {
        next(new ConflictError({ message: `Произошла ошибка: ${err.name}: ${err.message}`}));
      } else {
        next(err);
      }
    });
};