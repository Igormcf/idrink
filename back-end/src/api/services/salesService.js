const { Sale, SaleProduct } = require('../../database/models');

const createSale = async (body) => {
  const newSale = await Sale.create({
    userId: body.id,
    sellerId: !body.sellerId ? 2 : body.sellerId,
    totalPrice: body.totalPrice,
    deliveryAddress: body.deliveryAddress,
    deliveryNumber: body.deliveryNumber,
    saleDate: body.saleDate,
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

module.exports = {
  createSale,
};