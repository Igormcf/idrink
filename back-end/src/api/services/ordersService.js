const { Sale, Product } = require('../../database/models');

const NOT_FOUND = 'sale not found!';

const getAllSalesBySeller = async ({ id }) => {
  const response = await Sale.findAll(
    {
      where: { sellerId: id },
      include: [
        { model: Product,
          as: 'products',
          through: { attributes: { exclude: ['saleId', 'productId'] } } },
      ],
    },
  );

  if (response.length === 0) return { statusCode: 404, result: NOT_FOUND };
  
  return { statusCode: 200, result: response };
};

const getSaleSellerById = async (sellerId, saleId) => {
  const response = await Sale.findOne(
    {
      where: { id: saleId, sellerId },
      include: [
        { model: Product,
          as: 'products',
          through: { attributes: { exclude: ['saleId', 'productId'] } } },
      ],
    },
  );

  if (!response) return { statusCode: 404, result: NOT_FOUND };

  return { statusCode: 200, result: response };
};

const updateSalesBySeller = async ({ id, newStatus }) => {
  const findSales = await Sale.findByPk(id);

  if (!findSales) return { statusCode: 404, result: NOT_FOUND };

  await Sale.update({ status: newStatus }, { where: { id } });

  return { statusCode: 201, result: 'Updated sale!' };
};

module.exports = {
  getAllSalesBySeller,
  updateSalesBySeller,
  getSaleSellerById,
};
