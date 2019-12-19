// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Service = require('../models').Service;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/Service.js', call: 'Service' } 
const onlyNumber= /\D/g
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        action.method = 'list';
        action.header = JSON.stringify(req.headers);
        Log.logRegister('Service requestion.', action );
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const offset = (( page - 1 )  * limit);
        let mne = req.query.mne ? `${req.query.mne}%` :  false;
        let where = mne ? { vc_service_mnemonic: { [Op.like]: mne } } : {};
        return Service
            .findAndCountAll({
                where: where, 
                limit: limit, 
                offset: offset 
            })
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
        action.method = 'count'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service requestion.', action )
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
        action.method = 'getById'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service requestion.', action )
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
        action.method = 'add'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service requestion.', action )
        let cMaterial;
        let cThird;
        let cService;
        if (req.body.nu_material_cost) {
            cMaterial = req.body.nu_material_cost.replace(onlyNumber,'');
            cMaterial = `${cMaterial.substr(0, cMaterial.length - 2 )}.${cMaterial.substr(cMaterial.length - 2, 2)}`;
        }
        if (req.body.nu_third_party_cost) {
            cThird = req.body.nu_third_party_cost.replace(onlyNumber,'');
            cThird = `${cThird.substr(0, cThird.length - 2 )}.${cThird.substr(cThird.length - 2, 2)}`;
        }
        if (req.body.nu_service_cost) {
            cService = req.body.nu_service_cost.replace(onlyNumber,'');
            cService = `${cService.substr(0, cService.length - 2 )}.${cService.substr(cService.length - 2, 2)}`;
        }
        return Service
            .create({
                id_service: req.body.id_service || null,
                vc_service_mnemonic: req.body.vc_service_mnemonic || null,
                tx_service_description: req.body.tx_service_description || null,
                tm_estimate_time_service: req.body.tm_estimate_time_service || null,
                nu_material_cost: Number(cMaterial) || Number('0.00'),
                nu_third_party_cost: Number(cThird) || Number('0.00'),
                nu_service_cost: Number(cService) || Number('0.00'),
                vc_contact: req.body.vc_contact || null,
                bo_active: req.body.bo_active || true,
                bo_critical_service: req.body.bo_critical_service || false,
                id_user: req.body.id_user || parseInt('1')
            }).then((service) => {
                var msgResp = msgF('suc-0002', req.query.lang, [service.vc_service_mnemonic])
                return res.status(201).send(msgResp)
            })
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                console.log(error)
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
        Log.logRegister('Service requestion.', action )
        nDate = new dtCurr
        condition = {
            where: {
                id_service: req.params.id
            }
        }
        let cMaterial;
        let cThird;
        let cService;
        if (req.body.nu_material_cost) {
            cMaterial = req.body.nu_material_cost.replace(onlyNumber,'');
            cMaterial = `${cMaterial.substr(0, cMaterial.length - 2 )}.${cMaterial.substr(cMaterial.length - 2, 2)}`;
        }
        if (req.body.nu_third_party_cost) {
            cThird = req.body.nu_third_party_cost.replace(onlyNumber,'');
            cThird = `${cThird.substr(0, cThird.length - 2 )}.${cThird.substr(cThird.length - 2, 2)}`;
        }
        if (req.body.nu_service_cost) {
            cService = req.body.nu_service_cost.replace(onlyNumber,'');
            cService = `${cService.substr(0, cService.length - 2 )}.${cService.substr(cService.length - 2, 2)}`;
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
                    nu_material_cost: Number(cMaterial) || service.nu_material_cost,
                    nu_third_party_cost: Number(cThird) || service.nu_third_party_cost,
                    nu_service_cost: Number(cService) || service.nu_service_cost,
                    vc_contact: req.body.vc_contact || service.vc_contact,
                    bo_active: req.body.bo_active,
                    bo_critical_service: req.body.bo_critical_service,
                    id_user: req.body.id_user || service.id_user,
                    ts_update: nDate.timestamp || null,
                }, condition).then(() => {
                    var msgResp = msgF('suc-0004', req.query.lang, [service.vc_service_mnemonic])
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
        action.method = 'updateMne'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service requestion.', action )
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
        action.method = 'delete'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Service requestion.', action )
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