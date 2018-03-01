'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Customer', {
      customer_id       : DataTypes.INTEGER.UNSIGNED,
      customer_name     : {type: DataTypes.STRING, allowNull: false},
      customer_code     : DataTypes.STRING,
      email             : {type: DataTypes.STRING, allowNull: true, unique: true},
      phone             : {type: DataTypes.STRING, allowNull: true},
    });

  Model.associate = function(models){

  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };
  return Model;
};