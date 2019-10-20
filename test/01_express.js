// ----------------------------------- EXPRESS PORT DEFINED ---------------------------
const pt = 'listPort' ;
const port = require('../config/.config')[pt];
// ----------------------------------- INITIAL MOCHA WITH SUPERTEST -------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER -----------------------
const color = require('../server/factory/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ------------------------
const msgF  = require('../server/factory/msgFactory')
// ----------------------------------- TEST LOADING EXPRESS SERVER --------------------
let msgS = msgF('tst-0001').info
describe(color('f-yellow','► ') + color('default', msgS), function () {
    var server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    msgS =  msgF('tst-0002').info
    it(color('f-yellow','├') + color('f-hidden', msgS.replace('%1',port)), function testSlash(done) {
        request(server)
            .get('/')
            .expect(403, done)
    })
    // ----------------------------------- TEST OPEN ROUTE IF WORK ----------------------- ┌└
    msgS =  msgF('tst-0003').info
    it(color('f-yellow','├') + color('f-hidden', msgS), function testOpenRoute(done) {
        request(server)
            .get('/oapi/')
            .expect(200, done)

    })
    // ----------------------------------- TEST ACCESS PROTECTED ROUTE WITHOUT AUTH -------
    msgS =  msgF('tst-0004').info
    it(color('f-yellow','└') + color('f-hidden', msgS), function testProtectRoute(done) {
        request(server)
            .get('/api/')
            .expect(403, done)
    })
})