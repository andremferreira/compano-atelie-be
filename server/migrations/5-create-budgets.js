'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'budgets'
    }, {
      id_budget: {
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
      js_budget_service: {
        type: Sequelize.JSON,
        allowNull: false
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
      tableName: 'budgets'
    }, {
      force: true,
      cascade: true
    });
  }
};