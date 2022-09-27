const express = require('express');
const validJWT = require('../middlewares/validJWT');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/seller/:id', validJWT, ordersController.getAllSalesBySeller);
router.patch('/:id', validJWT, ordersController.updateSalesBySeller);

module.exports = router;
