require('express-async-errors');
const express = require('express');
const cors = require('cors');
const error = require('./middlewares/error');

const routes = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/login', routes.loginRouter);
app.use('/register', routes.registerRouter);
app.use('/user', routes.userRouter);
app.use('/products', routes.productsRouter);
app.use('/checkout', routes.salesRouter);
app.use('/orders', routes.ordersRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(error);

module.exports = app;
