const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');
const ERROR_MESSAGES = require('../utils/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signout', auth, logout);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

module.exports = router;
