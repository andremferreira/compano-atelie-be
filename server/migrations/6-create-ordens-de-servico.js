'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'ordens_de_servico'
    }, {
      id_ordem_de_servico: {
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
      id_orcamento: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'orcamentos'
          },
          key: 'id_orcamento'
        },
      },
      nu_valor_servico: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
      },  
      bo_cancelado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_recebido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_pago: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_entregue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      tableName: 'ordens_de_servico'
    }, {
      force: true,
      cascade: true
    });
  }
};