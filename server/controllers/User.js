// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT AND LOG --------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/User.js', call: 'User' } 
// ----------------------------------- AUTH ------------------------------------------
const Auth = require('../../auth/userAuth');
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findAll()
            .then((user) => { 
                return res.status(200).send(user) 
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
    },
    listSmall(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findAll({attributes: ['id_user', 'vc_name', 'vc_lastname', 'vc_email', 'in_profile']})
            .then((user) => { 
                return res.status(200).send(user) 
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
    },
    // ----------------------------------- COUNT ---------------------------------------
    count(req, res) {
        action.method = 'Count'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findAndCountAll()
            //.findAndCountAll({ offset: 10, limit: 2})
            .then(user => {
                res.status(200).send({
                    'count': user.count
                })
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
    },
    // ----------------------------------- FIND BY ID -------------------------------------
    getById(req, res) {
        action.method = 'getById'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(user);
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
    },
    // ----------------------------------- ADD NEW -----------------------------------------
    add(req, res) {
        if (!req.body.vc_password) { 
            return res.status(404).send(msgF('err-0002', req.query.lang)) 
        } 
        action.method = 'add'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        let pwd = Auth.encryptPwd(req.body.vc_password)
        return User
            .create({
                id_user: req.body.id_user || null,
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                vc_email: req.body.vc_email || null,
                vc_password: pwd,
                in_profile: req.body.it_profile || 2,
                tx_image: req.body.tx_image || null,
                vc_password_reset: req.body.vc_password_reset || null,
                ts_exp_password_reset: req.body.ts_exp_password_reset || null
            })
            .then((user) => {
                var msgResp = msgF('suc-0002', req.query.lang, [user.id_user])
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
    // ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
        nDate = new dtCurr
        condition = {
            where: {
                id_user: req.params.id
            }
        }
        action.method = 'update'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findByPk(req.params.id).
        then((user) => {
            if (!user || Object.keys(user).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return User
                .update({
                    vc_name: req.body.vc_name || user.vc_name,
                    vc_lastname: req.body.vc_lastname || user.vc_lastname,
                    vc_email: req.body.vc_email || user.vc_email,
                    vc_password: req.body.vc_password || user.vc_password,
                    in_profile: req.body.it_profile || user.it_profile,
                    tx_image: req.body.tx_image || user.tx_image,
                    vc_password_reset: req.body.vc_password_reset || user.vc_password_reset,
                    ts_exp_password_reset: req.body.ts_exp_password_reset || user.ts_exp_password_reset,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang, [user.id_user])
                    return res.status(200).send(msgResp)
                })
                .catch((error) => {
                    var v = myUtl.myInspect(error, ['original','code'])
                    if (!v) {
                        return res.status(400).send(error)
                    } else {
                        var errResp = msgF(error.original.code, req.query.lang)
                        return res.status(400).send(errResp)
                    }
                })
        })
    },
    // ----------------------------------- REMOVE BY ID ------------------------------------
    delete(req, res) {
        condition = {
            where: {
                id_user: req.params.id
            }
        }
        action.method = 'delete'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return User
                    .destroy(condition)
                    .then(() => {
                        var errResp = msgF('suc-0001', req.query.lang)
                        return res.status(204).send(errResp);
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
            })
    },
    // ----------------------------------- REMOVE BY EMAIL ------------------------------------
    deleteByEmail(req, res, condition) {
        condition = {
            where: {
                vc_email: req.params.email
            }
        }
        action.method = 'deleteByEmail'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        return User
            .findAll(condition)
            .then(user => {
                if (!user || Object.keys(user).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return User
                    .destroy(condition)
                    .then(() => {
                        var msgResp = msgF('suc-0001', req.query.lang)
                        return res.status(200).send(msgResp)
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
            })
    }
}