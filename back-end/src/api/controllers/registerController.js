const registerService = require('../services/registerService');

const register = async (req, res) => {
  const { statusCode, result } = await registerService.register(req.bady);
  return res.status(statusCode).json(result);
};

module.exports = {
  register,
};
