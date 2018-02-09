'use strict';

module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
      product_id       : DataTypes.INTEGER.UNSIGNED,
      product_name     : {type: DataTypes.STRING, allowNull: false},
      product_code     : {type: DataTypes.STRING, allowNull: false, unique: true},
      brand            : DataTypes.STRING,
      bin              : DataTypes.STRING,
      description      : DataTypes.TEXT,
      cost             : {type: DataTypes.INTEGER, allowNull: true},
      price            : {type: DataTypes.INTEGER, allowNull: true},
      weight           : {type: DataTypes.DECIMAL(10, 2), allowNull: true},
      product_tags     : DataTypes.TEXT,
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};