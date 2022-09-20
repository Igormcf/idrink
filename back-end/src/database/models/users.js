module.exports = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define('Users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  UsersTable.associate = (models) => {
    UsersTable.hasMany(models.Sales,
      { foreignKey: 'user_id', as: 'salesUserId' },
      { foreignKey: 'seller_id', as: 'salesSellerId' });
  };

  return UsersTable;
};