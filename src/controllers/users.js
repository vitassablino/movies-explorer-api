const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError'); //

const User = require('../models/users');

/* Обработка GET запроса users/me */
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

/* Обработка PATCH запроса users/me */
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, //возврат новой копии
    runValidators: true } //Включение валидации
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Пользователь не найден'));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError('Некорректный ID'));
      } else if (err instanceof ValidationError) {
        next(new IncorrectDataError(`Произошла ошибка: ${err.name}: ${err.message}`));
      } else {
        next(err);
      }
    });
};