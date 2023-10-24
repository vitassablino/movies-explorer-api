const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorizationError');

/* Cхема пользователя */
const userSchema = new mongoose.Schema ({
  email: {
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Введённая почта не найдена',
    },
    type: String,
    minlength: 4,
    maxlength: 50,
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
    required: true,
    type: String,
    select: false, //по умолчанию хеш пароля пользователя не будет возвращаться из базы
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: (props) => `${props.value} не является надежным паролем`,
    },
  }
})

userSchema.statics.findUserByCredentials = function (email, password, res) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неверный логин или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неверный логин или пароль')
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);