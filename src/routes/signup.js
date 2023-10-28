const router = require('express').Router();
const  { createUserValidator } = require('../middlewares/celebrate');
const { createUser } = require('../controllers/signup');

/* Регистрация нового пользователя / */
router.post('/', createUserValidator, createUser);

module.exports = router;