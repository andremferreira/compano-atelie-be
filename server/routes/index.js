// ----------------------------------- MODULE OF AUTHENTICATION --------------------------
const auth = require('../../auth/userAuth')
// ----------------------------------- SEQUELIZE CONTROLLER IMPORT -----------------------
const clientController = require('../controllers/Client')
const userController = require('../controllers/User')
// ----------------------------------- IMPORT EXPRESS TO CONFIG ROUTE --------------------
const express = require('express')
const ProtectedRoutes = express.Router()
const OpenRoutes = express.Router()
// ----------------------------------- IMPORT BCRYPT TO COMPARE HASH ---------------------
const bcrypt = require('bcrypt')
const Secret = 'secret'
const secret = require('../../config/.config')[Secret]
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
// const fs = require('fs')
// const path = require('path')
// ----------------------------------- DEFAULT CONFIGURATION REPORT AND LANG ---------
// const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
// const config = JSON.parse(dConfig)
// const showHToken = Boolean(config.dConfig.dShowHeaderToken)
// ----------------------------------- APP REQUISITION METHODS ---------------------------
module.exports = (app) => {
// ----------------------------------- DEFAULT RETURN WITHOUT DEFINE ROUTE ---------------
    app.get('', (req, res)=>{
        return res.status(403).send({
            message: 'Service listen activate.'
        })
    })
// ----------------------------------- TESTING OPEN API EXPRESS ROUTE ----------------------------
    app.use('/oapi', OpenRoutes)
    OpenRoutes.get('', (req, res, next)=>{
        return res.status(200).send({
            message: 'Express works open api defined!'
        })
    })
// ----------------------------------- HELP TO GENERATION TOKEN  -------------------------
    ProtectedRoutes.use((req, res, next) => {
        return auth.verifyToken(req, res, next)
    })
// ----------------------------------- APPLY THE PROTECTION ON API -----------------------
    app.use('/api', ProtectedRoutes)
// ----------------------------------- VERIFICATION OF START WEBSERVICE ------------------
    ProtectedRoutes.get('/teste', (req, res, next)=>{
        return res.status(200).send({
            message: 'Return with protected route!'
        })
    })
// ----------------------------------- ROUTE OF CRUD CLIENTES ----------------------------
    ProtectedRoutes.get('/clients', clientController.list)
    ProtectedRoutes.get('/clients/count', clientController.count)
    ProtectedRoutes.get('/client/id/:id', clientController.getById)
    ProtectedRoutes.get('/client/email/:email', clientController.getByEmail)
    ProtectedRoutes.post('/client', clientController.add);
    ProtectedRoutes.post('/client/id/:id', clientController.addById);
    ProtectedRoutes.put('/client/email/:email', clientController.updateByEmail);
    ProtectedRoutes.put('/client/id/:id', clientController.update);
    ProtectedRoutes.delete('/client/id/:id', clientController.delete);
    ProtectedRoutes.delete('/client/email/:email', clientController.deleteByEmail);
// ---------------------------------------------------------------------------------------
// ----------------------------------- ROUTE OF CRUD USUARIOS ----------------------------
    ProtectedRoutes.get('/users', userController.list)
    ProtectedRoutes.get('/users/count', userController.count)
    ProtectedRoutes.get('/user/id/:id', userController.getById)
    ProtectedRoutes.post('/user', userController.add)
    ProtectedRoutes.delete('/user/email/:email', userController.deleteByEmail)
// ---------------------------------------------------------------------------------------
    // TEST CRIPTO PROCESS AND COMPARE
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

};