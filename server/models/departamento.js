'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Departamento.init({
    nome: DataTypes.STRING,
    idEmpresa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Departamento',
  });
  return Departamento;
};