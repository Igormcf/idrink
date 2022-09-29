const { User } = require('../../database/models');

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { statusCode: 200, result: users };
};

const deletUser = async (id) => {
  await User.destroy({ where: { id } });

  return { statusCode: 204, result: { messege: 'Deleted user!' } };
};

module.exports = {
  getAllUsers,
  deletUser,
};
