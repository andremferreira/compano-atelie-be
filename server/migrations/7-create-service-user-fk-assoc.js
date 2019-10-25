const tableName = 'services';
const schemeName = 'atelie'
const constraintName = 'services_id_user_fkey';
const fkId = 'id_user'
const tbDestiny = 'users'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`alter table "${schemeName}"."${tableName}" drop constraint "${constraintName}"`)
      .then(() => queryInterface.sequelize.query(
        `alter table "${schemeName}"."${tableName}"
          add constraint "${constraintName}" foreign key("${fkId}") references "${schemeName}"."${tbDestiny}" ("${fkId}")
          on update cascade on delete no action`
      ));
  },
  down: (queryInterface, Sequelize, next) => {
    return next();
  },
};