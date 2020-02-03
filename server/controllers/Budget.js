// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Budget = require('../models').Budget;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require ('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/Budget.js', call: 'Budget' } 
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Budget requestion.', action )
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const offset = (( page - 1 )  * limit);
        let budget = req.query.budget ? `${req.query.budget}` :  false;
        let where = budget ? { id_budget: { [Op.eq]: budget } } : {};        
        return Budget
            .findAndCountAll({
                where: where,
                order: [
                    ['id_budget', 'DESC']
                ],
                limit: limit, 
                offset: offset 
            })
            .then((budget) => res.status(200).send(budget))
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v) {
                    console.log(errResp)
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
        Log.logRegister('Budget requestion.', action )
        return Budget
            .findAndCountAll()
            .then(budget => {
                res.status(200).send({
                    'count': budget.count
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
        Log.logRegister('Budget requestion.', action )
        return Budget
            .findByPk(req.params.id)
            .then((budget) => {
                if (!budget) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(budget);
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
        Log.logRegister('Budget requestion.', action )
        return Budget
            .create({
                id_budget: req.body.id_budget || null,
                id_client: req.body.id_client || null,
                id_user: req.body.id_user || null,
                js_budget_service: req.body.js_budget_service || null
            }).then((budget) => {
                var msgResp = msgF('suc-0002', req.query.lang, [ budget.id_budget ])
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
        Log.logRegister('Budget requestion.', action )
        nDate = new dtCurr
        condition = {
            where: {
                id_budget: req.params.id
            }
        }
        return Budget
            .findByPk(req.params.id).
            then((budget) => {
            if (!budget || Object.keys(budget).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return Budget
                .update({
                    id_client: req.body.id_client || budget.id_client,
                    id_user: req.body.id_user || budget.id_user,
                    js_budget_service: req.body.js_budget_service || budget.js_budget_service,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang, [budget.id_budget])
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
        Log.logRegister('Budget requestion.', action )
        condition = {
            where: {
                id_budget: req.params.id
            }
        }
        return Budget
            .findByPk(req.params.id)
            .then(budget => {
                if (!budget) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Budget
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