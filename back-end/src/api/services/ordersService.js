const { Sale, Product } = require('../../database/models');

const getAllSalesBySeller = async ({ id }) => {
  const response = await Sale.findAll(
    {
      where: { sellerId: id },
      include: [
        { model: Product, as: 'products', through: { attributes: [] } },
      ],
    },
  );

  if (response.length === 0) return { statusCode: 404, result: 'sale not found' };
  
  return { statusCode: 200, result: response };
};

module.exports = {
  getAllSalesBySeller,
};
