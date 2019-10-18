// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize');
const config = require('../server/config/config.json').test
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../msg/db/db.json'), 'utf8')
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../server/dConfig/config.json'), 'utf8')
const dconfig = JSON.parse(dConfig)
const dLang = dconfig.dConfig.dlang
const dbMsg = JSON.parse(msgDb)
const space = '  '
// ----------------------------------- VALIDATION VARIABLE ---------------------------
describe('Sequelize conection..', function () {
    it('Try connect to database using sequelize', function testSlash(done) {
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
                  console.log(`\x1b[32m${space}${msgReport.info}\x1b[0m`)
                done() 
            })
            .catch(err => { if (!err) throw (err) })
    })
})