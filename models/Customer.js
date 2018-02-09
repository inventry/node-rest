'use strict';

module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
      customer_id       : DataTypes.INTEGER.UNSIGNED,
      customer_name     : {type: DataTypes.STRING, allowNull: false},
      customer_code     : DataTypes.STRING,
      email             : {type: DataTypes.STRING, allowNull: true, unique: true},
      phone             : {type: DataTypes.STRING, allowNull: true},
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Customer;
};