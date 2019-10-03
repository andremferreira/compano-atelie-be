// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Cliente = require('../models/index').Cliente;
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
const config = JSON.parse(dConfig)
const dLang = config.dConfig.dLang
// const dLogActionRegister = config.dConfig.dLogActionRegister
// const dLogRegisterTimeTransaction = config.dConfig.dLogRegisterTimeTransaction
// const dSendError = config.dConfig.dSendError.active
// const dSendErrorMail = config.dConfig.dSendError.email
// ----------------------------------- SEQUELIZE OBJ DATE NO TIME ZONE ---------------
const withDateNoTz = require('sequelize-date-no-tz-postgres')
const Sequelize = require('sequelize')
const seq = withDateNoTz(Sequelize)
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
// ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Cliente
            .findAll()
            .then((cliente) => res.status(200).send(cliente))
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                                console.log(errResp)
                            }
                        }
                    }
                }
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
                if (!cliente) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG NO RESULT - CODE: err-0002
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(cliente);
            })
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
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
                vc_contato: req.body.vc_contato || null,
                vc_email: req.body.vc_email || null,
                nu_cpf: req.body.nu_cpf || null,
                nu_cep: req.body.nu_cep || null,
                vc_cidade: req.body.vc_cidade || null,
                vc_estado: req.body.vc_estado || null,
                vc_endereco: req.body.vc_endereco || null,
                vc_endereco_numero: req.body.vc_endereco_numero || null,
                vc_endereco_complemento: req.body.vc_endereco_complemento || null,
                vc_aniversario: req.body.vc_aniversario || false,
            })
            .then((cliente) => {
                return res.status(201).send({
                    success: true,
                    message: `Insert register "ID": ${cliente.id_usuario} to users with success!`
                })
            })
            .catch((error) => {
                return res.status(400).send({
                    error: true,
                    message: error.original.detail
                })
            })
    },
// ----------------------------------- UPDATE BY ID ------------------------------------
    update(req, res) {
        return Cliente
            .findByPk(req.params.id)
            .then(cliente => {
                if (!cliente) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG - CODE: err-0002 - NO RESULT
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
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
                        vc_endereco: req.body.vc_endereco || cliente.vc_endereco,
                        vc_endereco_numero: req.body.vc_endereco_numero || cliente.vc_endereco_numero,
                        vc_endereco_complemento: req.body.vc_endereco_complemento || cliente.vc_endereco_complemento,
                        vc_aniversario: req.body.vc_aniversario || cliente.vc_aniversario,
                        dt_atualiacao: seq.fn('now')
                    })
                    .then((cliente) => res.status(200).send(cliente))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
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
                if (!cliente) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG - CODE: err-0002 - NO RESULT
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return Cliente
                    .destroy()
                    .then(() => {
                        for (var idKeyA in dbMsg.messages) {
                            // MSG - CODE: suc-0001 - DELETE DONE
                            if (dbMsg.messages[idKeyA].code == 'suc-0001') {
                                var codErrMsg = dbMsg.messages[idKeyA].msgObj
                                var lang = req.query.lang || dLang
                                for (var idkeyB in codErrMsg) {
                                    if (codErrMsg[idkeyB].lang == lang) {
                                        var errResp = codErrMsg[idkeyB]
                                    }
                                }
                            }
                        }
                        return res.status(204).send(errResp);
                    })
                    .catch((error) => {
                        for (var idKeyA in dbMsg.messages) {
                            if (dbMsg.messages[idKeyA].code == error.original.code) {
                                var codErrMsg = dbMsg.messages[idKeyA].msgObj
                                var lang = req.query.lang || dLang
                                for (var idkeyB in codErrMsg) {
                                    if (codErrMsg[idkeyB].lang == lang) {
                                        var errResp = codErrMsg[idkeyB]
                                    }
                                }
                            }
                        }
                        if (!errResp) {
                            return res.status(400).send(error)
                        } else {
                            return res.status(400).send(errResp)
                        }
                    });
            })
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
}