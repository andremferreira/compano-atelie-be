'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Service = sequelize.define('Service', {
    id_service: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    vc_service_mnemonic: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(5),
    },
    tx_service_description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    vc_time_service_estimate: {
      allowNull: false,
      type: Sequelize.TIME,
    },
    nu_material_cost: {
      allowNull: false,
      type: Sequelize.NUMERIC(10,2)
    },
    nu_third_party_cost: {
      allowNull: false,
      type: Sequelize.NUMERIC(10,2)
    },
    vc_contact: {
      type: Sequelize.STRING(64)
    },
    bo_critical_service: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
  return Service;
};