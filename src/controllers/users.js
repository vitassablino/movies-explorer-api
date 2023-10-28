const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const NotFoundError = require('../errors/notFoundError');
const {USER_NOT_FOUND_MESSAGE} = require('../utils/constants')

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
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      } else {
        res.send(user);
      }
    })
    .catch(next);
}
