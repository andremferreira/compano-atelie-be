// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const pt = 'listPort';
const port = require('../config/.config')[pt];
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
// ----------------------------------- TEST LOADING EXPRESS SERVER --------------------
describe('Loading express..', function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it(`Responds forbidden(403), when request to slash (url="http://localhost:${port}");`, function testSlash(done) {
        request(server)
            .get('/')
            .expect(403, done)
    })
    // ----------------------------------- TEST OPEN ROUTE IF WORK -----------------------
    it(`Try to access open route on path "/oapi";`, function testOpenRoute(done) {
        request(server)
            .get('/oapi/')
            .expect(200, done)

    })
    // ----------------------------------- TEST ACCESS PROTECTED ROUTE WITHOUT AUTH -------
    it(`Try to access without permission on route in path "/api";`, function testProtectRoute(done) {
        request(server)
            .get('/api/')
            .expect(403, done)
    })
})
// ----------------------------------- TEST CLIENT ---------------------------------------
describe('Initialize client test..', function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it(`Try getClientList, return a json list on route "/api/clientes";`, function testListClient(done) {
        request(server)
            .get('/api/clientes')
            .set('access-token', devToken)
            .expect(200, done)
    })
    it(`Try getByIdClient, return a client with id_clientes: 1 on route "/api/cliente/1";`, function testListClient(done) {
        request(server)
            .get('/api/cliente/1')
            .set('access-token', devToken)
            .expect(200, done)
    })
})