'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'usuarios'
    }, {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_nome: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 100],
          msg: "Only allow values with length between 3 and 50 characters."
        },
      },
      vc_sobrenome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          len: [5, 100],
          msg: "Only allow values with length between 5 and 100 characters."
        },
      },
      vc_email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
        validate: {
          len: [5, 100],
          msg: "Only allow values with length between 5 and 100 characters."
        },
      },
      vc_senha: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      tx_imagem: {
        type: Sequelize.TEXT
      },
      vc_reset_senha: {
        type: Sequelize.STRING(64)
      },
      dt_exp_reset: {
        type: sequelize.DATE_NO_TZ
      },
      dt_cadastro: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      },
      dt_atualiacao: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      }
    }, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'usuarios'
    }, {
      force: true,
      cascade: true
    });
  }
};