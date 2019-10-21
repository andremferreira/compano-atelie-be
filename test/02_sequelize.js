// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const Sequelize = require('sequelize');
const configT = require('../server/config/config.json').test
const configD = require('../server/config/config.json').development
const configP = require('../server/config/config.json').production
const sequelizeT = new Sequelize(configT.database, configT.username, configT.password, configT);
const sequelizeD = new Sequelize(configD.database, configD.username, configD.password, configD);
const sequelizeP = new Sequelize(configP.database, configP.username, configP.password, configP);
// ----------------------------------- CONSOLE.LOG COLOR HELPER -----------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ------------------------
const msgF  = require('../server/factory/msgFactory')
// ----------------------------------- AJUST OF TEXT OUTPUT TAB SHOW ------------------
const space = '  '
// ----------------------------------- VALIDATION VARIABLE ----------------------------
describe(color('f-yellow','► ') + msgF('tst-0005').title, function () {
    it(color('f-yellow','├') + color('f-hidden', msgF('tst-0006').info + ' | ') + color('f-green','DEV'), function testSlash(done) {
        sequelizeD
            .authenticate()
            .then(() => { 
                //console.log(color('f-green', space + msgF('suc-0003').info))
                done() 
            })
            .catch(err => { if (!err) throw (err) })
    })

    it(color('f-yellow','├') + color('f-hidden', msgF('tst-0006').info  + ' | ')  + color('f-yellow','TEST'), function testSlash(done) {
        sequelizeT
            .authenticate()
            .then(() => { 
                //console.log(color('f-green', space + msgF('suc-0003').info))
                done() 
            })
            .catch(err => { if (!err) throw (err) })
    })

    it(color('f-yellow','└') + color('f-hidden', msgF('tst-0006').info + ' | ') + color('f-red','PROD'), function testSlash(done) {
        sequelizeP
            .authenticate()
            .then(() => { 
                //console.log(color('f-green', space + msgF('suc-0003').info))
                done() 
            })
            .catch(err => { if (!err) throw (err) })
    })
})
