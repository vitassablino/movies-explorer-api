const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Укажите страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Укажите режиссёра фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Укажите продолжительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Укажите год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Укажите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Введите ссылку на постер фильма'],
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Укажите ссылку на трейлер фильма'],
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Укажите ссылку на миниатюрное изображение постера к фильму'],
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Укажите _id пользователя, который сохранил фильм'],
  },
  movieId: {
    type: Number,
    required: [true, 'Укажите ID фильма'],
  },
  nameRU: {
    type: String,
    required: [true, 'Должно быть указано название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Должно быть указано название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);