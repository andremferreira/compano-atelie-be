'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema('zip_code');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema('zip_code');
  }
};