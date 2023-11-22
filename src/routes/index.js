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

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

module.exports = router;
