'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Catalog', {
      name: DataTypes.STRING
  });

  Model.associate = function(models){
    
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };
  return Model;
};