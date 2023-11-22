const {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const config = {
  DB_URL:
    NODE_ENV === 'production'
      ? DB_URL
      : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};

module.exports = config;
