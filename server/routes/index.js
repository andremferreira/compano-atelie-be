// ----------------------------------- SEQUELIZE CONTROLLER IMPORT -----------------------
const clienteController = require('../controllers/Cliente');
// ----------------------------------- ROUTE AND METHODS ---------------------------------
module.exports = (app) => {
// ----------------------------------- VERIFICATION OF START WEBSERVICE ------------------
app.get('/api', (req, res) => {
        // console.log(res)
        return res.status(200).send({message: 'Entrou em rotas dentro da api!'})
    });
//
// ----------------------------------- ROUTE OF CRUD CLIENT ------------------------------
app.get('/api/clientes', clienteController.list);
// CRUD tabela user
//app.get('/api/user', groupController.list);
//app.get('/api/user/:id', groupController.getById);
//app.post('/api/user/', groupController.add);
//app.put('/api/user/:id', groupController.update);
//app.delete('/api/user/:id', groupController.delete);
// Set sequência do id json_obj
//app.post('/api/seqgrupo/:id', groupController.setNextSeq);
};