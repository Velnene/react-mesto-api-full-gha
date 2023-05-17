const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const {
  BadRequest,
  InternalServer,
  NotFound,
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(OK).send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userNotPassword = user;
      delete userNotPassword.password;
      res.status(CREATED).send({ data: userNotPassword });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else if (e.code === 11000) {
        res.status(409).send({ message: 'Email уже зарегистрирован' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = generateToken({ _id: user.id });
      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
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
