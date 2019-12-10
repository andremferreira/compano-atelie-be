const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres')
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Client = sequelize.define('Client', {
      id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      vc_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_lastname: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      nu_code_area: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      nu_mobile: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      vc_contact: {
        type: DataTypes.STRING(30),
      },
      vc_email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100),
      },
      nu_social_security_code: {
        allowNull: false,
        unique: true,
        type: DataTypes.BIGINT,
      },
      nu_zip_code: {
        type: DataTypes.INTEGER,
      },
      vc_city: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_state: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_district: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_address: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      vc_address_number: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      vc_address_complement: {
        type: DataTypes.STRING(100),
      },
      vc_birthday: {
        type: DataTypes.STRING(5),
      }, 
      bo_promotion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ts_create: {
        allowNull: false,
        type: seq.DATE_NO_TZ,
        defaultValue: seq.fn('now'),
      },
      ts_update: {
        allowNull: false,
        type: seq.DATE_NO_TZ,
        defaultValue: seq.fn('now'),
      }
    }, {
    underscored: true,
    schema: 'atelie',
    timestamps: false
  });
  return Client;
};