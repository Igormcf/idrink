module.exports = (sequelize, DataTypes) => {
  const SalesTable = sequelize.define('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    seller_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    delivery_address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'Sales',
  });

 SalesTable.associate = (models) => {
    SalesTable.hasOne(models.Users,
      { foreignKey: 'user_id', as: 'usersUserId' },
      { foreignKey: 'seller_id', as: 'usersSellerId' });
  };

  return SalesTable;
};