const { NotFound } = require('../respons/responsStatus');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NotFound;
  }
}

module.exports = NotFoundError;
