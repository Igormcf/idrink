const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await salesService.createSale({ id, ...req.body });

  return res.status(statusCode).json(result);
};

module.exports = {
  createSale,
};