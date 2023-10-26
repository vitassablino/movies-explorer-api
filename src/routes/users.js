const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const  { updateUserValidator } = require('../middlewares/celebrateValidator');

/* Получение информации о пользователе / */
router.get('/me', getUserInfo);

/* Обновление данных о пользователе */
router.patch('/me', updateUserValidator, updateUserInfo);

module.exports = router;