const jwt = require('jsonwebtoken');
const md5 = require('md5');
const fs = require('fs').promises;
const { User } = require('../../database/models');

const JWT_SECRET = async () => fs.readFile('./jwt.evaluation.key', 'utf-8');

const register = async ({ name, email, password, role }) => {
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) return { statusCode: 409, result: { message: 'User already registered' } };

  const defaultRole = !role ? 'customer' : role;

  const criptPassword = md5(password);
  const { id } = await User.create({ name, email, password: criptPassword, role: defaultRole });
  const config = { expiresIn: '7d', algorithm: 'HS256' };
  const payload = { email, id };
  const secret = await JWT_SECRET();
  const token = jwt.sign(payload, secret, config);

  return { statusCode: 201, result: { name, email, role, token } };
};

module.exports = {
  register,
};