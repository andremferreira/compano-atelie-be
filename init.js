const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV.replace(' ','');
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), 'msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), 'server/dConfig/config.json'), 'utf8')
const dconfig = JSON.parse(dConfig)
const dLang = dconfig.dConfig.dlang
const showHToken = Boolean(dconfig.dConfig.dShowHeaderToken)
//*
// *********************************** TODO: MAKE FACTOR TO RETURN THIS INFORMATION **
for (var idKeyA in dbMsg.messages) {
    if (dbMsg.messages[idKeyA].code == "usr-0001") {
        var codErrMsg = dbMsg.messages[idKeyA].msgObj
        var lang = dLang
        for (var idkeyB in codErrMsg) {
            if (codErrMsg[idkeyB].lang == lang) {
                var msgReport = codErrMsg[idkeyB]
            }
        }
    }
}
//*/
// ----------------------------------- START APP USING EXPRESS ----------------------
const app = express();
// ----------------------------------- DEFINE USER PROFILE --------------------------
if (env == 'development') {
    //TODO: CREATE FACTOR TO RETURN LOG ON COLORS(RED,YELLOW,GREEN)
    console.log('• ' + msgReport.info + '\x1b[32mdevelopment\x1b[0m'+ '.') 
    const auth = require('./auth/userAuth')
    const logger = require('morgan');
    app.use(logger('dev'))
    process.env.NODE_ENV = 'development'
    // *********************************** TODO: MAKE FACTOR TO RETURN THIS INFORMATION **
    let usuarios = [{
        id_usuario: 1,
        vc_email: 'teste@teste.com',
        vc_password: 'TESTE!123@'
    }]
    let devTolk = auth.createIdToken(usuarios, true)
    if (showHToken) console.log('☻ Auth ► ' + '\x1b[33m' + 'access-token: ' + devTolk + '\x1b[0m')
//*/
} else if (env == 'test') {
    //TODO: CREATE FACTOR TO RETURN LOG ON COLORS(RED,YELLOW,GREEN)
    console.log('  • ' + msgReport.info + '\x1b[33mtest\x1b[0m' + '.')
    process.env.NODE_ENV = 'test'
} else {
    //TODO: CREATE FACTOR TO RETURN LOG ON COLORS(RED,YELLOW,GREEN)
    console.log('• ' + msgReport.info + '\x1b[31mproduction\x1b[0m' + '.')
    process.env.NODE_ENV = 'production'
}
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./server/routes')(app);

module.exports = app;