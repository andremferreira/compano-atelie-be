const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres')
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Cliente = sequelize.define('Cliente', {
      id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_nome: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_sobrenome: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      nu_ddd: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      nu_celular: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      vc_contato: {
        type: DataTypes.STRING(30),
      },
      vc_email: {
        unique: true,
        type: DataTypes.STRING(100),
      },
      nu_cpf: {
        allowNull: false,
        unique: true,
        type: DataTypes.BIGINT,
      },
      nu_cep: {
        type: DataTypes.INTEGER,
      },
      vc_cidade: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_estado: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      vc_endereco: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      vc_endereco_numero: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      vc_endereco_complemento: {
        type: DataTypes.STRING(100),
      },
      vc_aniversario: {
        type: DataTypes.STRING(5),
      }, 
      bo_promocao: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
  return Cliente;
};