module.exports = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define('User', {
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
    UsersTable.hasMany(models.Sale,
      { foreignKey: 'user_id', as: 'salesUserId' });
    UsersTable.hasMany(models.Sale,
      { foreignKey: 'seller_id', as: 'salesSellerId' });
  };
  
  return UsersTable;
};