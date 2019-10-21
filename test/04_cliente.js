// ----------------------------------- INITIAL MOCHA WITH SUPERTEST ----------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER --------------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ---------------------------
const msgF = require('../server/factory/msgFactory')
// ----------------------------------- DEFAULT TEST USER AUTH TOKEN ----------------------
const auth = require('../auth/userAuth')
const usuarios = require('../server/factory/userTest').user
const devToken = auth.createIdToken(usuarios, true)
// ----------------------------------- TEST CLIENT ---------------------------------------
describe(color('f-yellow','► ') + msgF('tst-0007').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0008').info), function listClient(done) {
        request(server)
            .get('/api/clientes')
            .set('access-token', devToken)
            .expect(200, done)
    })
    // ----------------------------------- COUNT CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0009').info), function countClient(done) {
        request(server)
            .get('/api/clientes/qtd')
            .set('access-token', devToken)
            .expect(200, done)
    })
    // ----------------------------------- ADD CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0010').info), function addNewClient(done, cliente) {
        cliente = {
            vc_nome: 'NOME-TESTE-2',
            vc_sobrenome: 'SOBRENOME-TESTE-2',
            nu_ddd: 99,
            nu_celular: 988888888,
            vc_contato: 'CONTATO-TESTE-2',
            vc_email: 'EMAIL@TESTE-2.COM',
            nu_cpf: 94818843335,
            nu_cep: 60170201,
            vc_cidade: 'FORTALEZA',
            vc_estado: 'CEARA',
            vc_bairro: 'DIONISIO TORRES',
            vc_endereco: 'RUA LEONEL DE BORBA',
            vc_endereco_numero: '1748',
            vc_endereco_complemento: 'CASA 2',
            vc_aniversario: '07/09',
        }
        request(server)
            .post('/api/cliente')
            .set('access-token', devToken)
            .send(cliente)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    throw (err)
                };
                done()
            })
    })
    // ----------------------------------- GET CLIENT BY ID ---------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0011').info), function getClientById(done) {
        request(server)
            .get('/api/cliente/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- GET CLIENT BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0012').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByIdNeg(done) {
        request(server)
            .get('/api/cliente/id/4000')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE CLIENT BY EMAIL ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0013').info), function delClientByEmail(done) {
        request(server)
            .delete('/api/cliente/email/EMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(204)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
    // ----------------------------------- REMOVE CLIENT BY EMAIL WITHOUT RESULT ------------
    msgS = msgF('tst-0014').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByEmailNeg(done) {
        request(server)
            .delete('/api/cliente/email/WOUTEMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
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
})