'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'servicos'
    }, {
      id_servico: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_codigo: {
        allowNull: false,
        type: Sequelize.STRING(5),
        validate: {
          len: [5],
          msg: "Only allow values with length 5 characters."
        },
      },
      tx_servico: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      tm_realizacao_servico: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      nu_custo_material: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
        defaultValue: 0.00
      },
      nu_custo_terceiros: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
        defaultValue: 0.00
      },
      nu_custo_servico: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
      },  
      bo_contato: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bo_critico: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: 'servicos'
    }, {
      force: true,
      cascade: true
    });
  }
};