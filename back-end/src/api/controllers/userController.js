const service = require('../services/userService');

const getAllUsers = async (req, res) => {
  const { statusCode, result } = await service.getAllUsers();

  return res.status(statusCode).json(result);
};

const deletUser = async (req, res) => {
  const { id } = req.params;

  const { statusCode, result } = await service.deletUser(id);

  return res.status(statusCode).json(result);
};

module.exports = {
  getAllUsers,
  deletUser,
};