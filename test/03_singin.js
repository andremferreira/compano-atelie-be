// ----------------------------------- INITIAL MOCHA WITH SUPERTEST ----------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER --------------------------
const color = require('../server/util/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ---------------------------
const msgF = require('../server/factory/msgFactory')
// ----------------------------------- TEST USER -----------------------------------------
describe(color('f-yellow','► ') + msgF('tst-0069').title, function () {
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST USERS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0070').info), function listUser(done) {
        var user = {
            email: "sysadm@email.com",
            password: "Ad1M1ñ5y5@k3y"
        }
        request(server)
            .post('/oapi/singin')
            .send(user)
            .expect(200, done)
    })
})