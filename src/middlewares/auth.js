const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/authorizationError');

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

/* Мидлвара авторизации */
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError("Для доступа необходимо авторизироваться"));
  }

  let payload;
  const userToken = authorization.replace('Bearer ', '');   // извлеченние токена

  try {
    payload = jwt.verify(userToken, NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY);
  } catch (err) {
    return next(new AuthorizationError("Для доступа необходимо авторизироваться"));
  }

  req.user = payload;
  return next();
};