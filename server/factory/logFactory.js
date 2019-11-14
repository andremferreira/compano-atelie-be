function logRegister(str = '', action) {
    if (str) {
        const fs = require('fs')
        const path = require('path')
        const Path = path.resolve(__dirname)
        const logPath = path.resolve(Path, '../../msg/log')
        const dConfig = fs.readFileSync(path.resolve(Path, '../dConfig/config.json'), 'utf8')
        const config = JSON.parse(dConfig)
        const dLog = config.dConfig.dLog
        const dtCurr = require('../util/currentTimeStamp')
        const auth = require('../../auth/userAuth')
        if (dLog.active){
            let data = {} 
            if (!fs.existsSync(logPath)){
                fs.mkdirSync(logPath);
                if(!fs.existsSync(path.resolve(logPath + '/.seq.txt'))) {
                    fs.writeFileSync(path.resolve(logPath + '/.seq.txt'), 0, (err) => {
                        if(err) throw err
                    })
                }
            }
            if(dLog.uniqueId) {
                var uId = auth.genJti()
                data.uId = uId
            } else {
                var id = parseInt(fs.readFileSync(path.resolve(logPath + '/.seq.txt'))) + 1 || 1
                data.id = id
                fs.writeFileSync(path.resolve(logPath + '/.seq.txt'), id, (err) => {
                    if(err) throw err
                })
            }
            data.message = str
            if (dLog.actionRegister && typeof action != 'undefined') data.action = action
            if (dLog.dateTimeRegister) {
                dt = new dtCurr
                data.tsReg = dt.timestamp
            }
            if ( fs.existsSync( path.resolve(logPath + '/.log.txt') ) ) {
                fs.appendFileSync(path.resolve(logPath + '/.log.txt'), ',\n'+ JSON.stringify(data), (err) =>{
                    if (err) throw err
                })
            } else {
                fs.writeFileSync(path.resolve(logPath + '/.log.txt'), JSON.stringify(data), (err) =>{
                    if (err) throw err
                }) 
            }
        }
    }
}

module.exports = {
    logRegister
}