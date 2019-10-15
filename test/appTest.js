// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const pt = 'listPort';
const port = require('../config/.config')[pt];
// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
const auth = require('../auth/userAuth')
// ----------------------------------- CONFIGURE USER TO PROTECTED API ACCESS ---------
const usuarios = [{
    id_usuario: 1,
    vc_email: 'teste@teste.com',
    vc_password: 'TESTE!123@'
}]
const devTolk = auth.createIdToken(usuarios, true)
console.log(`Using key:"access-token" \n Value:"${devTolk}"`)
// ----------------------------------- TEST LOADING EXPRESS SERVER --------------------
describe('Loading express', function () {
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
    it(`Try to access without permission on route on path "/api";`, function testOpenRoute(done) {
        request(server)
            .get('/api/')
            .expect(403, done)
    })
})