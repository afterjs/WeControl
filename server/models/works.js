'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Works extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Works.init({
    idAuto: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    identificador: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    camiao: {
      allowNull: false,
      type: DataTypes.STRING
    },
    matricula: {
      allowNull: false,
      type: DataTypes.STRING
    },
    docaInicial: {
      allowNull: false,
      type: DataTypes.STRING
    },
    docaFinal: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dataInicio: {
      allowNull: true,
      type: DataTypes.DATE
    },
    klmInicial: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    klmFinal: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
    estado: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Works',
  });
  return Works;
};


