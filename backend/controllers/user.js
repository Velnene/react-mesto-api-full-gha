const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { generateToken } = require('../utils/token');
const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(OK).send(user);
      } else {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequestError('Поля неверно заполнены'));
      }
      return next(e);
    });
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  if (!email) {
    throw new BadRequestError('Поля неверно заполнены');
  }
  return User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError('Email уже зарегистрирован');
    }
    bcrypt.hash(req.body.password, 10);
  })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userNotPassword = user;
      delete userNotPassword.password;
      res.status(CREATED).send(userNotPassword);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Поля неверно заполнены'));
      } return next(e);
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Поля неверно заполнены'));
      } return next(e);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user.id });
      return res.status(OK).send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch((e) => {
      if (res.status === 401) {
        next(new UnauthorizedError('Не авторизован пользователь'));
      } return next(e);
    });
};

module.exports = {
  getCurrentUser,
  login,
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
};
