// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Usuario = require('../models').Usuario;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
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
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
// ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Usuario
            .findAll()
            .then((usuario) => res.status(200).send(usuario))
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
        return Usuario
            .findByPk(req.params.id)
            .then((usuario) => {
                if (!usuario) {
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
                return res.status(200).send(usuario);
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
        return Usuario
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
                vc_endereco: req.body.vc_endereco || null,
                vc_endereco_numero: req.body.vc_endereco_numero || null,
                vc_endereco_complemento: req.body.vc_endereco_complemento,
                vc_aniversario: req.body.vc_aniversario || null,
                bo_promocao: req.body.bo_promocao || false
            })
            .then((usuario) => {
                return res.status(201).send({
                    success: true,
                    message: `Add register to Client ID: ${usuario.id_usuario} with success!`
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
        console.log(dtCurr.timestamp)
        return Usuario
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
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
                return Usuario
                    .update({
                        vc_nome: req.body.vc_nome || usuario.vc_nome,
                        vc_sobrenome: req.body.vc_sobrenome || usuario.vc_sobrenome,
                        nu_ddd: req.body.nu_ddd || usuario.nu_ddd,
                        nu_celular: req.body.nu_celular || usuario.nu_celular,
                        vc_contato: req.body.vc_contato || usuario.vc_contato,
                        vc_email: req.body.vc_email || usuario.vc_email,
                        nu_cpf: req.body.nu_cpf || usuario.nu_cpf,
                        nu_cep: req.body.nu_cep || usuario.nu_cep,
                        vc_cidade: req.body.vc_cidade || usuario.vc_cidade,
                        vc_estado: req.body.vc_estado || usuario.vc_estado,
                        vc_endereco: req.body.vc_endereco || usuario.vc_endereco,
                        vc_endereco_numero: req.body.vc_endereco_numero || usuario.vc_endereco_numero,
                        vc_endereco_complemento: req.body.vc_endereco_complemento || usuario.vc_endereco_complemento,
                        vc_aniversario: req.body.vc_aniversario || usuario.vc_aniversario,
                        dt_atualiacao: dtCurr.timestamp
                    })
                    .then((usuario) => res.status(200).send(usuario))
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
        return Usuario
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
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
                return Usuario
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