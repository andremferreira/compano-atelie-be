// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
const auth = require('../auth/userAuth')
// const dToken = require('../server/factory/devTolk').getDevToken()
// console.log(dToken)
// const devTolk = dToken.getDevToken()
// ----------------------------------- CONFIGURE USER TO PROTECTED API ACCESS ---------
//*
// *********************************** TODO: MAKE FACTOR TO RETURN THIS INFORMATION **
const usuarios = [{
    id_usuario: 1,
    vc_email: 'teste@teste.com',
    vc_password: 'TESTE!123@'
}]
const devToken = auth.createIdToken(usuarios, true)
//*/
// ----------------------------------- TEST CLIENT ---------------------------------------
describe('Initialize client test..', function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it(`Try getClientList, return a json list on route "GET: /api/clientes";`, function testListClient(done) {
        request(server)
            .get('/api/clientes')
            .set('access-token', devToken)
            .expect(200, done)
    })
    it(`Try getByIdClient, return a client with id_clientes: 1 on route "GET: /api/cliente/id/1";`, function testListClient(done) {
        request(server)
            .get('/api/cliente/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                console.log(res.text)
                done()
            })
    })
    it(`Try addClient, register new client on route "POST: /api/cliente";`, function testListClient(done, cliente) {
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
                if (err) throw (err);
                console.log(res.text)
                done()
            })
    })
    it(`Try getClientByEmail, return a client with email:EMAIL@TESTE-2.COM on route "GET /api/cliente/email/EMAIL@TESTE-2.COM";`, function testListClient(done) {
        request(server)
            .get('/api/cliente/email/EMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(200)
            .end(function(err,res){
                if (err) throw err;
                console.log(res.text)
                done()
            })
    })
    it(`Try deleteClientByEmail, delete client on route "delete: /api/cliente/email/EMAIL@TESTE-2.COM";`, function testListClient(done) {
        request(server)
            .delete('/api/cliente/email/EMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(204)
            .end(function (err, res) {
                if (err) throw (err);
                done()

            })
    })
})