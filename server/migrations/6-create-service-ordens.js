'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'service_orders'
    }, {
      id_service_order: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_client: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'clients'
          },
          key: 'id_client'
        },
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'users'
          },
          key: 'id_user'
        },
      },
      id_orcamento: {
        allowNull: false,
        type: Sequelize.INTEGER,
        schema: 'atelie',
        references: {
          model: {
            schema: 'atelie',
            tableName: 'budgets'
          },
          key: 'id_budget'
        },
      },
      nu_value_of_service: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
      },  
      bo_canceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_received: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_delivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dt_create: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      },
      dt_update: {
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
      tableName: 'service_orders'
    }, {
      force: true,
      cascade: true
    });
  }
};