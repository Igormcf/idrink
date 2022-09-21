const express = require('express');
const validJoiRegister = require('../middlewares/validJoiRegister');

const router = express.Router();

const registerController = require('../controllers/registerController');

router.post('/', validJoiRegister, registerController.register);

module.exports = router;