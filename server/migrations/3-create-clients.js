'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'clients'
    }, {
      id_client: {
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
      vc_code_area: {
        allowNull: false,
        type: Sequelize.STRING(3),
      },
      vc_mobile: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      vc_contact: {
        type: Sequelize.STRING(30),
        validate: {
          len: [3, 30],
          msg: "Only allow values with length between 3 and 30 characters."
        },
      },
      vc_email: {
        unique: true,
        type: Sequelize.STRING(100),
        validate: {
          len: [10, 100],
          msg: "Only allow values with length between 10 and 100 characters."
        },
      },
      vc_social_security_code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20),
      },
      vc_zip_code: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      vc_city: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_state: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_district: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_address: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          len: [5, 100],
          msg: "Only allow values with length between 5 and 100 characters."
        },
      },
      vc_address_number: {
        allowNull: false,
        type: Sequelize.STRING(10),
        validate: {
          len: [2, 10],
          msg: "Only allow values with length between 2 and 10 characters."
        },
      },
      vc_address_complement: {
        type: Sequelize.STRING(100),
        validate: {
          len: [4, 100],
          msg: "Only allow values with length between 4 and 100 characters."
        },
      },
      vc_birthday: {
        type: Sequelize.STRING(5),
        validate: {
          len: [5],
          msg: "Only allow values with 5 characters."
        },
      },
      bo_promotion: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: 'clients'
    }, {
      force: true,
      cascade: true
    });
  }
};