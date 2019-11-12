const _ = require('lodash')
const jwt = require('jsonwebtoken')
const secret = require('../config/.config')['secret']
const bcrypt = require('bcrypt');
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const dtCurr = require('../server/factory/currentTimeStamp');
// SAMPLE OF REGISTER DATABASE

function createIdToken(usuarios, dev) {
    if (dev) {
        return jwt.sign(_.omit(usuarios, 'password'), secret, {
            expiresIn: 86400
        })
    } else {
        return jwt.sign(_.omit(usuarios, 'password'), secret, {
            expiresIn: 3600
        })
    }
}

function verifyToken(req, res, next) {
    let token = req.headers['access-token']
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            errors: ['No token provided.']
        })
    }
}

// UNIQUE ID TOLKEN
function genJti() {
    let jti = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        jti += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return jti;
}

// VERIFY USER DURING SINGIN
function verifySingIn(passSend, user) {
    let nDate = new dtCurr
    let compare = bcrypt.compareSync(passSend, user.hash);
    try { 
        if ( compare === true ) {
            console.log('entrou aqui!')
            let userLoggin = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                profile: user.profile,
                jti: genJti(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (86400),
                dtInf: nDate.timestamp
            }
            var authToken = jwt.sign(_.omit(user.email, passSend), secret, {
                expiresIn: 86400
            })
            return { auth: true, authToken: authToken, data: userLoggin }
        } else {
            return { auth: false }
        }

    } catch(e) {
        console.log(e)
    }
};

module.exports = {
    createIdToken,
    verifyToken,
    verifySingIn
}