const { Forbidden } = require('../respons/responsStatus');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Forbidden;
  }
}

module.exports = ForbiddenError;
