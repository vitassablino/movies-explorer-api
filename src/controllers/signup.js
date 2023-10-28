const bcrypt = require('bcryptjs');

const { ValidationError } = require('mongoose').Error; //
const IncorrectDataError = require('../errors/incorrectDataError');
const ConflictError = require('../errors/conflictError');

const CREATE_CODE = require('../utils/constants');
const SIGNUP_BAD_DATA_MESSAGE = require('../utils/constants');
const CONFLICT_MESSAGE = require('../utils/constants');

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
      res.status(CREATE_CODE).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError(SIGNUP_BAD_DATA_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};