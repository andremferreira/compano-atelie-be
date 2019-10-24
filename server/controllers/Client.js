// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Client = require('../models').Client;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Client
            .findAll()
            .then((client) => res.status(200).send(client))
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
        return Client
            .findAndCountAll()
            //.findAndCountAll({ offset: 10, limit: 2})
            .then(client => {
                res.status(200).send({
                    'count': client.count
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
        return Client
            .findByPk(req.params.id)
            .then((client) => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(client);
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
    // ----------------------------------- FIND BY EMAIL -------------------------------------
    getByEmail(req, res, condition) {
        condition = {
            where: {
                vc_email: req.params.email
            }
        }
        return Client
            .findAll(condition)
            .then((client) => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(client);
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
        return Client
            .create({
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                nu_code_area: req.body.nu_code_area || null,
                nu_mobile: req.body.nu_mobile || null,
                vc_contact: req.body.vc_contact || null,
                vc_email: req.body.vc_email || null,
                nu_social_security_code: req.body.nu_social_security_code || null,
                nu_zip_code: req.body.nu_zip_code,
                vc_city: req.body.vc_city || null,
                vc_state: req.body.vc_state || null,
                vc_district: req.body.vc_district || null,
                vc_address: req.body.vc_address || null,
                vc_address_number: req.body.vc_address_number || null,
                vc_address_complement: req.body.vc_address_complement || null,
                vc_birthday: req.body.vc_birthday || null,
                bo_promotion: req.body.bo_promotion || false
            })
            .then((client) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', client.id_client)
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
    // ----------------------------------- ADD NEW -----------------------------------------
    addById(req, res) {
        return Client
            .create({
                id_client: req.params.id || null,
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                nu_code_area: req.body.nu_code_area || null,
                nu_mobile: req.body.nu_mobile || null,
                vc_contact: req.body.vc_contact || null,
                vc_email: req.body.vc_email || null,
                nu_social_security_code: req.body.nu_social_security_code || null,
                nu_zip_code: req.body.nu_zip_code,
                vc_city: req.body.vc_city || null,
                vc_state: req.body.vc_state || null,
                vc_district: req.body.vc_district || null,
                vc_address: req.body.vc_address || null,
                vc_address_number: req.body.vc_address_number || null,
                vc_address_complement: req.body.vc_address_complement || null,
                vc_birthday: req.body.vc_birthday || null,
                bo_promotion: req.body.bo_promotion || false
            })
            .then((client) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', client.id_client)
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
    // ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
        nDate = new dtCurr
        condition = {
            where: {
                id_client: req.params.id
            }
        }
        return Client
            .findByPk(req.params.id)
            .then((client) => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Client
                    .update({
                        vc_name: req.body.vc_name || client.vc_name,
                        vc_lastname: req.body.vc_lastname || client.vc_lastname,
                        nu_code_area: req.body.nu_code_area || client.nu_code_area,
                        nu_mobile: req.body.nu_mobile || client.nu_mobile,
                        vc_contact: req.body.vc_contact || client.vc_contact,
                        vc_email: req.body.vc_email || client.vc_email,
                        nu_social_security_code: req.body.nu_social_security_code || client.nu_social_security_code,
                        nu_zip_code: req.body.nu_zip_code || client.nu_zip_code,
                        vc_city: req.body.vc_city || client.vc_city,
                        vc_state: req.body.vc_state || client.vc_state,
                        vc_district: req.body.vc_district || client.vc_district,
                        vc_address: req.body.vc_address || client.vc_address,
                        vc_address_number: req.body.vc_address_number || client.vc_address_number,
                        vc_address_complement: req.body.vc_address_complement || client.vc_address_complement,
                        vc_birthday: req.body.vc_birthday || client.vc_birthday,
                        bo_promotion: req.body.bo_promotion || client.bo_promotion,
                        dt_update: nDate.timestamp || null
                    }, condition ).then((success) => {
                        var msgResp = msgF('suc-0004', req.query.lang).info
                        msgRpl = msgResp.replace('%1', client.id_client)
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
    // ----------------------------------- UPDATE BY ID ------------------------------------
    updateByEmail(req, res) {
        nDate = new dtCurr
        condition = {
            where: {
                vc_email: req.params.email
            }
        }
        return Client
            .findAll(condition)
            .then((client) => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Client
                    .update({
                        vc_name: req.body.vc_name || client.vc_name,
                        vc_lastname: req.body.vc_lastname || client.vc_lastname,
                        nu_code_area: req.body.nu_code_area || client.nu_code_area,
                        nu_mobile: req.body.nu_mobile || client.nu_mobile,
                        vc_contact: req.body.vc_contact || client.vc_contact,
                        vc_email: req.body.vc_email || client.vc_email,
                        nu_social_security_code: req.body.nu_social_security_code || client.nu_social_security_code,
                        nu_zip_code: req.body.nu_zip_code || client.nu_zip_code,
                        vc_city: req.body.vc_city || client.vc_city,
                        vc_state: req.body.vc_state || client.vc_state,
                        vc_district: req.body.vc_district || client.vc_district,
                        vc_address: req.body.vc_address || client.vc_address,
                        vc_address_number: req.body.vc_address_number || client.vc_address_number,
                        vc_address_complement: req.body.vc_address_complement || client.vc_address_complement,
                        vc_birthday: req.body.vc_birthday || client.vc_birthday,
                        bo_promotion: req.body.bo_promotion || client.bo_promotion,
                        dt_update: nDate.timestamp || null
                    }, condition ).then((success) => {
                        var msgResp = msgF('suc-0004', req.query.lang).info
                        msgRpl = msgResp.replace('%1', client.id_client)
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
                id_client: req.params.id
            }
        }
        return Client
            .findByPk(req.params.id)
            .then(client => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Client
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
        return Client
            .findAll(condition)
            .then(client => {
                if (!client || Object.keys(client).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Client
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
            .catch((error) => {
                var errResp = msgF(error.original.code, req.query.lang)
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    }
}