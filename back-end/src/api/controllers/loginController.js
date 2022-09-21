const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { statusCode, result } = await loginService.login(req.body);
  
  return res.status(statusCode).json(result);
};

module.exports = {
  login,
};