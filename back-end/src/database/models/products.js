module.exports = (sequelize, DataTypes) => {
  const ProductsTable = sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    url_image: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
    tableName: 'Sales',
  });

  return ProductsTable;
};