const express = require('express');
const auth = require('../middlewares/auth');

const userRouter = express.Router();
const { updateValidate, idValidate } = require('../errors/userError');
const {
  getCurrentUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

userRouter.use(auth);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', idValidate, getUserId);
userRouter.get('/users', getUsers);
userRouter.patch('/users/me', updateValidate, updateUser);
userRouter.patch('/users/me/avatar', updateValidate, updateUserAvatar);

module.exports = userRouter;
