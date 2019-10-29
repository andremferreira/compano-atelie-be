// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Budget = require('../models').Budget;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Budget
            .findAll()
            .then((budget) => res.status(200).send(budget))
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
        return Budget
            .findAndCountAll()
            .then(budget => {
                res.status(200).send({
                    'count': budget.count
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
        return Budget
            .create({
                id_budget: req.body.id_budget || null,
                id_client: req.body.id_client || null,
                id_user: req.body.id_user || null,
                js_budget_service: req.body.js_budget_service || null
            }).then((budget) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', budget.id_budget)
                return res.status(201).send({
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
    },
    // ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
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
                    var msgResp = msgF('suc-0004', req.query.lang).info
                    msgRpl = msgResp.replace('%1', budget.id_budget)
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
                        return res.status(200).send({
                            success: true,
                            message: msgResp.info
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
            })
    }
}