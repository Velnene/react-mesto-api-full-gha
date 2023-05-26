const { Conflict } = require('../respons/responsStatus');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Conflict;
  }
}

module.exports = ConflictError;
