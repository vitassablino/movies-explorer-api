const router = require('express').Router();

const { logout } = require('../controllers/signout');

/* Выход пользователя из системы */
router.post('/', logout);

module.exports = router;