const { InternalServer } = require('../respons/responsStatus');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = InternalServer;
  }
}

module.exports = InternalServerError;
