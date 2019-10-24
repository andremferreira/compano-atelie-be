'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'clients'
    }, [{
      vc_name: 'NOME-TESTE-1',
      vc_lastname: 'SOBRENOME-TESTE-1',
      nu_code_area: 85,
      nu_mobile: 999999999,
      vc_contact: 'CONTATO-TESTE-1',
      vc_email: 'EMAIL@TESTE-1.COM',
      nu_social_security_code: 31273587872,
      nu_zip_code: 60170000,
      vc_city: 'FORTALEZA',
      vc_state: 'CEARA',
      vc_district: 'MEIRELES',
      vc_address: 'AV. DESEMBARGADOR MOREIRA',
      vc_address_number: '505',
      vc_address_complement: 'APTO 3001',
      vc_birthday: '12/12'
    }], {})
    .then((success) => console.log("Initial populate of test-1 client done!"))
    .catch((error) => console.log("Already populated!"));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'clients'
    }, null, {});
  },
}