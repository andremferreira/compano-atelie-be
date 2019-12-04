// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
        // ----------------------------------- LIST SMALL PAGINATOR --------------------------------------
    listSmall(req, res) {
        action.method = 'listSmall'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const offset = (( page - 1 )  * limit)
        const usrId = req.query.id || 1
        const perfil = req.query.pf || 1
        return User
            .findAndCountAll(
                        { attributes: ['id_user', 'vc_name', 'vc_lastname', 'vc_email', 'in_profile'], 
                          where: { id_user: { [Op.ne] : usrId }, in_profile: { [Op.gt] : perfil } }, 
                          limit: limit, 
                          offset: offset 
                        }
                    )
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
        let fieldsReq = msgF('req-usr-01', req.query.lang).info
        if (req.body.vc_name) fieldsReq.splice(0,1)
        if (req.body.vc_lastname) fieldsReq.splice(0,1)
        if (req.body.vc_email) fieldsReq.splice(0,1)
        if (req.body.in_profile) fieldsReq.splice(0,1)
        if (req.body.vc_password) fieldsReq.splice(0,1)
        if (req.body.vc_repassword) fieldsReq.splice(0,1)

        if (fieldsReq.length) { 
            var fields = ''
            for (var x in fieldsReq) {
                console.log(fieldsReq[x])
                fields = x==0 ? fieldsReq[x] : fields + ', ' + fieldsReq[x] 
            }
            return res.status(404).send(msgF('err-0007', req.query.lang, [fields])) 

        } 
        if ( req.body.vc_password !== req.body.vc_repassword ) return res.status(404).send(msgF('err-0008', req.query.lang)) 
        action.method = 'add'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('User requestion.', action )
        let pwd = Auth.encryptPwd(req.body.vc_password)
        return User
            .create({
                id_user: req.body.id_user || null,
                vc_name: `${req.body.vc_name}`.toUpperCase() || null,
                vc_lastname: `${req.body.vc_lastname}`.toUpperCase() || null,
                vc_email: `${req.body.vc_email}`.toLowerCase() || null,
                vc_password: pwd,
                in_profile: req.body.in_profile || 2,
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
        let pwd = req.body.password
        if ( req.body.password !== req.body.vc_repassword ) return res.status(404).send(msgF('err-0008', req.query.lang)) 
        pwd = pwd ? Auth.encryptPwd(pwd) : null
        return User
            .findByPk(req.params.id).
        then((user) => {
            if (!user || Object.keys(user).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return User
                .update({
                    vc_name: `${req.body.vc_name}`.toUpperCase() || `${user.vc_name}`.toUpperCase(),
                    vc_lastname: `${req.body.vc_lastname}`.toUpperCase() || `${user.vc_lastname}`.toUpperCase(),
                    vc_email: `${req.body.vc_email}`.toLowerCase() || `${user.vc_email}`.toLowerCase(),
                    vc_password: pwd || user.vc_password,
                    in_profile: req.body.in_profile || user.in_profile,
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
                        return res.status(200).send(errResp);
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