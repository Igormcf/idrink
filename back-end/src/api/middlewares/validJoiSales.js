const Joi = require('joi');

const createUserDto = Joi.object({
  sellerId: Joi.number(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  saleDate: Joi.date().required(),
  status: Joi.string().required(),
  products: Joi.array().items({
    quantity: Joi.number().required(),
    productId: Joi.number().required(),
  }).required(),
});

const createUserValid = (req, res, next) => {
  const { error } = createUserDto.validate(req.body);
  if (!error) {
    return next();
  }
  const [message] = error.details.map((e) => e.message);
  return res.status(400).json({ message });
};

module.exports = createUserValid;