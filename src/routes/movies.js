const router = require('express').Router();

const  { createMovieCardValidator, deleteMovieCardValidator } = require('../middlewares/celebrate');

const {
  getCardsByOwner,
  createMovieCard,
  deleteMovieCard,
} = require('../controllers/movies');

/* Обработка GET запроса /movies  */
router.get('/', getCardsByOwner);

/* Обработка POST запроса /movies/  */
router.post('/', createMovieCardValidator, createMovieCard); //использован кастом валидатор

/* Обработка DELETE  запроса /movies/_id */
router.delete('/:cardId', deleteMovieCardValidator, deleteMovieCard); //использован кастом валидатор

module.exports = router;