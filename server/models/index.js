'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
const dconfig = JSON.parse(dConfig)
const dLang = dconfig.dConfig.dlang
// ----------------------------------- INITIALIZATION DB SEQUELIZE CONECTION ---------
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established with success!')
    })
    .catch(err => {
      for (var idKeyA in dbMsg.messages) {
        if (dbMsg.messages[idKeyA].code == err.original.code) {
          var codErrMsg = dbMsg.messages[idKeyA].msgObj
          var lang = dLang
          var idError = idKeyA
          for (var idkeyB in codErrMsg) {
            if (codErrMsg[idkeyB].lang == lang) {
              var errResp = codErrMsg[idkeyB]
            }
          }
        }
      }
      console.error(`ErrorID: ${idError}\n`, errResp)
    })
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  sequelize
    .authenticate()
    .then(() => {
      
      for (var idKeyA in dbMsg.messages) {
        if (dbMsg.messages[idKeyA].code == "suc-0003") {
          var codErrMsg = dbMsg.messages[idKeyA].msgObj
          var lang = dLang
          for (var idkeyB in codErrMsg) {
            if (codErrMsg[idkeyB].lang == lang) {
              var msgReport = codErrMsg[idkeyB]
            }
          }
        }
      }
      if (env !== 'test') console.log(msgReport.info)
    })
    .catch(err => {
      for (var idKeyA in dbMsg.messages) {
        if (dbMsg.messages[idKeyA].code == err.original.code) {
          var codErrMsg = dbMsg.messages[idKeyA].msgObj
          var lang = dLang
          var idError = idKeyA
          for (var idkeyB in codErrMsg) {
            if (codErrMsg[idkeyB].lang == lang) {
              var errResp = codErrMsg[idkeyB]
            }
          }
        }
      }
      console.error(`ErrorID: ${idError}\n`, errResp)
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