const express = require('express');
const validJWT = require('../middlewares/validJWT');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', validJWT, userController.getAllUsers);

module.exports = router;