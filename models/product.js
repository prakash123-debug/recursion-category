'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    categoryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = function (models) {
    Product.belongsTo(models.Category, { as: "categories", foreignKey: "categoryId"});
  };

  return Product;
};