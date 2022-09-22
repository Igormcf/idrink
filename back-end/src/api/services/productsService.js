const { Product } = require('../../database/models');

const getAllProducts = async () => {
  const response = await Product.findAll();

  return { statusCode: 200, result: response };
};

module.exports = {
  getAllProducts,
};