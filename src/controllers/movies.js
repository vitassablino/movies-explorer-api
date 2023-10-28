const http2 = require('http2');
const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');

const {MOVIE_FIND_NOT_FOUND_MESSAGE} = require('../utils/constants')
const {MOVIE_BAD_ID_MESSAGE} = require('../utils/constants')
const {MOVIE_DELETE_NOT_FOUND_MESSAGE} = require('../utils/constants')
const {MOVIE_FORBIDDEN_MESSAGE} = require('../utils/constants')




const Movie = require('../models/movie'); //

/* Обработка GET запроса /movies */
module.exports.getCardsByOwner = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MOVIE_FIND_NOT_FOUND_MESSAGE));
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
        next(new IncorrectDataError(MOVIE_BAD_ID_MESSAGE));
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
          .then(() => res.send({ message: MOVIE_FORBIDDEN_MESSAGE })); //добавлен return и .then
      } else {
        throw new ForbiddenError(MOVIE_FORBIDDEN_MESSAGE);
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MOVIE_DELETE_NOT_FOUND_MESSAGE));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(MOVIE_BAD_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};