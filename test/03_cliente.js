// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
const auth = require('../auth/userAuth')
const usuarios = require('../server/factory/userTest').user
// ----------------------------------- CONSOLE.LOG COLOR HELPER -----------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ------------------------
const msgF  = require('../server/factory/msgFactory')
// *********************************** TODO: CREATE NEGATION CLASS TEST **************
const devToken = auth.createIdToken(usuarios, true)
//*/
// ----------------------------------- TEST CLIENT ---------------------------------------
describe(msgF('tst-0007').title, function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it(color('f-yellow','├') + color('f-hidden',msgF('tst-0008').info), function testListClient(done) {
        request(server)
            .get('/api/clientes')
            .set('access-token', devToken)
            .expect(200, done)
    })
    it(color('f-yellow','├') + color('f-hidden',msgF('tst-0009').info), function testListClient(done) {
        request(server)
            .get('/api/clientes/qtd')
            .set('access-token', devToken)
            .expect(200, done)
    })
    it(color('f-yellow','├') + color('f-hidden',` Try addClient, register new client on route "POST: /api/cliente";`), function testListClient(done, cliente) {
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
                // console.log(res.text)
                done()
            })
    })
    it(color('f-yellow','├') + color('f-hidden',` Try getByIdClient, return a client with id_clientes: 1 on route "GET: /api/cliente/id/1";`), function testListClient(done) {
        request(server)
            .get('/api/cliente/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                // console.log(res.text)
                done()
            })
    })
    it(color('f-yellow','├') + color('f-hidden',` Try getByIdClient negative, not return result "GET: /api/cliente/id/4000";`), function testListClient(done) {
        request(server)
            .get('/api/cliente/id/4000')
            .set('access-token', devToken)
            .expect(function(res){
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'),done)
    })
    it(color('f-yellow','├') + color('f-hidden',` Try deleteClient, delete client on route "delete: /api/cliente/email/EMAIL@TESTE-2.COM";`), function testListClient(done) {
        request(server)
            .delete('/api/cliente/email/EMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(204)
            .end(function (err, res) {
                if (err) throw (err);
                done()

            })
    })
    it(color('f-yellow','└') + color('f-hidden',` Try getClientByEmail, return a client with email:EMAIL@TESTE-1.COM on route "GET /api/cliente/email/EMAIL@TESTE-2.COM";`), function testListClient(done) {
        request(server)
            .get('/api/cliente/email/EMAIL@TESTE-1.COM')
            .set('access-token', devToken)
            .expect(200)
            .end(function(err,res){
                if (err) throw err;
                done()
            })
    })
/*
    it(`Try deleteClientById, return a client with id_clientes: 2 on route "DELETE: /api/cliente/id/1";`, function testListClient(done) {
        request(server)
            .delete('/api/cliente/id/2')
            .set('access-token', devToken)
            .expect(204)
            .end(function (err, res) {
                if (err) throw err;
                // console.log(res.text)
                done()
            })
    })
*/
})