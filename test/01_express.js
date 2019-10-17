// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const pt = 'listPort';
const port = require('../config/.config')[pt];
// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
// ----------------------------------- TEST LOADING EXPRESS SERVER --------------------
describe('Loading express..', function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it(`Responds forbidden(403), when request to slash (GET: url="http://localhost:${port}");`, function testSlash(done) {
        request(server)
            .get('/')
            .expect(403, done)
    })
    // ----------------------------------- TEST OPEN ROUTE IF WORK -----------------------
    it(`Try to access open route on path "GET: /oapi";`, function testOpenRoute(done) {
        request(server)
            .get('/oapi/')
            .expect(200, done)

    })
    // ----------------------------------- TEST ACCESS PROTECTED ROUTE WITHOUT AUTH -------
    it(`Try to access without permission on route in path "GET: /api";`, function testProtectRoute(done) {
        request(server)
            .get('/api/')
            .expect(403, done)
    })
})