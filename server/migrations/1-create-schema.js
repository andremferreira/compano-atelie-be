'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema('atelie');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema('atelie');
  }
};