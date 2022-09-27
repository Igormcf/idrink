const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await salesService.createSale({ id, ...req.body });

  return res.status(statusCode).json(result);
};

const getAllSalesByUser = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await salesService.getAllSalesByUser({ id });

  return res.status(statusCode).json(result);
};

const getSaleById = async (req, res) => {
  const { id: userId } = req.user;
  const { id: saleId } = req.params;

  const { statusCode, result } = await salesService.getSaleById(userId, saleId);

  return res.status(statusCode).json(result);
};

module.exports = {
  createSale,
  getAllSalesByUser,
  getSaleById,
};