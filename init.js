const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development'
if (env != 'development') {
    process.env.NODE_ENV = ''
}else{
    const logger = require('morgan');
    app.use(logger('dev'))
    process.env.NODE_ENV = 'development'
} 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/routes')(app);

module.exports = app;