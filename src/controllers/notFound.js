const NotFoundError = require('../errors/notFoundError'); //
const URL_NOT_FOUND_MESSAGE = require('../utils/constants'); //


/* Обработчик страницы 404 */
module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(URL_NOT_FOUND_MESSAGE));
};