const registerService = require('../services/registerService');

const register = async (req, res) => {
  const { statusCode, result } = await registerService.register(req.body);
  return res.status(statusCode).json(result);
};

module.exports = {
  register,
};
