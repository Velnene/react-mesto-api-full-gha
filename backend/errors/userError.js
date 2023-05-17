const { celebrate, Joi } = require('celebrate');

const passValid = /^[!-z]{8,30}$/;
const urlValid = /^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/;

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Поле должно быть валидным email',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Пароль должен быть не короче 8 симв.',
        'string.empty': 'Поле пароля должно быть заполнено',
      }),
  }),
});

const createValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле должно быть валидным email',
      }),
    password: Joi.string().min(8).required().pattern(passValid)
      .message('Пароль должен содержать a-z, A-Z, и 0-9')
      .messages({
        'string.min': 'Пароль должен быть не короче 8 симв.',
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя должно быть не короче 2 симв.',
        'string.max': 'Имя должно быть не длиннее 30 симв.',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Текст о себе должен быть не короче 2 симв.',
        'string.max': 'Текст о себе должен быть не длиннее 30 симв.',
      }),
    avatar: Joi.string().pattern(urlValid)
      .message('Введите URL аватара'),
  }),
});

const updateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя должно быть не короче 2 симв.',
        'string.max': 'Имя должно быть не длиннее 30 симв.',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Текст о себе должен быть не короче 2 симв.',
        'string.max': 'Текст о себе должен быть не длиннее 30 симв.',
      }),
    avatar: Joi.string().pattern(urlValid)
      .message('Введите URL аватара'),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({ userId: Joi.string().alphanum().length(24) }),
});

module.exports = {
  loginValidate, createValidate, updateValidate, idValidate,
};
