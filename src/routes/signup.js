const router = require('express').Router();
const  { createUserValidator } = require('../middlewares/celebrateValidator');
const { createUser } = require('../controllers/signup');

/* Регистрация нового пользователя / */
router.post('/', createUserValidator, createUser);

module.exports = router;