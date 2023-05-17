const express = require('express');

const { cardValidate, cardIdValidate } = require('../errors/CardError');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeikeCard,
  deleteLikeikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', cardValidate, getCards);
cardRouter.post('/cards', cardValidate, createCard);
cardRouter.delete('/cards/:cardId', cardIdValidate, deleteCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidate, addLikeikeCard);
cardRouter.delete('/cards/:cardId/likes', cardIdValidate, deleteLikeikeCard);

module.exports = cardRouter;
