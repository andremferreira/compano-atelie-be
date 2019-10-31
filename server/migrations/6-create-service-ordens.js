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
      id_service_owner: {
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
      id_budget: {
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
      nu_vservice: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
      },  
      bo_canceled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_received: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bo_delivered: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      ts_create: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      },
      ts_update: {
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