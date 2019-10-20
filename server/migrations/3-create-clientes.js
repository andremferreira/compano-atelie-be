'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'atelie',
      schemaDelimiter: '.',
      modelName: 'atelie',
      tableName: 'clientes'
    }, {
      id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      vc_nome: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 50],
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
      nu_ddd: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      nu_celular: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      vc_contato: {
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
      nu_cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.BIGINT,
      },
      nu_cep: {
        type: Sequelize.INTEGER,
      },
      vc_cidade: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_estado: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_bairro: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
          msg: "Only allow values with length between 5 and 50 characters."
        },
      },
      vc_endereco: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          len: [5, 100],
          msg: "Only allow values with length between 5 and 100 characters."
        },
      },
      vc_endereco_numero: {
        allowNull: false,
        type: Sequelize.STRING(10),
        validate: {
          len: [2, 10],
          msg: "Only allow values with length between 2 and 10 characters."
        },
      },
      vc_endereco_complemento: {
        type: Sequelize.STRING(100),
        validate: {
          len: [4, 100],
          msg: "Only allow values with length between 4 and 100 characters."
        },
      },
      vc_aniversario: {
        type: Sequelize.STRING(5),
        validate: {
          len: [5],
          msg: "Only allow values with 5 characters."
        },
      },
      bo_promocao: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      dt_cadastro: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      },
      dt_atualiacao: {
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
      tableName: 'clientes'
    }, {
      force: true,
      cascade: true
    });
  }
};