const ALLOWED_CORS = [
  'http://movies-explorer.akula.nomoredomainsrocks.ru',
  'https://movies-explorer.akula.nomoredomainsrocks.ru',
  'http://51.250.9.105',
  'https://51.250.9.105',
  'http://localhost:3000',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; //

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};