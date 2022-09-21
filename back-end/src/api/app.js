const express = require('express');
require('express-async-errors');
const error = require('./middlewares/error');

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/login', routes.loginRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(error);

module.exports = app;
