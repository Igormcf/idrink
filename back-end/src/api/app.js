const express = require('express');
require('express-async-errors');
const error = require('./middlewares/error');
const cors = require('cors')

const routes = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/login', routes.loginRouter);
app.use('/register', routes.registerRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(error);

module.exports = app;
