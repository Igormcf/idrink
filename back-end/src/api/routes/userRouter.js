const express = require('express');
const validJWT = require('../middlewares/validJWT');
const validJWTAdmin = require('../middlewares/validJWTAdmin');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', validJWT, userController.getAllUsers);
router.delete('/:id', validJWTAdmin, userController.deletUser);

module.exports = router;