// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Client = require('../models').Client;
// ----------------------------------- UTIL ------------------------------------------
const dtCurr = require('../util/currentTimeStamp')
const myUtl = require('../util/myInspect')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
const Log = require ('../factory/logFactory')
const action = { file: './service/controllers/Client.js', call: 'Client' } 
const onlyNumber= /\D/g
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const offset = (( page - 1 )  * limit)
        let name
        let lastname
        let where = {}
        if (req.query.name) name = req.query.name 
        if (req.query.lastname) lastname =  req.query.lastname
        if (name && lastname) {
            where = {
                vc_name: { [Op.like]: name },
                vc_lastname: { [Op.like]: lastname }
            }
        } else if (name && !lastname) {
            where = {
                vc_name: { [Op.like]: name } 
            }
        } else if (!name && lastname) {
            where = {
                vc_lastname: { [Op.like]: lastname }
            }
        }
        return Client
            .findAndCountAll({
                where: where, 
                limit: limit, 
                offset: offset 
            })
            .then((client) => res.status(200).send(client))
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
    // ----------------------------------- List Box Client ------------------------------
    listBoxClient(req, res) {
        action.method = 'list'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
        return Client
            .findAll({
                attributes: ['id_client', 'vc_social_security_code', 'vc_name', 'vc_lastname']
            })
            .then((client) => res.status(200).send({ rows:client }))
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
        Log.logRegister('Client requestion.', action )
        return Client
            .findAndCountAll()
            .then(client => {
                res.status(200).send({
                    'count': client.count
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
        Log.logRegister('Client requestion.', action )
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
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v) {
                    return res.status(400).send(error)
                } else {
                    var errResp = msgF(error.original.code, req.query.lang)
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
        action.method = 'getByEmail'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
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
        Log.logRegister('Client requestion.', action )
        const zip_code = `${req.body.vc_zip_code}`.replace(onlyNumber,'')
        const code_area = `${req.body.vc_code_area}`.replace(onlyNumber,'')
        const mobile = `${req.body.vc_mobile}`.replace(onlyNumber,'')
        const social_security_code = `${req.body.vc_social_security_code}`.replace(onlyNumber,'')
        return Client
            .create({
                id_client: req.body.id || null,
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                vc_code_area: code_area || null,
                vc_mobile: mobile || null,
                vc_contact: req.body.vc_contact || null,
                vc_email: req.body.vc_email || null,
                vc_social_security_code: social_security_code || null,
                vc_zip_code: zip_code || null,
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
                var msgResp = msgF('suc-0002', req.query.lang, [client.id_client])
                return res.status(201).send(msgResp)
            })
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                var respDef = error.errors[0].message
                if(!v){
                    return res.status(400).send({ info: respDef})
                } else {
                    var errResp = msgF(error.original.code, req.query.lang)
                    return res.status(400).send(errResp)
                }
            })
    },
    // ----------------------------------- ADD NEW -----------------------------------------
    addById(req, res) {
        action.method = 'addById'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
        const zip_code = `${req.body.vc_zip_code}`.replace(onlyNumber,'')
        const code_area = `${req.body.vc_code_area}`.replace(onlyNumber,'')
        const mobile = `${req.body.vc_mobile}`.replace(onlyNumber,'')
        const social_security_code = `${req.body.vc_social_security_code}`.replace(onlyNumber,'')
        return Client
            .create({
                id_client: req.body.id || null,
                vc_name: req.body.vc_name || null,
                vc_lastname: req.body.vc_lastname || null,
                vc_code_area: code_area || null,
                vc_mobile: mobile || null,
                vc_contact: req.body.vc_contact || null,
                vc_email: req.body.vc_email || null,
                vc_social_security_code: social_security_code || null,
                vc_zip_code: zip_code,
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
                var msgResp = msgF('suc-0002', req.query.lang, [client.id_client])
                return res.status(201).send(msgResp)
            })
            .catch((error) => {
                console.log(error)
                var v = myUtl.myInspect(error, ['original','code'])
                if(!v){
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
                id_client: req.params.id
            }
        }
        action.method = 'update'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
        const zip_code = `${req.params.vc_zip_code}`.replace(onlyNumber,'')
        const code_area = `${req.params.vc_code_area}`.replace(onlyNumber,'')
        const mobile = `${req.params.vc_mobile}`.replace(onlyNumber,'')
        const social_security_code = `${req.params.vc_social_security_code}`.replace(onlyNumber,'')
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
                        vc_code_area: code_area || client.vc_code_area,
                        vc_mobile: mobile || client.vc_mobile,
                        vc_contact: req.body.vc_contact || client.vc_contact,
                        vc_email: req.body.vc_email || client.vc_email,
                        vc_social_security_code: social_security_code || client.vc_social_security_code,
                        vc_zip_code: zip_code || client.vc_zip_code,
                        vc_city: req.body.vc_city || client.vc_city,
                        vc_state: req.body.vc_state || client.vc_state,
                        vc_district: req.body.vc_district || client.vc_district,
                        vc_address: req.body.vc_address || client.vc_address,
                        vc_address_number: req.body.vc_address_number || client.vc_address_number,
                        vc_address_complement: req.body.vc_address_complement || client.vc_address_complement,
                        vc_birthday: req.body.vc_birthday || client.vc_birthday,
                        bo_promotion: req.body.bo_promotion || client.bo_promotion,
                        ts_update: nDate.timestamp || null
                    }, condition ).then((success) => {
                        var msgResp = msgF('suc-0004', req.query.lang, [client.id_client])
                        return res.status(200).send(msgResp)
                    })
                    .catch((error) => {
                        var v = myUtl.myInspect(error, ['original','code'])
                        console.log(v)
                        console.log(error)
                        if (!v) {
                            return res.status(400).send(error)
                        } else {
                            var errResp = msgF(error.original.code, req.query.lang)
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
        action.method = 'updateByEmail'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
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
                        vc_code_area: req.body.vc_code_area || client.vc_code_area,
                        vc_mobile: req.body.vc_mobile || client.vc_mobile,
                        vc_contact: req.body.vc_contact || client.vc_contact,
                        vc_email: req.body.vc_email || client.vc_email,
                        vc_social_security_code: req.body.vc_social_security_code || client.vc_social_security_code,
                        vc_zip_code: req.body.vc_zip_code || client.vc_zip_code,
                        vc_city: req.body.vc_city || client.vc_city,
                        vc_state: req.body.vc_state || client.vc_state,
                        vc_district: req.body.vc_district || client.vc_district,
                        vc_address: req.body.vc_address || client.vc_address,
                        vc_address_number: req.body.vc_address_number || client.vc_address_number,
                        vc_address_complement: req.body.vc_address_complement || client.vc_address_complement,
                        vc_birthday: req.body.vc_birthday || client.vc_birthday,
                        bo_promotion: req.body.bo_promotion || client.bo_promotion,
                        ts_update: nDate.timestamp || null
                    }, condition ).then((success) => {
                        var msgResp = msgF('suc-0004', req.query.lang, [client.id_client])
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
                id_client: req.params.id
            }
        }
        action.method = 'delete'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
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
    // ----------------------------------- REMOVE BY EMAIL ------------------------------------
    deleteByEmail(req, res, condition) {
        condition = {
            where: {
                vc_email: req.params.email
            }
        }
        action.method = 'deleteByEmail'
        action.header = JSON.stringify(req.headers)
        Log.logRegister('Client requestion.', action )
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
            .catch((error) => {
                var v = myUtl.myInspect(error, ['original','code'])
                if (!v) {
                    return res.status(400).send(error)
                } else {
                    var errResp = msgF(error.original.code, req.query.lang)
                    return res.status(400).send(errResp)
                }
            });
    }
}