// ----------------------------------- INITIAL MOCHA WITH SUPERTEST ----------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER --------------------------
const color = require('../server/util/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ---------------------------
const msgF = require('../server/factory/msgFactory')
// ----------------------------------- DEFAULT TEST USER AUTH TOKEN ----------------------
const auth = require('../auth/userAuth')
const user = require('../server/factory/userTest')
const userTest = user.User()
const usrInfoToken = auth.verifySingIn('Ad1M1ñ5y5@k3y', userTest)
const devToken = usrInfoToken.Authorization
// ----------------------------------- TEST USER -----------------------------------------
describe(color('f-yellow','► ') + msgF('tst-0035').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    })
    afterEach(function () {
        server.close()
    })
    // ----------------------------------- LIST SERVICES ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0036').info), function listService(done) {
        request(server)
            .get('/api/services')
            .set('authorization', devToken)
            .expect(200, done)
    })

    // ----------------------------------- COUNT SERVICES ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0037').info), function countService(done) {
        request(server)
            .get('/api/services/count')
            .set('authorization', devToken)
            .expect(200, done)
    })
    // ----------------------------------- ADD SERVICE ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0038').info), function addNewService(done) {
        servTest = {
            id_service: 1,
            vc_service_mnemonic: "RPACM",
            tx_service_description: "REPARO DE CAMISA OU CAMISETA",
            tm_estimate_time_service: "00:30:00",
            nu_material_cost: 4.65,
            nu_third_party_cost: 0.00,
            nu_service_cost: 3.99,
            vc_contact: "Maria Souza",
            bo_critical_service: false,
            id_user: 1
          }
        request(server)
            .post('/api/service')
            .set('authorization', devToken)
            .send(servTest)
            .expect(201)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE SERVICE BY MNE ------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0050').info), function updServiceByMne(done) {
        servTest = {
            vc_service_mnemonic: "TSRPA",
            tx_service_description: "T-SHIRT REPAIR",
            vc_contact: "JONNY MANFISH"
          }
        request(server)
            .put('/api/service/mne/RPACM')
            .set('authorization', devToken)
            .send(servTest)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE SERVICE BY MNE NEG --------------------------
    msgS = msgF('tst-0051', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updServiceByMneNeg(done) {
        servTest = {
            vc_service_mnemonic: "TSRPA",
            tx_service_description: "T-SHIRT REPAIR",
            vc_contact: "JONNY MANFISH"
          }
        request(server)
            .put('/api/service/mne/RPACM')
            .set('authorization', devToken)
            .send(servTest)
            .expect(404)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE SERVICE BY MNE ------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0039').info), function updServiceById(done) {
        servTest = {
            vc_service_mnemonic: "TSRPA",
            tx_service_description: "T-SHIRT REPAIR",
            vc_contact: "JONNY MANFISH"
          }
        request(server)
            .put('/api/service/id/1')
            .set('authorization', devToken)
            .send(servTest)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
    // ----------------------------------- UPDATE USER BY ID NEG --------------------------
    msgS = msgF('tst-0040', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updServiceByIdNeg(done) {
        servTest = {
            tx_service_description: "T-SHIRT REPAIR",
            vc_contact: "JONNY MANFISH"
          }
        request(server)
            .put('/api/service/id/999')
            .set('authorization', devToken)
            .send(servTest)
            .expect(404)
            .end(function (err, res) {
                if (err) throw (err)
                done()
            })
    })
     // ----------------------------------- GET SERVICE BY ID ---------------------------------
     it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0041').info), function getServiceById(done) {
        request(server)
            .get('/api/service/id/1')
            .set('authorization', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    })
    // ----------------------------------- GET SERVICE BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0042', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getServiceByIdNeg(done) {
        request(server)
            .get('/api/service/id/999')
            .set('authorization', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })
    // ----------------------------------- REMOVE SERVICE BY ID ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0043').info), function delServiceById(done) {
        request(server)
            .delete('/api/service/id/1')
            .set('authorization', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw (err);
                done()
            })
    })
    // ----------------------------------- REMOVE SERVICE BY ID WITHOUT RESULT ------------
    msgS = msgF('tst-0044', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '└') + color('f-hidden', msgS), function delServiceByIdNeg(done) {
        request(server)
            .delete('/api/service/id/999')
            .set('authorization', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    })     
})