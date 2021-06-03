'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Logs.init({
    idAuto: DataTypes.INTEGER,
    info: DataTypes.STRING,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Logs',
  });
  return Logs;
};