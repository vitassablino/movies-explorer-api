const http2 = require('http2');
const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');

const Movie = require('../models/movie'); //

/* Обработка GET запроса /movies */
module.exports.getCardsByOwner = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Фильм не найден'));
      } else {
        next(err);
      }
    });
};

/* Обработка POST  запроса /movies */
module.exports.createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

/* Обработка DELETE  запроса /movies/_id */
module.exports.deleteMovieCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return card.deleteOne()
          .then(() => res.send({ message: 'Фильм удалён' }));
      } else {
        throw new ForbiddenError('Эта карточка вам не принадлежит');
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Фильм с указанным ID не найден'));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError('ID фильма неверный'));
      } else {
        next(err);
      }
    });
};