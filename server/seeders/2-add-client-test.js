'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'clientes'
    }, [{
      vc_nome: 'NOME-TESTE-1',
      vc_sobrenome: 'SOBRENOME-TESTE-1',
      nu_ddd: 85,
      nu_celular: 999999999,
      vc_contato: 'CONTATO-TESTE-1',
      vc_email: 'EMAIL@TESTE-1.COM',
      nu_cpf: 31273587872,
      nu_cep: 60170000,
      vc_cidade: 'FORTALEZA',
      vc_estado: 'CEARA',
      vc_bairro: 'MEIRELES',
      vc_endereco: 'AV. DESEMBARGADOR MOREIRA',
      vc_endereco_numero: '505',
      vc_endereco_complemento: 'APTO 3001',
      vc_aniversario: '12/12',
    }], {})
    .then((success) => console.log("Initial populate of test-1 client done!"))
    .catch((error) => console.log("Already populated!"));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'clientes'
    }, null, {});
  },
}