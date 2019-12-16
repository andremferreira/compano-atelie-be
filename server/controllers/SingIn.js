// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory');
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/SingIn.js', call: 'Singin' } 
// ----------------------------------- AUTH ------------------------------------------
const Auth = require('../../auth/userAuth');
module.exports = {
    // ----------------------------------- SINGIN -------------------------------------
    singIn(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Login requestion.', action )
        if (!req.body.email || !req.body.password) {
            var errResp = msgF('err-0004', req.query.lang)
            return res.status(400).send(errResp);
        } else {
            let condition = {
                where: {
                    vc_email: req.body.email
                }
            }
            return User
                .findAll(condition)
                .then((user) => {
                    if (!user) {
                        var errResp = msgF('err-0005', req.query.lang)
                        return res.status(400).send(errResp);
                    } else {
                        let userSmall = {
                            id: user[0].dataValues.id_user,
                            name: user[0].dataValues.vc_name,
                            hash:  user[0].dataValues.vc_password,
                            lastname: user[0].dataValues.vc_lastname,
                            email: user[0].dataValues.vc_email,
                            profile: user[0].dataValues.in_profile || 2,
                            avatar: user[0].dataValues.tx_image
                        }
                        const isMatch = Auth.verifySingIn(req.body.password, userSmall)
                        if (isMatch.auth) {
                            return res.status(200).send({token: isMatch.Authorization, user: isMatch.data} );
                        } else {
                            var errResp = msgF('err-0006', req.query.lang)
                            return res.status(401).send(errResp);
                        }
                    }
                })
                .catch((error) => {
                        var errResp = msgF('err-0005', req.query.lang)
                        return res.status(400).send(errResp);
                });
        }
    }
}