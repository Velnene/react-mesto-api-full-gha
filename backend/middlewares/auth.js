const { SECRET_KEY = 'some-secret-key' } = process.env;
const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // next(new UnauthorizedError('Неправильные почта или пароль3'));
    return res.status(401).send({ message: 'Необходима авторизация3' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    // next(new UnauthorizedError('Неправильные почта или пароль4'));
    return res.status(401).send({ message: 'Необходима авторизация4' });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
