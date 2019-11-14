// ----------------------------------- LOG REGISTER AND MSG FACTORY ----------------------
const Log = require ('./server/factory/logFactory')
const color = require('./server/util/consoleLogColor')
const msgF = require('./server/factory/msgFactory')
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE -------------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- DEFAULT CONFIGURATION  ----------------------------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), 'server/dConfig/config.json'), 'utf8')
const dconfig = JSON.parse(dConfig)
const showHToken = Boolean(dconfig.dConfig.dShowHeaderToken)
// ----------------------------------- DEFAULT MIDDLES  ----------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// ----------------------------------- START APP USING EXPRESS ---------------------------
const app = express();
const Welcome = msgF('usr-0001').info 
const auth = require('./auth/userAuth')
// ----------------------------------- DEFINE USER PROFILE -------------------------------
let env = process.env.NODE_ENV;
    env = env.replace(' ','');
if (env == 'development') {
    console.log( color('f-green','---------------------DEVLOPMENT------------------------') )
    console.log(color('f-hidden','<#>') + Welcome + color('f-green', 'development') + '.') 
    app.use(logger('dev'))
    process.env.NODE_ENV = 'development'
    let usuarios = [{id_usuario: 1, vc_email: 'teste@teste.com', vc_password: 'TESTE!123@'}]
    let devTolk = auth.createIdToken(usuarios, true)
    if (showHToken) console.log('☻ Auth ► ' + color('f-yellow', 'access-token: ' + devTolk ))
    Log.logRegister('Start app on dev mode.', dconfig.dConfig.dLog)
} else if (env == 'test') {
    console.log('  • ' + Welcome + color('f-yellow', 'test'))
    process.env.NODE_ENV = 'test'
    Log.logRegister('Start app on test mode.', dconfig.dConfig.dLog)
} else {
    console.log('• ' + Welcome + color('f-red', 'production'))
    process.env.NODE_ENV = 'production'
    Log.logRegister('Start app on prod mode.', dconfig.dConfig.dLog)
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./server/routes')(app);

module.exports = app;