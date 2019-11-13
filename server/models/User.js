'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const User = sequelize.define('User', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    vc_name: {
      allowNull: false,
      type: Sequelize.STRING(50),
    },
    vc_lastname: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    vc_email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(100),
    },
    vc_password: {
      allowNull: false,
      type: Sequelize.STRING(64)
    },
    it_profile: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    tx_image: {
      type: Sequelize.TEXT
    },
    vc_password_reset: {
      type: Sequelize.STRING(64)
    },
    ts_exp_password_reset: {
      type: seq.DATE_NO_TZ
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
  return User;
};