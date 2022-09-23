const express = require('express');
const validJWT = require('../middlewares/validJWT');
const saleController = require('../controllers/saleController');
const validJoiSale = require('../middlewares/validJoiSales');

const router = express.Router();

router.post('/', validJWT, validJoiSale, saleController.createSale);

module.exports = router;