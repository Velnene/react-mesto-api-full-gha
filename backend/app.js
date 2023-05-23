const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const { handleNotFoundUrl } = require('./errors/handleNotFoundUrl');
const { login, createUser } = require('./controllers/user');
const { loginValidate, createValidate } = require('./errors/userError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(
  cors({
    origin: ['https://web-15.viktor5211.nomoredomains.monster',
      'http://localhost:3000',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://0.0.0.0:27017/mestodb',
} = process.env;

const { userRouter, cardRouter } = require('./routes');

app.use(requestLogger);
app.use(express.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidate, login);
app.post('/signup', createValidate, createUser);
app.use('/api', userRouter);
app.use('/api', cardRouter);
app.patch('*', (req, res) => {
  handleNotFoundUrl(req, res);
});

app.use(errorLogger);
app.use(errors());

mongoose.connect(MONGO_URL, {});

app.listen(PORT, () => { });
