const router = require('express').Router();

const  { createMovieCardValidator, deleteMovieCardValidator } = require('../middlewares/celebrateValidator');

const {
  getCardsByOwner,
  createMovieCard,
  deleteMovieCard,
} = require('../controllers/movies');

/* Обработка GET запроса /movies  */
router.get('/', getCardsByOwner);

/* Обработка POST запроса /movies/  */
router.post('/', createMovieCardValidator, createMovieCard);

/* Обработка DELETE  запроса /movies/_id */
router.delete('/:cardId', deleteMovieCardValidator, deleteMovieCard);

module.exports = router;