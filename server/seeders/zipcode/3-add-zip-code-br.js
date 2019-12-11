'use strict';
const fs = require('fs')
const path = require('path')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = fs.readFileSync(path.resolve(__dirname, './zipcode/zip_code_br.sql'), 'utf8').split(/\r?\n/);
    // .split(';');
    for (let query of sql) {
      await queryInterface.sequelize.query(query);
    }
    return;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'zip_code',
      schemaDelimiter: '.',
      tableName: 't_zip_code'
    }, null, {});
  }
};