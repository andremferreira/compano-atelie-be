const Usuario = require('../models').Usuario;
const fs = require('fs')
const path = require('path')

// Configure message report data base
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)

// Define default language
const dLang = 'pt_BR'

// CRUD
module.exports = {
    // List all 

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
    // Find by id
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
                return res.status(200).send(group);
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
    // Add new 
    add(req, res) {
        return Usuario
            .create({
                isn_father: req.body.isn_father || null,
                isn_son: req.body.isn_son || null,
                dsc_group: req.body.dsc_group,
                flg_primal: req.body.flg_primal || false,
                int_seq_group: req.body.int_seq_group || 1
            })
            .then((usuario) => {

                return res.status(201).send({
                    success: true,
                    message: `Insert item of ID: ${usuario.id_usuario} on users, was realized with success.`
                })
            })
            .catch((error) => {
                return res.status(400).send({
                    error: true,
                    message: error.original.detail
                })
            })
        // Configure sequence to next available position
        // .then(() => { return Group.sequelize.query("SELECT SETVAL('cog.groups_isn_group_seq'::regclass, COALESCE((SELECT MAX(isn_group::INT) + 1 FROM cog.groups), 1), FALSE)")})
    },
    // Update by id
    update(req, res) {
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
                return usuario
                    .update({
                        isn_father: req.body.isn_father || usuario.isn_father,
                        isn_son: req.body.isn_son || usuario.isn_son,
                        dsc_group: req.body.dsc_group || usuario.dsc_group,
                        flg_primal: req.body.flg_primal || usuario.flg_primal,
                        int_seq_group: req.body.int_seq_group || usuario.int_seq_group
                    })
                    .then((usuario) => res.status(200).send(group))
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
    // Remove by id
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
                return usuario
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