const { Sale, SaleProduct, /* User, */ Product } = require('../../database/models');

const createSale = async (body) => {
  const newSale = await Sale.create({
    userId: body.id,
    sellerId: !body.sellerId ? 2 : body.sellerId,
    totalPrice: body.totalPrice,
    deliveryAddress: body.deliveryAddress,
    deliveryNumber: body.deliveryNumber,
    status: body.status,
  });

  if (newSale) {
    await SaleProduct.bulkCreate(body.products.map((item) => ({
        saleId: newSale.id,
        productId: item.productId,
        quantity: item.quantity,
      })));
  }

  return { statusCode: 201, result: newSale };
};

const getAllSalesByUser = async ({ id }) => {
  const response = await Sale.findAll(
    {
      where: { userId: id },
      include: [
        { model: Product, as: 'products', through: { attributes: [] } },
      ],
    },
  );

  return { statusCode: 200, result: response };
};

module.exports = {
  createSale,
  getAllSalesByUser,
};