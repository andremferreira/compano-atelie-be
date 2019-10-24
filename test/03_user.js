// ----------------------------------- INITIAL MOCHA WITH SUPERTEST ----------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER --------------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ---------------------------
const msgF = require('../server/factory/msgFactory')
// ----------------------------------- DEFAULT TEST USER AUTH TOKEN ----------------------
const auth = require('../auth/userAuth')
const userTest = require('../server/factory/userTest').user
const devToken = auth.createIdToken(userTest, true)
// ----------------------------------- INITIAL CONFIG OF PATH AND FILE -------------------
const fs = require('fs')
const path = require('path')
// ----------------------------------- DEFAULT CONFIGURATION  ----------------------------
const dConfig = fs.readFileSync(path.resolve(path.resolve(__dirname), '../server/dConfig/config.json'), 'utf8')
const config = JSON.parse(dConfig)
const passToken = config.dConfig.dInitPassHashAdm
// ----------------------------------- CONVERT IMAGE TO BYTE ARRAY -----------------------
const sysUserImg = fs.readFileSync(path.resolve(path.resolve(__dirname), '../server/img/SysAdmImg.png')).toString('base64')
// ----------------------------------- TEST USER -----------------------------------------
describe(color('f-yellow','► ') + msgF('tst-0019').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST USERS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0020').info), function listUser(done) {
        request(server)
            .get('/api/users')
            .set('access-token', devToken)
            .expect(200, done)
    })

    // ----------------------------------- COUNT USERS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0021').info), function countUser(done) {
        request(server)
            .get('/api/users/count')
            .set('access-token', devToken)
            .expect(200, done)
    })
     // ----------------------------------- GET USER BY ID ---------------------------------
     it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0022').info), function getUserById(done) {
        request(server)
            .get('/api/user/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- ADD CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0023').info), function addNewUser(done) {
        usrTest = {
            vc_name: 'TEST_NEW_USER',
            vc_lastname: 'TEST_NEW_USER',
            vc_email: 'TESTE@NEW.USER',
            vc_password: passToken,
            tx_image: sysUserImg
          }
        request(server)
            .post('/api/user')
            .set('access-token', devToken)
            .send(usrTest)
            .expect(201)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- GET USER BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0025').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getUserByIdNeg(done) {
        request(server)
            .get('/api/user/id/9999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE USER BY EMAIL ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0024').info), function delUserByEmail(done) {
        request(server)
            .delete('/api/user/email/TESTE@NEW.USER')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
    // ----------------------------------- REMOVE USER BY EMAIL WITHOUT RESULT ------------
    msgS = msgF('tst-0026').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getUserByEmailNeg(done) {
        request(server)
            .delete('/api/user/email/WOUTEMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
/*
    // ----------------------------------- GET CLIENT BY EMAIL -----------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0015').info), function getClientByEmail(done) {
        request(server)
            .get('/api/cliente/email/EMAIL@TESTE-1.COM')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- GET CLIENT BY EMAIL WITHOUT RESULT -------------
    msgS = msgF('tst-0016').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByEmailNeg(done) {
        request(server)
            .get('/api/cliente/email/WOUTEMAIL@TESTE.COM')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- DELETE CLIENT BY ID -----------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0017').info), function delClientById(done) {
            var cliente = {
                id_cliente: 999,
                vc_nome: 'NAME-TESTE-999-DEL',
                vc_sobrenome: 'LASTNAME-TESTE-DEL',
                nu_ddd: 99,
                nu_celular: 598756456,
                vc_contato: 'CONTATO-TESTE-DEL',
                vc_email: 'DELETE@TEST.COM',
                nu_cpf: 3215648975,
                nu_cep: 65478951,
                vc_cidade: 'DELETE',
                vc_estado: 'DELETE',
                vc_bairro: 'TEST DELETE',
                vc_endereco: 'DELETE',
                vc_endereco_numero: '9999',
                vc_endereco_complemento: 'DELETE',
                vc_aniversario: '09/09',
            }
            request(server)
                .post('/api/cliente')
                .set('access-token', devToken)
                .send(cliente)
                .expect(201)

            request(server)
                .delete('/api/cliente/id/999')
                .set('access-token', devToken)
                .expect(204)
            done()
        });
    // ----------------------------------- DELETE CLIENT BY ID WITHOUT RESULT --------------
    msgS = msgF('tst-0018').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))        
    it(color('f-yellow', '└') + color('f-hidden', msgS), function delClientByIdNeg(done) {
        request(server)
            .delete('/api/cliente/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
*/        
})