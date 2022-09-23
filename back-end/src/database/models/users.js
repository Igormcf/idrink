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
    tableName: 'users',
  });

  UsersTable.associate = (models) => {
    UsersTable.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'salesUserId' });
    UsersTable.hasMany(models.Sale,
      { foreignKey: 'sellerId', as: 'salesSellerId' });
  };
  
  return UsersTable;
};
