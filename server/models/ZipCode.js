'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const ZipCode = sequelize.define('ZipCode', {
    id_zip_code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    vc_country_code: {
      allowNull: false,
      type: Sequelize.STRING(50),
    },
    vc_zip_code: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    vc_district: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(100),
    },
    vc_address: {
      allowNull: false,
      type: Sequelize.STRING(64)
    },
    vc_city: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    vc_state: {
      type: Sequelize.TEXT
    },
    vc_state_code: {
      type: Sequelize.STRING(64)
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
    schema: 'zip_code',
    tableName:'t_zip_code',
    timestamps: false
  });
  return ZipCode;
};