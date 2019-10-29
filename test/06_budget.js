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
// ----------------------------------- TEST BUDGET -----------------------------------------
describe(color('f-yellow', '► ') + msgF('tst-0035').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST BUDGETS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0036').info), function listUser(done) {
        request(server)
            .get('/api/budgets')
            .set('access-token', devToken)
            .expect(200, done)
    })

    // ----------------------------------- COUNT BUDGETS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0037').info), function countUser(done) {
        request(server)
            .get('/api/budgets/count')
            .set('access-token', devToken)
            .expect(200, done)
    })
    // ----------------------------------- ADD BUDGET ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0038').info), function addNewUser(done) {
        bgTest = {
            id_budget: 1,
            id_client: 1,
            id_user: 1,
            js_budget_service: {
                id: 1,
                vc_service_mnemonic: "RPACM",
                tx_service_description: "REPARO DE CAMISA / CAMISETA",
                tm_estimate_time_service: "00:30:00",
                nu_material_cost: 4.65,
                nu_third_party_cost: 0.00,
                nu_service_cost: 3.99,
                vc_contact: "Maria Souza",
                bo_critical_service: false,
                id_owner: 1,
                in_quantity: 3
            }
        }
        request(server)
            .post('/api/budget')
            .set('access-token', devToken)
            .send(bgTest)
            .expect(201)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE BUDGET BY ID ------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0039').info), function updUserById(done) {
        bgTest = {
            id_budget: 1,
            id_client: 1,
            id_user: 1,
            js_budget_service: [{
                id: 1,
                vc_service_mnemonic: "TSHIR",
                tx_service_description: "T-SHIRT REPAIR",
                tm_estimate_time_service: "23:59:59",
                nu_material_cost: 7.87,
                nu_third_party_cost: 12.5,
                nu_service_cost: 58.3,
                vc_contact: "JONNY MANFISH",
                bo_critical_service: false,
                id_owner: 1,
                in_quantity: 3
            }]
        }
        request(server)
            .put('/api/budget/id/1')
            .set('access-token', devToken)
            .send(bgTest)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE USER BY ID NEG --------------------------
    msgS = msgF('tst-0040').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updUserByIdNeg(done) {
        bgTest = {
            js_budget_service: [{
                    id: 1,
                    vc_service_mnemonic: "TSHIR",
                    tx_service_description: "T-SHIRT REPAIR",
                    tm_estimate_time_service: "23:59:59",
                    nu_material_cost: 7.87,
                    nu_third_party_cost: 12.5,
                    nu_service_cost: 58.3,
                    vc_contact: "JONNY MANFISH",
                    bo_critical_service: false,
                    id_owner: 1,
                    in_quantity: 3
                },
                {
                    id: 2,
                    vc_service_mnemonic: "TSHIR",
                    tx_service_description: "T-SHIRT REPAIR",
                    vc_contact: "JONNY MANFISH"
                }
            ]
        }
        request(server)
            .put('/api/budget/id/999')
            .set('access-token', devToken)
            .send(bgTest)
            .expect(404)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- GET SERVICE BY ID ---------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0041').info), function getUserById(done) {
        request(server)
            .get('/api/budget/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- GET SERVICE BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0042').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getUserByIdNeg(done) {
        request(server)
            .get('/api/budget/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE SERVICE BY ID ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0043').info), function delUserByEmail(done) {
        request(server)
            .delete('/api/budget/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
    // ----------------------------------- REMOVE SERVICE BY ID WITHOUT RESULT ------------
    msgS = msgF('tst-0044').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '└') + color('f-hidden', msgS), function getUserByEmailNeg(done) {
        request(server)
            .delete('/api/budget/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
})