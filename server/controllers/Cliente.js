// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Cliente = require('../models').Cliente;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)
const msgF = require('../factory/msgFactory')
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
const dconfig = JSON.parse(dConfig)
const dLang = dconfig.dConfig.dlang
// const dLogActionRegister = config.dConfig.dLogActionRegister
// const dLogRegisterTimeTransaction = config.dConfig.dLogRegisterTimeTransaction
// const dSendError = config.dConfig.dSendError.active
// const dSendErrorMail = config.dConfig.dSendError.email
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Cliente
            .findAll()
            .then((cliente) => res.status(200).send(cliente))
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
        return Cliente
            .findAndCountAll()
            //.findAndCountAll({ offset: 10, limit: 2})
            .then(cliente => {
                res.status(200).send({
                    'count': cliente.count
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
        return Cliente
            .findByPk(req.params.id)
            .then((cliente) => {
                if (!cliente || Object.keys(cliente).length === 0) {
                    // ../../msg/db/db.json -> NOT FIND -> 'err-0002'
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(cliente);
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
        return Cliente
            .findAll(condition)
            .then((cliente) => {
                if (!cliente || Object.keys(cliente).length === 0) {
                    // ../../msg/db/db.json -> NOT FIND -> 'err-0002'
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(cliente);
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
        return Cliente
            .create({
                vc_nome: req.body.vc_nome || null,
                vc_sobrenome: req.body.vc_sobrenome || null,
                nu_ddd: req.body.nu_ddd || null,
                nu_celular: req.body.nu_celular || null,
                vc_contato: req.body.vc_contato,
                vc_email: req.body.vc_email || null,
                nu_cpf: req.body.nu_cpf || null,
                nu_cep: req.body.nu_cep,
                vc_cidade: req.body.vc_cidade || null,
                vc_estado: req.body.vc_estado || null,
                vc_bairro: req.body.vc_bairro || null,
                vc_endereco: req.body.vc_endereco || null,
                vc_endereco_numero: req.body.vc_endereco_numero || null,
                vc_endereco_complemento: req.body.vc_endereco_complemento,
                vc_aniversario: req.body.vc_aniversario || null,
                bo_promocao: req.body.bo_promocao || false
            })
            .then((cliente) => {
                // ../../msg/db/db.json -> ADD SUCCESS %1(tableName) ,%2(idTable) -> 'err-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', cliente.id_cliente)
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
        // console.log(dtCurr.timestamp)
        return Cliente
            .findByPk(req.params.id)
            .then(cliente => {
                if (!cliente || Object.keys(cliente).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Cliente
                    .update({
                        vc_nome: req.body.vc_nome || cliente.vc_nome,
                        vc_sobrenome: req.body.vc_sobrenome || cliente.vc_sobrenome,
                        nu_ddd: req.body.nu_ddd || cliente.nu_ddd,
                        nu_celular: req.body.nu_celular || cliente.nu_celular,
                        vc_contato: req.body.vc_contato || cliente.vc_contato,
                        vc_email: req.body.vc_email || cliente.vc_email,
                        nu_cpf: req.body.nu_cpf || cliente.nu_cpf,
                        nu_cep: req.body.nu_cep || cliente.nu_cep,
                        vc_cidade: req.body.vc_cidade || cliente.vc_cidade,
                        vc_estado: req.body.vc_estado || cliente.vc_estado,
                        vc_bairro: req.body.vc_bairro || cliente.vc_bairro,
                        vc_endereco: req.body.vc_endereco || cliente.vc_endereco,
                        vc_endereco_numero: req.body.vc_endereco_numero || cliente.vc_endereco_numero,
                        vc_endereco_complemento: req.body.vc_endereco_complemento || cliente.vc_endereco_complemento,
                        vc_aniversario: req.body.vc_aniversario || cliente.vc_aniversario,
                        dt_atualiacao: dtCurr.timestamp
                    })
                    .then((cliente) => res.status(200).send(cliente))
                    .catch((error) => {
                        var errResp = msgF(error.original.code, req.query.lang)
                        return res.status(400).send(errResp)
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
    // ----------------------------------- REMOVE BY ID ------------------------------------
    delete(req, res) {
        return Cliente
            .findByPk(req.params.id)
            .then(cliente => {
                if (!cliente || Object.keys(cliente).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Cliente
                    .destroy(condition)
                    .then(() => {
                        var msgResp = msgF('suc-0001', req.query.lang)
                        return res.status(204).send(msgResp);
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
        condition = { where: { vc_email: req.params.email } }
        return Cliente
            .findAll(condition)
            .then(cliente => {
                if (!cliente || Object.keys(cliente).length === 0) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Cliente
                    .destroy(condition)
                    .then(() => {
                        var msgResp = msgF('err-0002', req.query.lang)
                        return res.status(204).send(msgResp);
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