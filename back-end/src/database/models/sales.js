module.exports = (sequelize, DataTypes) => {
  const SalesTable = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      field: 'seller_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    totalPrice: {
      field: 'total_price',
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    deliveryAddress:{
      field: 'delivery_address',
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      field: 'delivery_number',
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      field: 'sale_date',
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
    tableName: 'sales',
  });

 SalesTable.associate = (models) => {
    SalesTable.belongsTo(models.User,
      { foreignKey: 'userId', as: 'usersUserId' });
    SalesTable.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'usersSellerId' });
  };
  
  return SalesTable;
};