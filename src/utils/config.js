/* const {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const config = {
  DB_URL:
    NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://localhost:27017/moviesdb',
  PORT: NODE_ENV === 'production' ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};

module.exports = config; */


const MODE_PRODUCTION = 'production';
const SECRET_KEY = 'dev-secret-key';
const DEFAULT_PORT = 3002;
const DEFAULT_DATABASE = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  MODE_PRODUCTION,
  SECRET_KEY,
  DEFAULT_PORT,
  DEFAULT_DATABASE,
};
