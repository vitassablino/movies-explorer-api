const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/authorizationError');

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

const { AUTHORIZATION_NO_TOKEN_MESSAGE, AUTHORIZATION_BAD_TOKEN_MESSAGE } = require('../utils/constants');

/* Мидлвара авторизации */
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(AUTHORIZATION_NO_TOKEN_MESSAGE));
  }

  let payload;
  const userToken = authorization.replace('Bearer ', '');   // извлеченние токена

  try {
    payload = jwt.verify(userToken, NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY); //
  } catch (err) {
    return next(new AuthorizationError(AUTHORIZATION_BAD_TOKEN_MESSAGE));
  }

  req.user = payload;
  return next();
};