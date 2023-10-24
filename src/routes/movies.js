const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCardsByOwner,
  createMovieCard,
  deleteMovieCard,
} = require('../controllers/movies');

/* Обработка GET запроса /movies  */
router.get('/', getCardsByOwner);

/* Обработка POST запроса /movies  */
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().uri().trim(),
    trailerLink: Joi.string().required().uri().trim(),
    thumbnail: Joi.string().required().uri().trim(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
}),
createMovieCard);

/* Обработка DELETE  запроса /movies/_id */
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}),
deleteMovieCard);

module.exports = router;