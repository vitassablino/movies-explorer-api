const allowedCors = [
  'http://movies-explorer.akula.nomoredomainsrocks.ru',
  'https://movies-explorer.akula.nomoredomainsrocks.ru',
  'http://51.250.9.105',
  'https://51.250.9.105',
  'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3002',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Max-Age', '3600');

    return res.end();
  }

  return next();
};

module.exports = cors;
