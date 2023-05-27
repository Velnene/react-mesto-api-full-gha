const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const urlValid = require('../utils/urlValid');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => urlValid.test(v),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (isValid) => isEmail(isValid),
      message: 'Почта не валидна',
    },
    password: {
      required: true,
      type: String,
      select: false,
      minlength: 8,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
