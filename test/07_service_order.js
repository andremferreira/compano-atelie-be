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
// ----------------------------------- TEST SERVICE ORDERS -----------------------------------------
describe(color('f-yellow', '► ') + msgF('tst-0057').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST SERVICE ORDERS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0058').info), function listServOrders(done) {
        request(server)
            .get('/api/servOrders')
            .set('access-token', devToken)
            .expect(200, done)
    })

    // ----------------------------------- COUNT SERVICE ORDERS ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0059').info), function countServOrders(done) {
        request(server)
            .get('/api/servOrders/count')
            .set('access-token', devToken)
            .expect(200, done)
    })
    // ----------------------------------- ADD BUDGET ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0063').info), function addNewBudget(done) {
        bgTest = {
            id_budget: 1,
            id_client: 1,
            id_user: 1,
            js_budget_service: [{
                id: 1,
                vc_service_mnemonic: "RPACM",
                tx_service_description: "REPARO DE CAMISA / CAMISETA",
                tm_estimate_time_service: "00:30:00",
                nu_material_cost: 4.65,
                nu_third_party_cost: 0.00,
                nu_service_cost: 3.99,
                vc_contact: "MARIA SOUZA",
                bo_critical_service: false,
                id_owner: 1,
                in_quantity: 3
            }]
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
    // ----------------------------------- ADD SERVICE ORDER ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0060').info), function addNewServOrder(done) {
        soTest = {
            id_service_order: 1,
            id_client: 1,
            id_user: 1,
            id_service_owner: 1,
            id_budget: 1,
            nu_vservice: 978.72
        }
        request(server)
            .post('/api/servOrder')
            .set('access-token', devToken)
            .send(soTest)
            .expect(201)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE SERVICE ORDER BY ID ------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0061').info), function updServOrderById(done) {
        soTest = {
            nu_vservice: 1001.33
        }
        request(server)
            .put('/api/servOrder/id/1')
            .set('access-token', devToken)
            .send(bgTest)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE SERVICE ORDER BY ID NEG --------------------------
    msgS = msgF('tst-0062').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updServOrderByIdNeg(done) {
        soTest = {
            nu_vservice: 1001.33
        }
        request(server)
            .put('/api/servOrder/id/999')
            .set('access-token', devToken)
            .send(soTest)
            .expect(404)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- GET SERVICE ORDER BY ID ---------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0064').info), function getServOrderById(done) {
        request(server)
            .get('/api/servOrder/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- GET SERVICE ORDER BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0065').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getServOrderByIdNeg(done) {
        request(server)
            .get('/api/servOrder/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE SERVICE ORDER BY ID ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0066').info), function delServOrderById(done) {
        request(server)
            .delete('/api/servOrder/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
    // ----------------------------------- REMOVE SERVICE ORDER BY ID WITHOUT RESULT ------------
    msgS = msgF('tst-0067').info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function delServOrderByIdNeg(done) {
        request(server)
            .delete('/api/servOrder/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE BUDGET BY ID ---------------------------
    it(color('f-yellow', '└') + color('f-hidden', msgF('tst-0068').info), function delBudgetById(done) {
        request(server)
            .delete('/api/budget/id/1')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
})