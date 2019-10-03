'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'orcamentos'
    }, {
      id_orcamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'clientes'
          },
          key: 'id_cliente'
        },
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'usuarios'
          },
          key: 'id_usuario'
        },
      },
      js_servicos_orcados: {
        type: Sequelize.JSON,
        allowNull: false
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
      tableName: 'orcamentos'
    }, {
      force: true,
      cascade: true
    });
  }
};