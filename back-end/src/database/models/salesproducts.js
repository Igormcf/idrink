module.exports = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('SaleProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    product_id: {
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
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      as: 'products',
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProductsTable,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      as: 'sales',
    });
  };

  return SalesProductsTable;
};