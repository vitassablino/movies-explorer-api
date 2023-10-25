const rootRouter = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const signout = require('./signout');
const users = require('./users');
const movies = require('./movies');
const notFound = require('./notFound');
const auth = require('../middlewares/auth');

/* Роуты */
rootRouter.use('/signup', signup);
rootRouter.use('/signin', signin);
rootRouter.use('/signout', auth, signout);
rootRouter.use('/users', auth, users);
rootRouter.use('/movies', auth, movies);
rootRouter.use('*', auth, notFound);

module.exports = rootRouter;