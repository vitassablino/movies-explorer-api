const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

/* Получение информации о пользователе / */
router.get('/me', getUserInfo);

/* Обновление данных о пользователе */
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}),
updateUserInfo);

module.exports = router;