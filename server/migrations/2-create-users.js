'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'users'
    }, {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 50],
          msg: "Only allow values with length between 3 and 50 characters."
        },
      },
      vc_lastname: {
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
      vc_password: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      in_profile: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 2
      },
      tx_image: {
        type: Sequelize.TEXT
      },
      vc_password_reset: {
        type: Sequelize.STRING(64)
      },
      ts_exp_password_reset: {
        type: sequelize.DATE_NO_TZ
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
      tableName: 'users'
    }, {
      force: true,
      cascade: true
    });
  }
};