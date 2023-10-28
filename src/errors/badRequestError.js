const BAD_REQUEST_ERROR_CODE = require('../utils/constants')

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST_ERROR_CODE;
  }
}

module.exports = BadRequestError;