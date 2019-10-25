// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const User = require('../models').User;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return User
            .findAll()
            .then((user) => res.status(200).send(user))
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- COUNT ---------------------------------------
    count(req, res) {
        return User
            .findAndCountAll()
            //.findAndCountAll({ offset: 10, limit: 2})
            .then(user => {
                res.status(200).send({
                    'count': user.count
                })
            })
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- FIND BY ID -------------------------------------
    getById(req, res) {
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
                var errResp = msgF(error.original.code, req.query.lang)
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- ADD NEW -----------------------------------------
    add(req, res) {
        return User
            .create({
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                vc_email: req.body.vc_email || null,
                vc_password: req.body.vc_password || null,
                tx_image: req.body.tx_image || null,
                vc_password_reset: req.body.vc_password_reset || null,
                ts_exp_password_reset: req.body.ts_exp_password_reset || null
            })
            .then((user) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', user.id_user)
                return res.status(201).send({
                    success: true,
                    message: msgRpl
                })
            })
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                return res.status(400).send(errResp)
            })
    },

    updateTest(req, res) {
        console.log('entrou na rota')
        condition = {
            where: {
                id_user: req.params.id
            }
        }
        console.log(req.params.id)
        return User.update({
                vc_lastname: req.body.vc_lastname
            }, condition)
            .then(() => {
                return res.status(200).send({
                    sucesso: true,
                    modificacao: req.body.vc_lastname
                })
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
                    tx_image: req.body.tx_image || user.tx_image,
                    vc_password_reset: req.body.vc_password_reset || user.vc_password_reset,
                    ts_exp_password_reset: req.body.ts_exp_password_reset || user.ts_exp_password_reset,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang).info
                    msgRpl = msgResp.replace('%1', user.id_user)
                    return res.status(200).send({
                        success: true,
                        message: msgRpl
                    })
                })
                .catch((error) => {
                    var errResp = msgF(error.original.code, req.query.lang)
                    if (!errResp) {
                        return res.status(400).send(error)
                    } else {
                        return res.status(400).send(errResp)
                    }
                })
        })
    },
    // ----------------------------------- REMOVE BY ID ------------------------------------
    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return User
                    .destroy()
                    .then(() => {
                        var errResp = msgF('suc-0001', req.query.lang)
                        return res.status(204).send(errResp);
                    })
                    .catch((error) => {
                        var errResp = msgF(error.original.code, req.query.lang)
                        if (!errResp) {
                            return res.status(400).send(error)
                        } else {
                            return res.status(400).send(errResp)
                        }
                    });
            })
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- REMOVE BY EMAIL ------------------------------------
    deleteByEmail(req, res, condition) {
        condition = {
            where: {
                vc_email: req.params.email
            }
        }
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
                        var errResp = msgF(error.original.code, req.query.lang)
                        if (!errResp) {
                            return res.status(400).send(error)
                        } else {
                            return res.status(400).send(errResp)
                        }
                    });
            })
    }
}