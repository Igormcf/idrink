const express = require('express');
const validJWT = require('../middlewares/validJWT');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', validJWT, productsController.getAllProducts);

module.exports = router;