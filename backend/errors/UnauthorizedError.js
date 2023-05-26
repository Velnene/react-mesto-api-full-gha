const { Unauthorized } = require('../respons/responsStatus');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Unauthorized;
  }
}

module.exports = UnauthorizedError;
