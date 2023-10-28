
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/badRequestError')
const BAD_REQUEST_ERROR_MESSAGE = require('../utils/constants')

/* Валидация uri */
const urlValidation = (url) => {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequestError(BAD_REQUEST_ERROR_MESSAGE);
};

/*  Валидатор создания пользователя */
module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

/*  Валидатор логина */
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

/*  Валидатор обновленной информации о пользователе */
module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

/*  Валидатор создания карточки */
module.exports.createMovieCardValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().custom(urlValidation),
    trailerLink: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
});

/*  Валидатор удаления карточки */
module.exports.deleteMovieCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});