const Joi = require('joi');

const createUserDto = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string(),
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