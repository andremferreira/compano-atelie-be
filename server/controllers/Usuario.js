// ----------------------------------- SEQUELIZE MODULE IMPORT -----------------------
const Usuario = require('../models').Usuario;
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../factory/currentTimeStamp')
// ----------------------------------- DATA BASE MESSAGE REPORT ----------------------
const msgF = require('../factory/msgFactory')
// ----------------------------------- CRUD ------------------------------------------
module.exports = {
    // ----------------------------------- LIST ALL --------------------------------------
    list(req, res) {
        return Usuario
            .findAll()
            .then((usuario) => res.status(200).send(usuario))
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
        return Usuario
            .findAndCountAll()
            //.findAndCountAll({ offset: 10, limit: 2})
            .then(usuario => {
                res.status(200).send({
                    'count': usuario.count
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
        return Usuario
            .findByPk(req.params.id)
            .then((usuario) => {
                if (!usuario) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(usuario);
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
        return Usuario
            .create({
                vc_nome: req.body.vc_nome || null,
                vc_sobrenome: req.body.vc_sobrenome || null,
                vc_email: req.body.vc_email || null,
                vc_senha: req.body.vc_senha || null,
                tx_imagem: req.body.tx_imagem || null,
                vc_reset_senha: req.body.vc_reset_senha || null,
                dt_exp_reset: req.body.dt_exp_reset || null
            })
            .then((usuario) => {
                // ../../msg/db/db.json -> ADD SUCCESS %2(idTable) -> 'suc-0002'
                var msgResp = msgF('suc-0002', req.query.lang).info
                msgRpl = msgResp.replace('%1', usuario.id_usuario)
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
        return Usuario
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Usuario
                    .update({
                        vc_nome: req.body.vc_nome || usuario.vc_nome,
                        vc_sobrenome: req.body.vc_sobrenome || usuario.vc_sobrenome,
                        vc_email: req.body.vc_email || usuario.vc_email,
                        vc_senha: req.body.vc_senha || usuario.vc_senha,
                        tx_imagem: req.body.nu_cep || usuario.tx_imagem,
                        vc_reset_senha: req.body.vc_reset_senha || usuario.vc_reset_senha,
                        dt_exp_reset: req.body.dt_exp_reset || usuario.dt_exp_reset,
                        dt_atualiacao: dtCurr.timestamp
                    })
                    .then((usuario) => res.status(200).send(usuario))
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
        return Usuario
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    var errResp = msgF('err-0002', req.query.lang)
                    return res.status(404).send(errResp);
                }
                return Usuario
                    .destroy()
                    .then(() => {
                        var errResp = msgF('suc-0001', req.query.lang)
                        return res.status(204).send(errResp);
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