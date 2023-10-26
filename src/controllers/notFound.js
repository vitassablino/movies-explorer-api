const NotFoundError = require('../errors/notFoundError'); //

/* Обработчик страницы 404 */
module.exports.notFound = (req, res, next) => {
  next(new NotFoundError("Запрашиваемая страница не найдена или не существует"));
};