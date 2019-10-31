// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const ServiceOrder = require('../models').ServiceOrder;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return ServiceOrder
            .findAll()
            .then((serviceOrder) => res.status(200).send(serviceOrder))
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                var msgError = error.original.code || error.errors[0].type
                var errResp = msgF(msgError, req.query.lang)
                if (errResp.nF == true) {
                    console.log(errResp)
                    return res.status(400).send(error)
                } else {
                    msg = errResp.info
                    msg = msg.replace('%1', error.original)
                    errResp.info = msg
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- COUNT ---------------------------------------
    count(req, res) {
        return ServiceOrder
            .findAndCountAll()
            .then(serviceOrder => {
                res.status(200).send({
                    'count': serviceOrder.count
                })
            })
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                var msgError = error.original.code || error.errors[0].type
                var errResp = msgF(msgError, req.query.lang)
                if (errResp.nF == true) {
                    console.log(errResp)
                    return res.status(400).send(error)
                } else {
                    msg = errResp.info
                    msg = msg.replace('%1', error.original)
                    errResp.info = msg
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- FIND BY ID -------------------------------------
    getById(req, res) {
        return ServiceOrder
            .findByPk(req.params.id)
            .then((serviceOrder) => {
                if (!serviceOrder) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(serviceOrder);
            })
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                var msgError = error.original.code || error.errors[0].type
                var errResp = msgF(msgError, req.query.lang)
                if (errResp.nF == true) {
                    console.log(errResp)
                    return res.status(400).send(error)
                } else {
                    msg = errResp.info
                    msg = msg.replace('%1', error.original)
                    errResp.info = msg
                    return res.status(400).send(errResp)
                }
            });
    },
    // ----------------------------------- ADD NEW -----------------------------------------
    add(req, res) {
        return ServiceOrder
            .create({
                id_service_order: req.body.id_service_order || null,
                id_client: req.body.id_client || null,
                id_user: req.body.id_user || null,
                id_service_owner: req.body.id_service_owner || null,
                id_budget: req.body.id_budget || null,
                nu_vservice: Number(req.body.nu_vservice) || Number('0.00'),
                bo_canceled: req.body.bo_canceled || false,
                bo_received: req.body.bo_received || false,
                bo_paid: req.body.bo_paid || false,
                bo_delivered: req.body.bo_delivered || false
            }).then((serviceOrder) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang)
                msgRpl = msgResp.info
                msgRpl = msgRpl.replace('%1', serviceOrder.id_service_order)
                msgResp.info = msgRpl
                return res.status(201).send(msgResp)
            })
            .catch((error) => {
                var msgError = error.original.code || error.errors[0].type
                var errResp = msgF(msgError, req.query.lang)
                if (!errResp || errResp.nF == true) {
                    return res.status(400).send({
                        "error": true,
                        "original": error.errors[0].message
                    })
                } else {
                    msg = errResp.info
                    msg = msg.replace('%1', error.original)
                    errResp.info = msg
                    return res.status(400).send(errResp)
                }
            })
    },
    // ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
        nDate = new dtCurr
        condition = {
            where: {
                id_service_order: req.params.id
            }
        }
        return ServiceOrder
            .findByPk(req.params.id).
            then((serviceOrder) => {
            if (!serviceOrder || Object.keys(serviceOrder).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return ServiceOrder
                .update({
                    id_client: req.body.id_client || serviceOrder.id_client,
                    id_user: req.body.id_user || serviceOrder.id_user,
                    id_service_owner: req.body.id_service_owner || serviceOrder.id_service_owner,
                    id_budget: req.body.id_budget || serviceOrder.id_budget,
                    nu_vservice:  Number(req.body.nu_vservice) || Number(serviceOrder.nu_vservice),
                    bo_canceled: req.body.bo_canceled || serviceOrder.bo_canceled,
                    bo_received: req.body.bo_received || serviceOrder.bo_received,
                    bo_paid: req.body.bo_paid || serviceOrder.bo_paid,
                    bo_delivered: req.body.bo_delivered || serviceOrder.bo_delivered,
                    ts_update: nDate.timestamp || null
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang)
                    msgRpl = msgResp.info
                    msgRpl = msgRpl.replace('%1', serviceOrder.id_service_order)
                    msgResp.info = msgRpl
                    return res.status(200).send(msgResp)
                })
                .catch((error) => {
                    console.log(error)
                    var errResp = msgF(error.original.code, req.query.lang)
                    var msgError = error.original.code || error.errors[0].type
                    var errResp = msgF(msgError, req.query.lang)
                    if (errResp.nF == true) {
                        console.log(errResp)
                        return res.status(400).send(error)
                    } else {
                        msg = errResp.info
                        msg = msg.replace('%1', error.original)
                        errResp.info = msg
                        return res.status(400).send(errResp)
                    }
                })
        }).catch((error) => {
            var errResp = msgF(error.original.code, req.query.lang)
            var msgError = error.original.code || error.errors[0].type
            var errResp = msgF(msgError, req.query.lang)
            if (errResp.nF == true) {
                console.log(errResp)
                return res.status(400).send(error)
            } else {
                msg = errResp.info
                msg = msg.replace('%1', error.original)
                errResp.info = msg
                return res.status(400).send(errResp)
            }
        })
    },
    // ----------------------------------- REMOVE BY ID ------------------------------------
    delete(req, res) {
        condition = {
            where: {
                id_service_order: req.params.id
            }
        }
        return ServiceOrder
            .findByPk(req.params.id)
            .then(serviceOrder => {
                if (!serviceOrder) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return ServiceOrder
                    .destroy(condition)
                    .then(() => {
                        var msgResp = msgF('suc-0001', req.query.lang)
                        return res.status(200).send({
                            success: true,
                            message: msgResp.info
                        });
                    })
                    .catch((error) => {
                        var msgError = error.original.code || error.errors[0].type
                        var errResp = msgF(msgError, req.query.lang)
                        if (!errResp || errResp.nF) {
                            return res.status(400).send(error)
                        } else {
                            return res.status(400).send(errResp)
                        }
                    });
            }).catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                var msgError = error.original.code || error.errors[0].type
                var errResp = msgF(msgError, req.query.lang)
                if (errResp.nF == true) {
                    console.log(errResp)
                    return res.status(400).send(error)
                } else {
                    msg = errResp.info
                    msg = msg.replace('%1', error.original)
                    errResp.info = msg
                    return res.status(400).send(errResp)
                }
            })
    }
}