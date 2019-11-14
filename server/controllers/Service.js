// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Service = require('../models').Service;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Service
            .findAll()
            .then((service) => res.status(200).send(service))
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
        return Service
            .findAndCountAll()
            .then(service => {
                res.status(200).send({
                    'count': service.count
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
        return Service
            .findByPk(req.params.id)
            .then((service) => {
                if (!service) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(service);
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
        return Service
            .create({
                id_service: req.body.id_service || null,
                vc_service_mnemonic: req.body.vc_service_mnemonic || null,
                tx_service_description: req.body.tx_service_description || null,
                tm_estimate_time_service: req.body.tm_estimate_time_service || null,
                nu_material_cost: Number(req.body.nu_material_cost) || Number('0.00'),
                nu_third_party_cost: Number(req.body.nu_third_party_cost) || Number('0.00'),
                nu_service_cost: Number(req.body.nu_service_cost) || Number('0.00'),
                vc_contact: req.body.vc_contact || null,
                bo_active: req.body.bo_active || true,
                bo_critical_service: req.body.bo_critical_service || false,
                id_user: req.body.id_user || parseInt('1')
            }).then((service) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang, [service.id_service])
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
        nDate = new dtCurr
        condition = {
            where: {
                id_service: req.params.id
            }
        }
        return Service
            .findByPk(req.params.id).
        then((service) => {
            if (!service || Object.keys(service).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return Service
                .update({
                    vc_service_mnemonic: req.body.vc_service_mnemonic || service.vc_service_mnemonic,
                    tx_service_description: req.body.tx_service_description || service.tx_service_description,
                    tm_estimate_time_service: req.body.tm_estimate_time_service || service.tm_estimate_time_service,
                    nu_material_cost: Number(req.body.nu_material_cost) || service.nu_material_cost,
                    nu_third_party_cost: Number(req.body.nu_third_party_cost) || service.nu_third_party_cost,
                    nu_service_cost: Number(req.body.nu_service_cost) || service.nu_service_cost,
                    vc_contact: req.body.vc_contact || service.vc_contact,
                    bo_active: req.body.bo_active || service.bo_active,
                    bo_critical_service: req.body.bo_critical_service || service.bo_critical_service,
                    id_user: req.body.id_user || service.id_user,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang, [service.id_service])
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
    // ----------------------------------- UPDATE BY MNE ------------------------------------
    updateMne(req, res) {
        nDate = new dtCurr
        condition = {
            where: {
                vc_service_mnemonic: req.params.mne
            }
        }
        return Service
            .findAll(condition).
        then((service) => {
            if (!service || Object.keys(service).length === 0) {
                var errResp = msgF('err-0002', req.query.lang)
                return res.status(404).send(errResp);
            }
            return Service
                .update({
                    vc_service_mnemonic: req.body.vc_service_mnemonic || service.vc_service_mnemonic,
                    tx_service_description: req.body.tx_service_description || service.tx_service_description,
                    tm_estimate_time_service: req.body.tm_estimate_time_service || service.tm_estimate_time_service,
                    nu_material_cost: Number(req.body.nu_material_cost) || service.nu_material_cost,
                    nu_third_party_cost: Number(req.body.nu_third_party_cost) || service.nu_third_party_cost,
                    nu_service_cost: Number(req.body.nu_service_cost) || service.nu_service_cost,
                    vc_contact: req.body.vc_contact || service.vc_contact,
                    bo_active: req.body.bo_active || service.bo_active,
                    bo_critical_service: req.body.bo_critical_service || service.bo_critical_service,
                    id_user: req.body.id_user || service.id_user,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang, [service.id_service])
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
                id_service: req.params.id
            } 
        }
        return Service
            .findByPk(req.params.id)
            .then(service => {
                if (!service) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Service
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
            })
    }
}