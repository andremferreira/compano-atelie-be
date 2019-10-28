// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs');
const path = require('path');
// ----------------------------------- INITIAL SEQUELIZE AND DATA BASE ---------------
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
// ----------------------------------- INITIAL ENV CONFIGURATION ---------------------
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- INITIALIZATION DB SEQUELIZE CONECTION ---------
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize
    .authenticate()
    .then(() => {
      var msgRsp = msgF("suc-0003", '') 
      console.log(msgResp.info)
    })
    .catch(err => {
      var errResp = msgF(err.original.code, '')
      console.error(`ErrorID: ${idError}\n`, errResp.info)
    })
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  sequelize
    .authenticate()
    .then(() => {
      var msgRsp = msgF("suc-0003", '') 
      if (env !== 'test') console.log(msgRsp.info)
    })
    .catch(err => {
      var errResp = msgF(err.original.code, '')
      console.error(`ErrorID: ${idError}\n`, errResp.info)
    })
}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;