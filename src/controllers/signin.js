const jwt = require('jsonwebtoken');

const User = require('../models/users');

const { NODE_ENV, SECRET_KEY } = process.env; //
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

/* Логин */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

