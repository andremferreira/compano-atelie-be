const _ = require('lodash')
const config = require('../config/.config')
const jwt = require('jsonwebtoken')
const Secret = 'secret'
const secret = require('../config/.config')[Secret]
// SAMPLE OF REGISTER DATABASE

function createIdToken(usuarios, dev) {
    if (dev) {
        return jwt.sign(_.omit(usuarios, 'password'), config.secret, {
            expiresIn: 3600
        })
    } else {
        return jwt.sign(_.omit(usuarios, 'password'), config.secret, {
            expiresIn: 1440
        })
    }
}

function createAccessToken() {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (3600),
        scope: 'full_access',
        jti: genJti(),
        alg: 'HS256'
    }, config.secret)
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

module.exports = {
    createIdToken,
    createAccessToken,
    verifyToken
}