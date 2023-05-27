require('dotenv').config();

const JWT = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env;

const generateToken = (payload) => JWT.sign(payload, SECRET_KEY, { expiresIn: '7d' });

module.exports = {
  generateToken,
  SECRET_KEY,
};
