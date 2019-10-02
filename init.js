const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// inicializando o express
const app = express();

//Requisicação do evento de log ao console
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
//Teste de execução
// app.listen(5001, () => {
//     console.log(`listen on port ${5001}`)
// })

// tesnte de envio em formato json 
app.get('*', (req, res) => res.status(200).send({
    message: 'Express iniciado!'
}));

module.exports = app;
