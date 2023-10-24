const router = require('express').Router();

const { createUser } = require('../controllers/signup');

/* Регистрация нового пользователя */
router.post('/',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),
createUser);

module.exports = router;