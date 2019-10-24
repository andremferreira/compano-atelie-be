'use strict';
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE ---------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- DEFAULT CONFIGURATION  ------------------------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../dConfig/config.json'), 'utf8')
const config = JSON.parse(dConfig)
const userName = config.dConfig.dUserAdm
const passToken = config.dConfig.dInitPassHashAdm
const useEmail = config.dConfig.dUserAdmMail
// ----------------------------------- CONVERT IMAGE TO BYTE ARRAY --------------------
const sysUserImg = fs.readFileSync(path.resolve(path.resolve(__dirname), '../img/SysAdmImg.png')).toString('base64')
// ----------------------------------- TESTE IMAGEM RECREATE --------------------------
// let img = new Buffer.from(sysUserImg, 'base64'); 
// fs.writeFileSync('D:\\image.png', img);
// ----------------------------------- POPULATE SCRIPT -------------------------------
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'users',
    }, [{
      vc_name: userName,
      vc_lastname: 'SYSTEM ADMINISTRATOR',
      vc_email: useEmail,
      vc_password: passToken,
      tx_image: sysUserImg
    }], {parameters:'vc_name, vc_last_name, vc_email, vc_senha, ba_imagem'})
    .then((success) => console.log("System administrator was populated with success!"))
    .catch((error) => console.log("System administrator already populated!"));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'atelie',
      schemaDelimiter: '.',
      tableName: 'users'
    }, null, {});
  },
}