// ----------------------------------- DEFAULT CONFIGURATION EXPRESS PORT -------------
const pt = 'listPort';
const port = require('../config/.config')[pt];
// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
// ----------------------------------- TEST LOADING EXPRESS SERVER --------------------
describe('\x1b[33m►\x1b[0m'+' Loading express..', function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    it('\x1b[33m┌\x1b[0m'+ `Responds forbidden(403), when request to slash (GET: url="http://localhost:${port}");`, function testSlash(done) {
        request(server)
            .get('/')
            .expect(403, done)
    })
    // ----------------------------------- TEST OPEN ROUTE IF WORK ----------------------- ┌ ├ └
    it('\x1b[33m├\x1b[0m'+`Try to access open route on path "GET: /oapi";`, function testOpenRoute(done) {
        request(server)
            .get('/oapi/')
            .expect(200, done)

    })
    // ----------------------------------- TEST ACCESS PROTECTED ROUTE WITHOUT AUTH -------
    it('\x1b[33m└\x1b[0m'+`Try to access without permission on route in path "GET: /api";`, function testProtectRoute(done) {
        request(server)
            .get('/api/')
            .expect(403, done)
    })
})