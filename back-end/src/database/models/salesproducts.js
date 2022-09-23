module.exports = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('SaleProduct', {
    saleId: {
      field: 'sale_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
    tableName: 'SalesProducts',
  });

  SalesProductsTable.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProductsTable,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products',
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProductsTable,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });
  };

  return SalesProductsTable;
};