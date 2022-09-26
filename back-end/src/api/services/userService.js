const { User } = require('../../database/models');

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { statusCode: 200, result: users };
};

module.exports = {
  getAllUsers,
};
