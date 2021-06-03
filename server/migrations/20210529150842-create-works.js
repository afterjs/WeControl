'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Works', {
      idAuto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identificador: {
        allowNull: false,
        type: Sequelize.STRING
      },
      camiao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      matricula: {
        allowNull: false,
        type: Sequelize.STRING
      },
      docaInicial: {
        allowNull: false,
        type: Sequelize.STRING
      },
      docaFinal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataInicio: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      },
      klmInicial: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      klmFinal: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Works');
  }
};