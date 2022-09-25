const jwt = require('jsonwebtoken');
const md5 = require('md5'); 
const fs = require('fs').promises;
const { User } = require('../../database/models');

const JWT_SECRET = async () => fs.readFile('./jwt.evaluation.key', 'utf-8');

const login = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email } });
  const config = { expiresIn: '7d', algorithm: 'HS256' };
  if (findUser === null) return { statusCode: 404, result: { message: 'User not found!' } };

  const descriptPassword = md5(password);
  
  if (descriptPassword !== findUser.password) {
    return { statusCode: 404, result: { message: 'Incorrect email or password' } };
  }

  const secret = await JWT_SECRET();
  const { name, email: userEmail, role } = findUser;
  const payload = { email, id: findUser.id };
  const token = jwt.sign(payload, secret, config);
  
  return { statusCode: 200, result: { name, email: userEmail, role, token } };
};

module.exports = {
  login,
};