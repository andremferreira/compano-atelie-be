'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    vc_nome: {
      allowNull: false,
      type: Sequelize.STRING(50),
      validate: {
        len: [3, 100],
        msg: "Only allow values with length between 3 and 50 characters."
      },
    },
    vc_sobrenome: {
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
    vc_senha: {
      allowNull: false,
      type: Sequelize.STRING(64)
    },
    tx_imagem: {
      type: Sequelize.TEXT
    },
    vc_reset_senha: {
      type: Sequelize.STRING(64)
    },
    dt_exp_reset: {
      type: Sequelize.TIME
    },
    dt_cadastro: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    },
    dt_atualiacao: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    }
  }, {
    underscored: true,
    schema: 'atelie',
    timestamps: false
  });
  //   Usuarios.associate = function (models) {
  //     Group.hasMany(models.Jsontable, {
  //       foreignKey: 'isn_group',
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE'
  //     });
  //     Group.schema('cog')
  //   };
  return Usuario;
};