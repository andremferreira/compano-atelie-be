// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
module.exports = function (cod, lang) {
    if (!cod || cod.length === 0) throw new Error('Need a code to return the information!');
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
    let msgResp = { nF: false }
    // ----------------------------------- VERIFY LAG VARIABLE --------------------------
    if (!lang) lang = dLang
    // ----------------------------------- VERIFY COD VARIABLE --------------------------
    for (var idKeyA in dbMsg.messages) {
        if (dbMsg.messages[idKeyA].code == cod) {
            var codMsg = dbMsg.messages[idKeyA].msgObj
            for (var idkeyB in codMsg) {
                if (codMsg[idkeyB].lang == lang) {
                    msgResp = codMsg[idkeyB]
                }
            }
        }
    }
    // ----------------------------------- VERIFY EXISTS MSG DEFAULT --------------------
    if (msgResp.nF == false ) {
        console.log('nao encontrado')
        msgResp = { nF: true }
    }
    return msgResp
}