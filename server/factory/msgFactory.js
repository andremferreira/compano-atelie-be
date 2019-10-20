// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
module.exports = function (cod) {
    // ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
    let fs = require('fs')
    let path = require('path')
    // ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
    let msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
    let dbMsg = JSON.parse(msgDb)
    // ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
    let dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
    let dconfig = JSON.parse(dConfig)
    let dLang = dconfig.dConfig.dlang
    if (!cod) {
        callback(new Error('Need a code to return information!'));
    } else {
        for (var idKeyA in dbMsg.messages) {
            if (dbMsg.messages[idKeyA].code == cod) {
                var codMsg = dbMsg.messages[idKeyA].msgObj
                var lang = dLang
                for (var idkeyB in codMsg) {
                    if (codMsg[idkeyB].lang == lang) {
                        var msgResp = codMsg[idkeyB]
                    }
                }
            }
        }
        return msgResp
    }
}