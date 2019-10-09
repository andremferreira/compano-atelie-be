// ----------------------------------- MODULE OF AUTHENTICATION --------------------------
const auth = require('../../auth/userAuth')
// ----------------------------------- SEQUELIZE CONTROLLER IMPORT -----------------------
const clienteController = require('../controllers/Cliente');
// ----------------------------------- IMPORT EXPRESS TO CONFIG ROUTE --------------------
const express = require('express')
const ProtectedRoutes = express.Router();
// ----------------------------------- APP REQUISITION METHODS ---------------------------
module.exports = (app) => {
// ----------------------------------- HELP TO GENERATION TOKEN  -------------------------
    ProtectedRoutes.use((req, res, next) => {
    if (process.env.NODE_ENV = 'development') {
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
// ----------------------------------- ROUTE OF CRUD CLIENT ------------------------------
    ProtectedRoutes.get('/clientes', clienteController.list)
    ProtectedRoutes.get('/cliente/:id', clienteController.getById)
    ProtectedRoutes.post('/cliente', clienteController.add);
    ProtectedRoutes.put('/cliente/:id', clienteController.update);
};