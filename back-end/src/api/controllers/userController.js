const service = require('../services/userService');

const getAllUsers = async (req, res) => {
  const { statusCode, result } = await service.getAllUsers();

  return res.status(statusCode).json(result);
};

module.exports = {
  getAllUsers,
};