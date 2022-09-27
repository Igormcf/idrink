const ordersService = require('../services/ordersService');

const getAllSalesBySeller = async (req, res) => {
  const { id } = req.params;

  const { statusCode, result } = await ordersService.getAllSalesBySeller({ id });

  return res.status(statusCode).json(result);
};

module.exports = {
  getAllSalesBySeller,
};