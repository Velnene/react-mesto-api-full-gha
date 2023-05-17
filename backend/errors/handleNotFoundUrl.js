const { NotFound } = require('../respons/responsStatus');

const handleNotFoundUrl = (req, res) => {
  res.status(NotFound).send({ message: 'Неверный путь' });
};

module.exports = { handleNotFoundUrl };
