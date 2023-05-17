const http2 = require('node:http2');

const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const OK = http2.constants.HTTP_STATUS_OK; // 200
const BadRequest = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400
const InternalServer = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500
const NotFound = http2.constants.HTTP_STATUS_NOT_FOUND; // 404

const handleNotFoundUrl = (req, res) => {
  res.status(NotFound).send({ message: 'Неверный путь' });
};

module.exports = {
  BadRequest,
  InternalServer,
  NotFound,
  CREATED,
  OK,
  handleNotFoundUrl,
};
