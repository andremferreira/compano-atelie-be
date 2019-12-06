// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const ZipCode = require('../models').ZipCode;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT AND LOG --------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/ZipCode.js', call: 'ZipCode' } 
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- FIND BY ID -------------------------------------
    getByZipCode(req, res) {
        action.method = 'getByZipCode'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('ZipCode requestion.', action )
        condition = { where: { vc_zip_code: req.query.zipcode } }
        console.log(condition)
        return ZipCode
            .findAll(condition)
            .then((zipCode) => {
                if (!zipCode) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(zipCode);
            })
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v) {
                    return res.status(400).send(error)
                } else {
                    var errResp = msgF(error.original.code, req.query.lang)
                    return res.status(400).send(errResp)
                }
            });
    }
}