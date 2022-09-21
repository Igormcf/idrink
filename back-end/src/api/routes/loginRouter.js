const express = require('express');
const validJoiLogin = require('../middlewares/validJoiLogin');

const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', validJoiLogin, loginController.login);

module.exports = router;