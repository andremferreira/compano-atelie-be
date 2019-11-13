function logRegister(str = '', action) {
    if (str) {
        const bcrypt = require('bcrypt')
        const fs = require('fs')
        const path = require('path')
        const Path = path.resolve(__dirname)
        const dConfig = fs.readFileSync(path.resolve(Path, '../dConfig/config.json'), 'utf8')
        const config = JSON.parse(dConfig)
        const dLog = config.dConfig.dLog
        const dtCurr = require('../util/currentTimeStamp')
        const auth = require('../../auth/userAuth')
        if (dLog.active){
            let data = {} 
            if(dLog.uniqueId) {
                var uId = auth.genJti()
                data.uId = uId
            }
            data.message = str
            if (dLog.actionRegister && typeof action != 'undefined') data.action = action
            if (dLog.dateTimeRegister) {
                dt = new dtCurr
                data.tsReg = dt.timestamp
            }
            if ( fs.existsSync(path.resolve(Path, '../../msg/log/log.txt') ) ) {
                fs.appendFileSync(path.resolve(Path, '../../msg/log/log.txt'), ',\n'+ JSON.stringify(data), (err) =>{
                    if (err) throw err
                })
            } else {
                fs.writeFileSync(path.resolve(Path, '../../msg/log/log.txt'), JSON.stringify(data), (err) =>{
                    if (err) throw err
                }) 
            }
        }
    }
}

module.exports = {
    logRegister
}