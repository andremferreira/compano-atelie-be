// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory');
// ----------------------------------- AUTH ------------------------------------------
const Auth = require('../../auth/userAuth');
module.exports = {
    // ----------------------------------- SINGIN -------------------------------------
    singIn(req, res) {
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
                            profile: user[0].dataValues.it_profile || 2
                        }
                        const isMatch = Auth.verifySingIn(req.body.password, userSmall)
                        if (isMatch.auth) {
                            return res.status(200).send({token: isMatch.authToken, user: isMatch.data} );
                        } else {
                            var errResp = msgF('err-0006', req.query.lang)
                            return res.status(401).send(errResp);
                        }
                    }
                })
                .catch((error) => {
                        return res.status(400).send(error)
                });
        }
    }
}