require('dotenv').config();
const express = require('express');

const port = process.env.API_PORT || 3001;
const app = require('./app');

app.use(express.static('public'));
app.listen(port, () => console.log(`Api rodando na porta ${port}`));
