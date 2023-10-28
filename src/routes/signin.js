const router = require('express').Router();
const  { loginValidator } = require('../middlewares/celebrate');
const { login } = require('../controllers/signin');

/* Логин / */
router.post('/', loginValidator, login);

module.exports = router;