const { BadRequest } = require('../respons/responsStatus');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BadRequest;
  }
}

module.exports = BadRequestError;
