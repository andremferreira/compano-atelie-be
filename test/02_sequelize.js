// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const Sequelize = require('sequelize');
const config = require('../server/config/config.json').test
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// ----------------------------------- CONSOLE.LOG COLOR HELPER -----------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ------------------------
const msgF  = require('../server/factory/msgFactory')
// ----------------------------------- AJUST OF TEXT OUTPUT TAB SHOW ------------------
const space = '  '
// ----------------------------------- VALIDATION VARIABLE ----------------------------
describe(msgF('tst-0005').title, function () {
    it(color('f-yellow','└') + color('f-hidden', msgF('tst-0006').info), function testSlash(done) {
        sequelize
            .authenticate()
            .then(() => { 
                console.log(color('f-green', space + msgF('suc-0003').info))
                done() 
            })
            .catch(err => { if (!err) throw (err) })
    })
})