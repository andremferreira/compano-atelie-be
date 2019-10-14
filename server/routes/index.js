// ----------------------------------- MODULE OF AUTHENTICATION --------------------------
const auth = require('../../auth/userAuth')
// ----------------------------------- SEQUELIZE CONTROLLER IMPORT -----------------------
const clienteController = require('../controllers/Cliente')
const usuarioController = require('../controllers/Usuario')
// ----------------------------------- IMPORT EXPRESS TO CONFIG ROUTE --------------------
const express = require('express')
const ProtectedRoutes = express.Router()
// ----------------------------------- IMPORT BCRYPT TO COMPARE HASH ---------------------
const bcrypt = require('bcrypt')
const Secret = 'secret'
const secret = require('../../config/.config')[Secret]
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
const config = JSON.parse(dConfig)
const showHToken = Boolean(config.dConfig.dShowHeaderToken)
// ----------------------------------- APP REQUISITION METHODS ---------------------------
module.exports = (app) => {
// ----------------------------------- HELP TO GENERATION TOKEN  -------------------------
    ProtectedRoutes.use((req, res, next) => {
    if (process.env.NODE_ENV = 'development' && showHToken) {
        console.log('Set development configuration!')
        let usuarios = [{
            id_usuario: 1,
            vc_email: 'teste@teste.com',
            vc_password: 'TESTE!123@'}]
        let devTolk = auth.createIdToken(usuarios, true)
        console.log(`Using key:"access-token" \n Value:"${devTolk}"`)
        }
        return auth.verifyToken(req, res, next)
    })
// ----------------------------------- APPLY THE PROTECTION ON API -----------------------
    app.use('/api', ProtectedRoutes)
// ----------------------------------- VERIFICATION OF START WEBSERVICE ------------------
    ProtectedRoutes.get('/teste', (req, res)=>{
        return res.status(200).send({
            message: 'Entrou em rota projegida dentro da api!'
        })
    })
// ----------------------------------- DEFAULT RETURN WITHOUT DEFINE ROUTE ---------------
    ProtectedRoutes.get('', (req, res)=>{
        return res.status(403).send({
            message: 'Serviço inexistente!'
        })
    })
// ----------------------------------- ROUTE OF CRUD CLIENTES ----------------------------
    ProtectedRoutes.get('/clientes', clienteController.list)
    ProtectedRoutes.get('/cliente/:id', clienteController.getById)
    ProtectedRoutes.post('/cliente', clienteController.add);
    ProtectedRoutes.put('/cliente/:id', clienteController.update);
// ---------------------------------------------------------------------------------------
    // TESTE CRIPTO VALUE AND COMPARE
    ProtectedRoutes.get('/cryptopass', (req, res)=>{
        // let secretHex = bcrypt.genSalt(Buffer.from('@SolutIon0864!*')) //Buffer.from('@SolutIon0864!*') 
        // console.log(secretHex)
        let salt = bcrypt.genSaltSync()
        let passwordHash = bcrypt.hashSync(secret, salt)
        console.log(secret)
        let password = 'SECRETapiKEYhere@!*'
        let compare = bcrypt.compareSync(password, passwordHash)
        return res.status(200).send({
            password: password,
            passwordHash: passwordHash,
            comparar: compare,
        })
    })
// ----------------------------------- ROUTE OF CRUD USUARIOS ----------------------------
    ProtectedRoutes.get('/usuarios', usuarioController.list)
    ProtectedRoutes.get('/usuario/:id', usuarioController.getById)
};