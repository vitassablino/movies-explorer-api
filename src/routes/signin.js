const router = require('express').Router();

const { login } = require('../controllers/signin');

/* Логин */
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),
login);

module.exports = router;