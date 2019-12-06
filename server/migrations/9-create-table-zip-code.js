'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'zip_code',
      schemaDelimiter: '.',
      modelName: 'zip_code',
      tableName: 't_zip_code'
    }, {
      id_zip_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_country_code: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      vc_zip_code: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      vc_district: {
        type: Sequelize.STRING(100),
      },
      vc_address: {
        type: Sequelize.STRING(250),
      },
      vc_city: {
        type: Sequelize.STRING(70),
      },
      vc_state: {
        type: Sequelize.STRING(50),
      },
      vc_state_code: {
        type: Sequelize.STRING(3),
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
      schema: 'zip_code',
      schemaDelimiter: '.',
      modelName: 'zip_code',
      tableName: 't_zip_code'
    }, {
      force: true,
      cascade: true
    });
  }
};