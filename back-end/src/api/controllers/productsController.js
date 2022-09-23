const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const { statusCode, result } = await productsService.getAllProducts();

  return res.status(statusCode).json(result);
};

const getProductById = async (req, res) => {
  const { statusCode, result } = await productsService.getProductById(req.params.id);

  return res.status(statusCode).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
};