const { Product } = require('../../database/models');

const getAllProducts = async () => {
  const response = await Product.findAll();

  return { statusCode: 200, result: response };
};

const getProductById = async (id) => {
  const response = await Product.findOne({ where: { id } });
  if (!response) return { statusCode: 404, result: { message: 'Product does not exist' } };

  return { statusCode: 200, result: response };
};

module.exports = {
  getAllProducts,
  getProductById,
};