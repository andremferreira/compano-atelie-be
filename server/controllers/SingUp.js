// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory');
const Log = require ('../factory/logFactory');
const myUtl = require('../util/myInspect');
const action = { file: './service/controllers/SingUp.js', call: 'SingUp' } 
// ----------------------------------- AUTH ------------------------------------------
const Auth = require('../../auth/userAuth');
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
const sysUserImg = fs.readFileSync(path.resolve(path.resolve(__dirname), '../img/SysAdmImg.png')).toString('base64')
module.exports = {
    // ----------------------------------- SINGIN -------------------------------------
    singUp(req, res) {
        if ( req.body.password !== req.body.repassword ) return res.status(404).send(msgF('err-0008', req.query.lang)) 
        action.method = 'SingUp'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User singup requestion.', action )
        let pwd = Auth.encryptPwd(req.body.password)
        return User
            .create({
                vc_name: `${req.body.name}`.toUpperCase(),
                vc_lastname: '...',
                vc_email: `${req.body.email}`.toLowerCase(),
                vc_password: pwd,
                in_profile: 4,
                tx_image: sysUserImg
            })
            .then((user) => {
                var msgResp = msgF('suc-0002', req.query.lang, [user.vc_email])
                return res.status(201).send(msgResp)
            })
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v){
                    return res.status(400).send(error)
                }else{
                    var errResp = msgF(error.original.code, req.query.lang)
                    return res.status(400).send(errResp)
                }
            })
    },
}