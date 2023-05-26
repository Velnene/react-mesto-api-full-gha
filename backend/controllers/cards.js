const Card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const {
  BadRequest,
  InternalServer,
  NotFound,
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
  // .catch(() => {
  // res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
  // });
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
        return next(new BadRequestError('Переданы неверные данные.'));
      }
      return next(e);
    });
  // .catch((e) => {
  //   if (e.name === 'ValidationError') {
  //     res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
  //   } else {
  //     res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
  //   }
  // });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Невалидный id карточки' });
      } else if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(403).send({ message: 'Можно удалять только свои карточки' });
      }
    })
    .catch(next);
};

const addLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send(like);
      } else {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Карточка не найдена' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send(like);
      } else {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Карточка не найдена' });
      } else {
        res.status(InternalServer).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeikeCard,
  deleteLikeikeCard,
};
