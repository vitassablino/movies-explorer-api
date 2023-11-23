const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const ERROR_MESSAGES = require('../utils/constants');
const { SECRET_KEY } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  req.user = payload;
  next();
};

module.exports = auth;
