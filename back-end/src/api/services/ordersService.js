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

const updateSalesBySeller = async ({ id, newStatus }) => {
  const findSales = await Sale.findByPk(id);

  if (!findSales) return { statusCode: 404, result: 'sale not found' };

  await Sale.update({ status: newStatus }, { where: { id } });

  return { statusCode: 201, result: 'Updated sale!' };
};

module.exports = {
  getAllSalesBySeller,
  updateSalesBySeller,
};
