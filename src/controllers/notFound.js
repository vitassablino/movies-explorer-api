const NotFoundError = require('../errors/notFoundError');

/* Обработчик страницы 404 */
module.exports.notFound = (req, res, next) => {
  next(new NotFoundError({ message: 'Запрашиваемая страница не найдена или не существует'}));
};