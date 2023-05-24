const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleNotFoundUrl } = require('./errors/handleNotFoundUrl');
const { login, createUser } = require('./controllers/user');
const { loginValidate, createValidate } = require('./errors/userError');
const { userRouter, cardRouter } = require('./routes');

const app = express();
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://0.0.0.0:27017/mestodb',
} = process.env;

app.use(cors({
  origin: ['https://web-15.viktor5211.nomoredomains.monster',
    'https://web-15.viktor5211.nomoredomains.monster/',
    'http://web-15.viktor5211.nomoredomains.monster',
    'http://web-15.viktor5211.nomoredomains.monster/'],
  credentials: true,
}));

app.use(express.json());
app.use(requestLogger);

app.post('/signin', loginValidate, login);
app.post('/signup', createValidate, createUser);
app.use(userRouter);
app.use(cardRouter);
app.patch('*', (req, res) => {
  handleNotFoundUrl(req, res);
});

app.use(errorLogger);
app.use(errors());

mongoose.connect(MONGO_URL, {});

app.listen(PORT, () => { });
