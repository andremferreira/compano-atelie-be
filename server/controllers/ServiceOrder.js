// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const ServiceOrder = require('../models').ServiceOrder;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/ServiceOrder.js', call: 'Service Order' } 
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service Order requestion.', action )
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const offset = (( page - 1 )  * limit);
        let servOrder = req.query.servOrder ? `${req.query.servOrder}` :  false;
        let where = servOrder ? { id_service_order: { [Op.eq]: servOrder } } : {};              
        return ServiceOrder
            .findAndCountAll({
                where: where,
                order: [
                    ['id_service_order', 'DESC']
                ],
                limit: limit, 
                offset: offset 
            })
            .then((serviceOrder) => res.status(200).send(serviceOrder))
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
        action.method = 'count'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service Order requestion.', action )
        return ServiceOrder
            .findAndCountAll()
            .then(serviceOrder => {
                res.status(200).send({
                    'count': serviceOrder.count
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
        Log.logRegister('Service Order requestion.', action )
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
        action.method = 'add'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service Order requestion.', action )
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
                var msgResp = msgF('suc-0002', req.query.lang, [serviceOrder.id_service_order])
                return res.status(201).send(msgResp)
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
    },
    // ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
        action.method = 'update'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service Order requestion.', action )
        nDate = new dtCurr
        condition = {
            where: {
                id_service_order: req.params.id
            }
        }
        return ServiceOrder
            .findByPk(req.params.id)
            .then((serviceOrder) => {
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
                    var msgResp = msgF('suc-0004', req.query.lang, [serviceOrder.id_service_order])
                    return res.status(200).send(msgResp)
                })
                .catch((error) => {
                    console.log(error)
                    var v = myUtl.myInspect(error, ['original','code'])
                    if (!v) {
                        return res.status(400).send(error)
                    } else {
                        var errResp = msgF(error.original.code, req.query.lang)
                        return res.status(400).send(errResp)
                    }
                })
        }).catch((error) => {
            var v = myUtl.myInspect(error, ['original','code'])
            if (!v) {
                return res.status(400).send(error)
            } else {
                var errResp = msgF(error.original.code, req.query.lang)
                return res.status(400).send(errResp)
            }
        })
    },
    // ----------------------------------- REMOVE BY ID ------------------------------------
    delete(req, res) {
        action.method = 'delete'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service Order requestion.', action )
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
                        return res.status(200).send(msgResp);
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
            }).catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v) {
                    return res.status(400).send(error)
                } else {
                    var errResp = msgF(error.original.code, req.query.lang)
                    return res.status(400).send(errResp)
                }
            })
    }
}