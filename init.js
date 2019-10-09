const express = require('express');
const logger = require('morgan');
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');

// inicializando o express
const app = express();
//Requisicação do evento de log ao console
// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

if( process.env.NODE_ENV = 'development'){
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}else{
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

require('./server/routes')(app);

module.exports = app;
