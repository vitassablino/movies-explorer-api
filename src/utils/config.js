const { NODE_ENV } = process.env;
const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const PORT = process.env.PORT || 3002;
const DATABASE = process.env.DB || 'mongodb://127.0.0.1:27017/moviesdb';

module.exports = {
  NODE_ENV,
  SECRET_KEY,
  PORT,
  DATABASE,
};
