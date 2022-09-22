const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../../database/models');

const { JWT_SECRET } = process.env;

const register = async ({ name, email, password, role }) => {
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) return { statusCode: 409, result: { message: 'User already registered' } };

  const defaultRole = !role ? 'user' : role;

  const criptPassword = md5(password);
  const { id } = await User.create({ name, email, password: criptPassword, role: defaultRole });
  const config = { expiresIn: '7d', algorithm: 'HS256' };
  const payload = { email, id };
  const token = jwt.sign(payload, JWT_SECRET, config);

  return { statusCode: 201, result: { token } };
};

module.exports = {
  register,
};