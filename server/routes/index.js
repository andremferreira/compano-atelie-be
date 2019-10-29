// ╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║██████████████████████████████████ REQUIRE PROTECT          ███████████████████████████████████████║
// ╟───────────────────────────────────────────────────────────────────────────────────────────────────╢
/* ║ -Auth    */ const auth   = require('../../auth/userAuth');                                      /*║*/
/* ║ -bcrypt  */ const bcrypt = require('bcrypt');                                                   /*║*/
/* ║ -secret  */ const Secret = 'secret';                                                            /*║*/
/* ║ -Config  */ const secret = require('../../config/.config')[Secret];                             /*║*/
// ╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝  
// ╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║██████████████████████████████████ REQUIRE STRUCTURE CTL    ███████████████████████████████████████║
// ╟───────────────────────────────────────────────────────────────────────────────────────────────────╢
/* ║ -User    */ const userController    = require('../controllers/User');                           /*║*/
/* ║ -Client  */ const clientController  = require('../controllers/Client');                         /*║*/
/* ║ -Service */ const serviceController = require('../controllers/Service');                        /*║*/
/* ║ -Budget  */ const budgetController = require('../controllers/Budget');                          /*║*/
// ╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝ 
// ╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║██████████████████████████████████ REQUIRE EXPRESS & ROUTE  ███████████████████████████████████████║
// ╟───────────────────────────────────────────────────────────────────────────────────────────────────╢
/* ║ -Express */ const express         = require('express');                                         /*║*/
/* ║ -OpenRt  */ const OpenRoutes      = express.Router();                                           /*║*/
/* ║ -ProctRt */ const ProtectedRoutes = express.Router();                                           /*║*/
// ╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝ 
// ╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║██████████████████████████████████ APP REQ METHODS & ROUTE  ███████████████████████████████████████║
// ╟───────────────────────────────────────────────────────────────────────────────────────────────────╢
/* ║ -APP     */ module.exports        = (app) => {                                                  /*║*/
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║*/
// ║║██████████████████████████████████ DEFAULT RETURN W/O ROUTE ██████████████████████████████████║   ║*/
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║*/
/* ║║ -Return  */ app.get('', (req, res)=>{                                                      /*║   ║*/
/* ║║ -403     */   return res.status(403).send({ message: 'Service listen activate.' })});      /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ OPEN ROUTE OAPI          ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -Open    */ OpenRoutes.get('', (req, res, next)=>{                                         /*║   ║*/
/* ║║ -Open    */   return res.status(200).send({message: 'Express works on oapi!'})});          /*║   ║*/
/* ║║ -Apply   */ app.use('/oapi', OpenRoutes);                                                  /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║ 
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ SECURITY APPLY ROUTE     ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -Protect */ ProtectedRoutes.use((req, res, next)=>{                                        /*║   ║*/
/* ║║ -Protect */       return auth.verifyToken(req, res, next)});                               /*║   ║*/
/* ║║ -Apply   */ app.use('/api', ProtectedRoutes);                                              /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ ROUTE OF CRUD CLIENTS    ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -ListAll */ ProtectedRoutes.get('/clients', clientController.list);                        /*║   ║*/
/* ║║ -Count   */ ProtectedRoutes.get('/clients/count', clientController.count);                 /*║   ║*/
/* ║║ -GetId   */ ProtectedRoutes.get('/client/id/:id', clientController.getById);               /*║   ║*/
/* ║║ -GetEmail*/ ProtectedRoutes.get('/client/email/:email', clientController.getByEmail);      /*║   ║*/
/* ║║ -AddNew  */ ProtectedRoutes.post('/client', clientController.add);                         /*║   ║*/
/* ║║ -AddId   */ ProtectedRoutes.post('/client/id/:id', clientController.addById);              /*║   ║*/
/* ║║ -UpdEml  */ ProtectedRoutes.put('/client/email/:email', clientController.updateByEmail);   /*║   ║*/
/* ║║ -Update  */ ProtectedRoutes.put('/client/id/:id', clientController.update);                /*║   ║*/
/* ║║ -Delete  */ ProtectedRoutes.delete('/client/id/:id', clientController.delete);             /*║   ║*/
/* ║║ -DelEml  */ ProtectedRoutes.delete('/client/email/:email', clientController.deleteByEmail);/*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ ROUTE OF CRUD USERS      ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -ListAll */ ProtectedRoutes.get('/users', userController.list);                            /*║   ║*/
/* ║║ -Count   */ ProtectedRoutes.get('/users/count', userController.count);                     /*║   ║*/
/* ║║ -GetId   */ ProtectedRoutes.get('/user/id/:id', userController.getById);                   /*║   ║*/
/* ║║ -AddNew  */ ProtectedRoutes.post('/user', userController.add);                             /*║   ║*/
/* ║║ -Update  */ ProtectedRoutes.put('/user/id/:id', userController.update);                    /*║   ║*/
/* ║║ -DelEml  */ ProtectedRoutes.delete('/user/email/:email', userController.deleteByEmail);    /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ ROUTE OF CRUD SERVICES   ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -ListAll */ ProtectedRoutes.get('/services', serviceController.list);                      /*║   ║*/
/* ║║ -Count   */ ProtectedRoutes.get('/services/count', serviceController.count);               /*║   ║*/
/* ║║ -GetId   */ ProtectedRoutes.get('/service/id/:id', serviceController.getById);             /*║   ║*/
/* ║║ -AddNew  */ ProtectedRoutes.post('/service', serviceController.add);                       /*║   ║*/
/* ║║ -Update  */ ProtectedRoutes.put('/service/id/:id', serviceController.update);              /*║   ║*/
/* ║║ -UpdMne  */ ProtectedRoutes.put('/service/mne/:mne', serviceController.updateMne);         /*║   ║*/
/* ║║ -Delete  */ ProtectedRoutes.delete('/service/id/:id', serviceController.delete);           /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ ROUTE OF CRUD BUDGETS    ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -ListAll */ ProtectedRoutes.get('/budgets', budgetController.list);                        /*║   ║*/
/* ║║ -Count   */ ProtectedRoutes.get('/budgets/count', budgetController.count);                 /*║   ║*/
/* ║║ -GetId   */ ProtectedRoutes.get('/budget/id/:id', budgetController.getById);               /*║   ║*/
/* ║║ -AddNew  */ ProtectedRoutes.post('/budget', budgetController.add);                         /*║   ║*/
/* ║║ -Update  */ ProtectedRoutes.put('/budget/id/:id', budgetController.update);                /*║   ║*/
/* ║║ -Delete  */ ProtectedRoutes.delete('/budget/id/:id', budgetController.delete);             /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
// ║╔══════════════════════════════════════════════════════════════════════════════════════════════╗   ║
// ║║██████████████████████████████████ CRIPTO PROCESS COMPARE   ██████████████████████████████████║   ║
// ║╟──────────────────────────────────────────────────────────────────────────────────────────────╢   ║
/* ║║ -Cripto  */ ProtectedRoutes.get('/cryptopass', (req, res)=>{                               /*║   ║*/
/* ║║          */  /*let secretHex = bcrypt.genSalt(Buffer.from('@SolutIon0864!*'))*/            /*║   ║*/
/* ║║          */  /*console.log(secretHex)*/                                                    /*║   ║*/
/* ║║          */ let salt = bcrypt.genSaltSync();                                               /*║   ║*/
/* ║║          */ let passwordHash = bcrypt.hashSync(secret, salt);                              /*║   ║*/
/* ║║          */ console.log(secret);                                                           /*║   ║*/
/* ║║          */ let password = 'SECRETapiKEYhere@!*';                                          /*║   ║*/
/* ║║          */ let compare = bcrypt.compareSync(password, passwordHash);                      /*║   ║*/
/* ║║          */ return res.status(200).send({                                                  /*║   ║*/
/* ║║          */   password: password,                                                          /*║   ║*/
/* ║║          */   passwordHash: passwordHash,                                                  /*║   ║*/
/* ║║          */   comparar: compare })});                                                      /*║   ║*/
// ║╚══════════════════════════════════════════════════════════════════════════════════════════════╝   ║
/* ║ - End    */ };                                                                                  /*║*/
// ╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝