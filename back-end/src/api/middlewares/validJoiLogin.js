const Joi = require('joi');

const loginDTO = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required().empty(),
  password: Joi.string().min(6).required().empty(),
});

const validLogin = (req, res, next) => {
  const { error } = loginDTO.validate(req.body);
  if (!error) {
    return next();
  }
  const [message] = error.details.map((e) => e.message);
  return res.status(400).json({ message });
};

module.exports = validLogin;