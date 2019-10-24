'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'services'
    }, {
      id_service: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_service_mnemonic: {
        allowNull: false,
        type: Sequelize.STRING(5),
        validate: {
          len: [5],
          msg: "Only allow values with length 5 characters."
        },
      },
      tx_service_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      tm_time_service_estimate: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      nu_material_cost: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
        defaultValue: 0.00
      },
      nu_third_party_cost: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
        defaultValue: 0.00
      },
      nu_service_cost: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2),
      },  
      bo_contact: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bo_critical_service: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: 'services'
    }, {
      force: true,
      cascade: true
    });
  }
};