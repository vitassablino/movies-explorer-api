const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorizationError');
const { AUTHORIZATION_BAD_DATA_MESSAGE } = require('../utils/constants');

/* Cхема пользователя */
const userSchema = new mongoose.Schema ({
  email: { //
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Введённая почта не найдена',
    },
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  password: {
    select: false, //по умолчанию хеш пароля пользователя не будет возвращаться из базы
    required: true,
    type: String,
  }
})

userSchema.statics.findUserByCredentials = function (email, password, res) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(AUTHORIZATION_BAD_DATA_MESSAGE);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError(AUTHORIZATION_BAD_DATA_MESSAGE)
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);