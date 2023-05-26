const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .sort({ createdAt: -1 })
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      card.populate(['owner'])
        .then(() => res.status(CREATED).send(card));
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError('Поля неверно заполнены'));
      }
      return next(e);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Невалидный id карточки');
      } else if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Можно удалять только свои карточки');
      }
    })
    .catch(next);
};

const addLikeikeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send(like);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

const deleteLikeikeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send(like);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeikeCard,
  deleteLikeikeCard,
};
