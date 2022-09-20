module.exports = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('SalesProducts', {
    sale_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: 'Sales',
  });

  SalesProductsTable.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      through: SalesProductsTable,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      as: 'products',
    });
    models.Products.belongsToMany(models.Sales, {
      through: SalesProductsTable,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      as: 'sales',
    });
  };

  return SalesProductsTable;
};